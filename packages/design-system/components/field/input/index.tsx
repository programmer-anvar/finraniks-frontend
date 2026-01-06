import React, {
    forwardRef,
    useCallback,
    useMemo,
    useRef,
    useState,
    useEffect,
    ComponentPropsWithoutRef,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { FieldLabel } from "../field-label";
import { Field } from "../field";
import { FieldDescription } from "../field-description";
import { FieldError } from "../field-error";
import { cn } from "@finranks/design-system/lib/utils";
import { IconSvgProps } from "@finranks/design-system/types/shared";
import { Button } from "../../Button";

/**
 * --- Types
 */
export interface InputProps
    extends Omit<ComponentPropsWithoutRef<"input">, "size"> {
    size?: "xs" | "sm" | "md" | "lg" | "xl";

    classNames?: {
        wrapper?: string;
        input?: string;
        errorMessage?: string;
        helperText?: string;
    };

    prepend?: React.ReactNode;
    append?: React.ReactNode;

    orientation?: "horizontal" | "vertical" | "responsive";

    isInvalid?: boolean;
    errorMessage?: string;
    label?: string;
    helperText?: string;
    isReadOnly?: boolean;
    isRequired?: boolean;
    isClearable?: boolean;

    counterMode?: "word" | "char";
    isEnableCounter?: boolean;
}

/**
 * --- Utilities
 */
function mergeRefs<T = any>(...refs: Array<React.Ref<T> | undefined>) {
    return (node: T | null) => {
        refs.forEach((ref) => {
            if (!ref) return;
            if (typeof ref === "function") {
                try {
                    ref(node);
                } catch {
                    /* ignore */
                }
            } else {
                // @ts-ignore
                ref.current = node;
            }
        });
    };
}

/**
 * Small helper to dispatch native input event after manipulating the DOM value.
 * This ensures React's onChange/onInput handlers (and other listeners) run.
 */
function dispatchNativeInputEvent(el: HTMLInputElement) {
    // set value already applied by caller
    const inputEvent = new Event("input", { bubbles: true });
    el.dispatchEvent(inputEvent);

    const changeEvent = new Event("change", { bubbles: true });
    el.dispatchEvent(changeEvent);
}

/**
 * --- Icon
 */
export const CloseFilledIcon = (props: IconSvgProps) => (
    <svg
        aria-hidden="true"
        focusable="false"
        height="1em"
        role="presentation"
        viewBox="0 0 24 24"
        width="1em"
        {...props}
    >
        <path
            d="M12 2a10 10 0 1010 10A10.016 10.016 0 0012 2zm3.36 12.3a.754.754 0 010 1.06.748.748 0 01-1.06 0l-2.3-2.3-2.3 2.3a.748.748 0 01-1.06 0 .754.754 0 010-1.06l2.3-2.3-2.3-2.3A.75.75 0 019.7 8.64l2.3 2.3 2.3-2.3a.75.75 0 011.06 1.06l-2.3 2.3z"
            fill="currentColor"
        />
    </svg>
);

/**
 * --- InputBase: very small presentational input element
 */
export const InputBase = forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
    ({ className, size, type, ...props }, ref) => {
        return (
            <input
                ref={ref as any}
                type={type}
                data-slot="input"
                size={typeof size === "string" ? undefined : (size as any)}
                className={cn(
                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border flex w-full min-w-0 rounded-[9px] bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-white",
                    "focus-visible:border-[var(--main-color)] transition-all focus-visible:ring-[var(--main-color)]/50 focus-visible:ring-[3px]",
                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                    className
                )}
                {...props}
            />
        );
    }
);

InputBase.displayName = "InputBase";

/**
 * --- Size map (easy to scale)
 */
const SIZE_STYLES: Record<NonNullable<InputProps["size"]>, string> = {
    xs: "h-6 placeholder:text-xs text-xs px-2",
    sm: "h-7 placeholder:text-sm text-sm px-2.5",
    md: "h-8 placeholder:text-sm text-sm px-3",
    lg: "h-10 placeholder:text-base text-base px-3",
    xl: "h-12 placeholder:text-base text-base px-4",
};

/**
 * --- The main Input (full refactor)
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            classNames,
            isInvalid,
            errorMessage,
            label,
            helperText,
            id,
            disabled,
            type,
            isReadOnly,
            size = "md",
            className,
            maxLength = 128,
            minLength = 0,
            orientation = "vertical",
            prepend,
            append,
            isRequired = false,
            isClearable = false,
            isEnableCounter = false,
            counterMode = "char",
            // extract known DOM props so they don't end up in `...rest`
            defaultValue,
            onChange,
            onInput,
            value: controlledValue,
            ...rest
        },
        forwardedRef
    ) => {
        // --- refs
        const internalInputRef = useRef<HTMLInputElement | null>(null);
        const combinedRef = useMemo(() => mergeRefs(internalInputRef, forwardedRef), [forwardedRef]);

        // --- id / a11y
        const inputId = useMemo(
            () => id || `input-${Math.random().toString(36).substring(2, 9)}`,
            [id]
        );
        const errorId = `${inputId}-error`;
        const helperId = `${inputId}-helper`;

        // --- controlled vs uncontrolled
        const isControlled = controlledValue !== undefined;

        const [uncontrolledValue, setUncontrolledValue] = useState<string>(
            () => (defaultValue !== undefined ? String(defaultValue) : "")
        );

        useEffect(() => {
            if (!isControlled && defaultValue !== undefined) {
                setUncontrolledValue(String(defaultValue));
            }
        }, [defaultValue]);

        const value = isControlled ? (controlledValue as string) : uncontrolledValue;

        const internalOnChange = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                if (!isControlled) {
                    setUncontrolledValue(e.target.value);
                }
                onChange?.(e);
            },
            [isControlled, onChange]
        );

        const internalOnInput = useCallback(
            (e: React.FormEvent<HTMLInputElement>) => {
                onInput?.(e as unknown as React.FormEvent<HTMLInputElement>);
            },
            [onInput]
        );

        // Clear handler: updates DOM value, dispatches native events to ensure React receives them,
        // and calls provided callbacks as well.
        const handleClear = useCallback(() => {
            const el = internalInputRef.current;
            if (!el) {
                // fallback: call onChange/onInput with a synthetic event-like object
                const fakeEvent = {
                    target: { value: "" },
                } as unknown as React.ChangeEvent<HTMLInputElement>;
                onChange?.(fakeEvent);
                onInput?.((fakeEvent as unknown) as React.FormEvent<HTMLInputElement>);
                if (!isControlled) setUncontrolledValue("");
                return;
            }

            el.value = "";

            if (!isControlled) {
                setUncontrolledValue("");
            }

            dispatchNativeInputEvent(el);

            const reactLikeEvent = {
                target: el,
                currentTarget: el,
            } as unknown as React.ChangeEvent<HTMLInputElement>;

            onInput?.((reactLikeEvent as unknown) as React.FormEvent<HTMLInputElement>);
            onChange?.(reactLikeEvent);
        }, [isControlled, onChange, onInput]);

        // memoized computed nodes to avoid re-renders
        const startContent = useMemo(() => {
            if (!prepend) return null;
            // return <div className="absolute left-2 top-1/2 -translate-y-1/2">{prepend}</div>;
            return (
                <Button
                    className="absolute left-2 top-1/2 -translate-y-1/2 size-6"
                    variant="ghost"
                    type="button"
                    size="sm"
                >
                    {prepend}
                </Button>
            )
        }, [prepend]);

        const endContent = useMemo(() => {
            if (isClearable && Boolean(value)) {
                return (
                    <Button
                        className="absolute right-1 top-1/2 -translate-y-1/2"
                        hasIconOnly
                        variant="ghost"
                        type="button"
                        size="sm"
                        iconDescription="Clear"
                        onClick={handleClear}
                        isDisabled={disabled}
                        disabled={disabled}
                    >
                        <CloseFilledIcon className="text-gray-600 dark:text-gray-400" />
                    </Button>
                );
            }
            if (!append) return null;
            return <div className="absolute right-1 top-1/2 -translate-y-1/2">{append}</div>;
        }, [isClearable, value, append, handleClear]);

        const counterNode = useMemo(() => {
            if (!isEnableCounter) return null;
            if (counterMode === "word") {
                const count = value ? value.trim().split(/\s+/).filter(Boolean).length : 0;
                return (
                    <span className="text-xs">
                        {count}/{maxLength}
                    </span>
                );
            }
            const count = value ? value.length : 0;
            return (
                <span className="text-xs">
                    {count}/{maxLength}
                </span>
            );
        }, [isEnableCounter, counterMode, value, maxLength]);

        // className composition
        const sizeClass = SIZE_STYLES[size] ?? SIZE_STYLES.md;

        const inputClass = cn(
            sizeClass,
            isInvalid && "border-[var(--support-error)] focus-visible:ring-[var(--support-error)]",
            isReadOnly && "opacity-70 cursor-not-allowed shadow-none focus-visible:border-border",
            disabled && "opacity-70 pointer-events-none",
            startContent ? "pl-9" : "",
            endContent ? "pr-9" : "",
            classNames?.input,
            className
        );

        // aria-describedby: prefer error first, then helper
        const describedBy =
            isInvalid && errorMessage
                ? errorId
                : helperText
                    ? helperId
                    : undefined;

        // render
        return (
            <Field orientation={orientation}>
                {label && (
                    <div className="flex items-center justify-between">
                        <FieldLabel isInvalid={isInvalid}>
                            {label}
                            {isRequired ? " *" : null}
                        </FieldLabel>
                        {counterNode}
                    </div>
                )}

                <div className="relative">
                    {startContent}
                    <InputBase
                        {...(rest as any)}
                        value={value}
                        id={inputId}
                        ref={combinedRef}
                        type={type ?? "text"}
                        maxLength={maxLength}
                        minLength={minLength}
                        disabled={disabled}
                        readOnly={isReadOnly}
                        required={isRequired}
                        aria-invalid={isInvalid}
                        aria-describedby={describedBy}
                        onChange={internalOnChange}
                        onInput={internalOnInput}
                        className={inputClass}
                    />
                    {endContent}
                </div>

                {helperText && !isInvalid && (
                    <FieldDescription id={helperId}>{helperText}</FieldDescription>
                )}

                {isInvalid && errorMessage && (
                    <FieldError className={cn("min-h-6 relative")}>
                        <AnimatePresence mode="wait">
                            {isInvalid && errorMessage && (
                                <motion.p
                                    id={errorId}
                                    key="error"
                                    initial={{ opacity: 0, y: -8, height: 0 }}
                                    animate={{ opacity: 1, y: 0, height: "auto" }}
                                    exit={{ opacity: 0, y: -8, height: 0 }}
                                    transition={{ duration: 0.18, ease: "easeInOut" }}
                                    className={cn("text-[var(--support-error)]! text-xs text-start", classNames?.errorMessage)}
                                >
                                    {errorMessage}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </FieldError>
                )}
            </Field>
        );
    }
);

Input.displayName = "Input";
