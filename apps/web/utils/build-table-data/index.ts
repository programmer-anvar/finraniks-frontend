export const ROW_HEIGHT = 52;

/** ---- Types ---- */

export interface SchemaNode<T = any> {
    data: T & {
        key?: string;
    };
    children?: SchemaNode<T>[];
}

export interface FlatMap {
    [key: string]: unknown[];
}

export interface BuiltNode<T = any> {
    data: T & {
        values: unknown[];
    };
    height: number;
    children?: BuiltNode<T>[];
}

export interface NodeState {
    isVisible?: boolean;
}

export interface VisibleNode {
    $state?: NodeState;
    children?: VisibleNode[];
}

/** ---- Functions ---- */

export function buildFromSchema<T extends { key?: string }>(
    schema: SchemaNode<T>[],
    flat: FlatMap
): BuiltNode<T>[] {
    function recurse(nodes: SchemaNode<T>[]): BuiltNode<T>[] {
        return nodes.map((node) => {
            const { data, children } = node;

            const result: BuiltNode<T> = {
                data: {
                    ...data,
                    values: data.key ? flat[data.key] ?? [] : [],
                },
                height: ROW_HEIGHT,
            };

            if (children && children.length > 0) {
                result.children = recurse(children);
            }

            return result;
        });
    }

    return recurse(schema);
}

export function countVisibleNodes(nodes: VisibleNode[]): number {
    let count = 0;

    function recurse(list: VisibleNode[]): void {
        for (const node of list) {
            if (node.$state?.isVisible) {
                count++;
            }

            if (node.children?.length) {
                recurse(node.children);
            }
        }
    }

    recurse(nodes);
    return count;
}
