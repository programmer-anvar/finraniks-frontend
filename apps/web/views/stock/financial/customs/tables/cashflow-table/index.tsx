"use client"
import { CashFlowSchema } from "@/mocks/stock-financial";
import { buildFromSchema, countVisibleNodes, ROW_HEIGHT } from "@/utils/build-table-data";
import { formatToMillion } from "@finranks/design-system/lib/utils";
import { TreeState, TreeTable } from "cp-react-tree-table";
import { useEffect, useState } from "react";

const CashFlowTable = ({ _, view, newData }: any) => {
    const [treeData, setTreeDataValue] = useState(
        {
            treeValue: TreeState.create(buildFromSchema(CashFlowSchema, newData.financial_data[view]))
        }
    );
    const [columnDefs, setColumnDefs] = useState(newData.periods[view].fiscal_periods);
    const tableHeight = countVisibleNodes(treeData?.treeValue?.data as any) * ROW_HEIGHT;


    useEffect(() => {
        setTreeDataValue({ treeValue: TreeState.create(buildFromSchema(CashFlowSchema, newData.financial_data[view])) })
        setColumnDefs(newData.periods[view].fiscal_periods)
    }, [view])

    const renderExpensesCell = (row: any, collIndex: number) => {
        return (
            <span className="expenses-cell">
                {formatToMillion(row.data.values[collIndex])}
            </span>
        );
    }

    const renderIndexCell = (row: any) => {
        const isExpanded = row.$state.isExpanded;

        return (
            <div style={{ paddingLeft: (row.metadata.depth * 12) + 'px' }}
                className={row.metadata.hasChildren ? 'with-children' : 'without-children'}>

                {(row.metadata.hasChildren)
                    ? (
                        <button className={`toggle-button ${isExpanded ? 'expanded' : ''}`} onClick={row.toggleChildren}>
                            <svg height="20" fill="#fff" width="20" viewBox="0 0 20 20">
                                <path
                                    d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                            </svg>
                        </button>
                    )
                    : ''
                }

                <span>{row.data.name}</span>
            </div>
        );
    }

    const handleOnChange = (value: any) => {
        setTreeDataValue({ treeValue: value });
    }
    return (
        <div className="financials-table">
            <TreeTable
                height={tableHeight}
                headerHeight={52}
                onChange={handleOnChange}
                value={treeData.treeValue}>
                <TreeTable.Column
                    basis="520px"
                    // @ts-expect-error
                    grow="1"
                    renderCell={renderIndexCell}
                    renderHeaderCell={() => <span>Name</span>} />
                {
                    columnDefs.map((col: any, index: number) => {
                        return (
                            <TreeTable.Column
                                key={index}
                                basis="180px"
                                // @ts-expect-error
                                grow="0"
                                renderCell={(row) => renderExpensesCell(row, index)}
                                renderHeaderCell={() => <span> {col}</span>}
                            />
                        )
                    })
                }
            </TreeTable>
        </div>
    )
}

export default CashFlowTable