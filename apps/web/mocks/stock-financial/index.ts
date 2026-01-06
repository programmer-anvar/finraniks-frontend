const NewIncomeStatementSchema = [
    {
        data: { name: 'Total Revenue', key: 'total_revenue' },
    },
    {
        data: { name: "Cost of goods sold", key: "cost_of_goods" },
        children: [
            {
                data: { name: "Deprecation and amortization", key: "dep_amort_exp_income_s" },
            },
            {
                data: { name: "Other cost of goods sold", key: "cost_of_goods_excl_dep_amort" },
            },
        ],
    },
    {
        data: { name: 'Gross Profit', key: 'gross_profit' },
        height: 32
    },
    {
        data: {
            name: "Operating expenses (excl. COGS)",
            key: "operating_expenses",
        },
        children: [
            {
                data: {
                    name: "Selling/general/admin expenses, total",
                    key: "sell_gen_admin_exp_total",
                },
                children: [
                    {
                        data: {
                            name: "Research & development",
                            key: "research_and_dev",
                        }
                    },
                    {
                        data: {
                            name: "Selling/general/admin expenses, other",
                            key: "sell_gen_admin_exp_other",
                        }
                    }
                ]
            },
            {
                data: {
                    name: "Other operating expenses, total",
                    key: "other_oper_expense_total",
                }
            }
        ]
    },
    {
        data: { name: 'Operating Income', key: 'oper_income' },
    },
    {
        data: {
            name: "Non-operating income, total",
            key: "total_non_oper_income",
        },
        children: [
            {
                data: {
                    name: "Interest expense, net of interest capitalized",
                    key: "non_oper_interest_exp",
                },
                children: [
                    {
                        data: {
                            name: "Interest expense on debt",
                            key: "interest_expense_on_debt",
                        }
                    },
                    {
                        data: {
                            name: "Interest capitalized",
                            key: "interest_capitalized",
                        }
                    }
                ]
            },
            {
                data: {
                    name: "Non-operating income, excl. interest expenses",
                    key: "non_oper_income",
                },
                children: [
                    {
                        data: {
                            name: "Non-operating interest income",
                            key: "non_oper_interest_income",
                        }
                    },
                    {
                        data: {
                            name: "Pretax equity in earnings",
                            key: "pretax_equity_in_earnings",
                        }
                    },
                    {
                        data: {
                            name: "Miscellaneous non-operating expense",
                            key: "other_income",
                        }
                    }
                ]
            },
            {
                data: {
                    name: "Unusual income/expense",
                    key: "unusual_expense_inc",
                }
            }
        ]
    },
    {
        data: {
            name: "Pretax income",
            key: "pretax_income",
        },
    },
    {
        data: {
            name: "Equity in earnings",
            key: "equity_in_earnings",
        }
    },
    {
        data: {
            name: "Taxes",
            key: "income_tax",
        }
    },
    {
        data: {
            name: "Non-controlling/minority interest",
            key: "minority_interest_exp",
        }
    },
    {
        data: {
            name: "After tax other income/expense",
            key: "after_tax_other_income",
        }
    },
    {
        data: {
            name: "Net income before discontinued operations",
            key: "net_income_bef_disc_oper",
        }
    },
    {
        data: {
            name: "Discontinued operations",
            key: "discontinued_operations",
        }
    },
    {
        data: {
            name: "Net income",
            key: "net_income",
        }
    },
    {
        data: {
            name: "Dilution adjustment",
            key: "dilution_adjustment",
        }
    },
    {
        data: {
            name: "Preferred dividends",
            key: "preferred_dividends",
        }
    },
    {
        data: {
            name: "Diluted net income available to common stockholders",
            key: "diluted_net_income",
        }
    },
    {
        data: {
            name: "Basic earnings per share (Basic EPS)",
            key: "earnings_per_share_basic",
        }
    },
    {
        data: {
            name: "Diluted earnings per share (Diluted EPS)",
            key: "earnings_per_share_diluted",
        }
    },
    {
        data: {
            name: "Average basic shares outstanding",
            key: "basic_shares_outstanding",
        },
    },
    {
        data: {
            name: "Diluted shares outstanding",
            key: "diluted_shares_outstanding",
        },
    },
    {
        data: {
            name: "EBITDA",
            key: "ebitda",
        },
    },
    {
        data: {
            name: "EBIT",
            key: "ebit",
        },
    },
    {
        data: {
            name: "Total operating expenses",
            key: "total_oper_expense",
        },
    }
]

const BalanceSheetSchema = [
    {
        data: { name: 'Total assets', key: 'total_assets' },
        children: [
            {
                data: { name: 'Total current assets', key: 'total_current_assets' },
                children: [
                    {
                        data: { name: 'Cash and short term investments', key: 'cash_n_short_term_invest' },
                        children: [
                            {
                                data: { name: 'Cash & equivalents', key: 'cash_n_equivalents' },
                            },
                            {
                                data: { name: 'Short term investments', key: 'short_term_invest' },
                            },
                        ]
                    },
                    {
                        data: { name: 'Total receivables, net', key: 'total_receivables_net' },
                        children: [
                            {
                                data: { name: 'Accounts receivable - trade, net', key: 'accounts_receivables_net' },
                            },
                            {
                                data: { name: 'Other receivables', key: 'other_receivables' },
                            }
                        ]
                    },
                    {
                        data: { name: 'Total inventory', key: 'total_inventory' },
                        children: [
                            {
                                data: { name: 'Inventories - work in progress', key: 'inventory_work_in_progress' },
                            },
                            {
                                data: { name: 'Inventories - progress payments & other', key: 'inventory_progress_payments' },
                            },
                            {
                                data: { name: 'Inventories - finished goods', key: 'inventory_finished_goods' },
                            },
                            {
                                data: { name: 'Inventories - raw materials', key: 'inventory_raw_materials' },
                            }
                        ]
                    },
                    {
                        data: { name: 'Prepaid expenses', key: 'prepaid_expenses' },
                    },
                    {
                        data: { name: 'Other current assets, total', key: 'other_current_assets_total' },
                    },
                ]
            },
            {
                data: { name: 'Total non-current assets', key: 'total_non_current_assets' },
                children: [
                    {
                        data: { name: 'Long term investments', key: 'long_term_investments' },
                        children: [
                            {
                                data: { name: 'Note receivable - long term', key: 'long_term_note_receivable' },
                            },
                            {
                                data: { name: 'Investments in unconsolidated subsidiaries', key: 'investments_in_unconcsolidate' },
                            },
                            {
                                data: { name: 'Other investments', key: 'other_investments' },
                            }
                        ]
                    },
                    {
                        data: { name: 'Net property/plant/equipment', key: 'ppe_total_net' },
                        children: [
                            {
                                data: { name: 'Gross property/plant/equipment', key: 'ppe_total_gross' },
                            },
                            {
                                data: { name: 'Accumulated depreciation, total', key: 'accum_deprec_total' }
                            }
                        ]
                    },
                    {
                        data: { name: 'Deferred tax assets', key: 'deferred_tax_assests' },
                    },
                    {
                        data: { name: 'Net intangible assets', key: 'intangibles_net' },
                        children: [
                            {
                                data: { name: 'Goodwill, net', key: 'goodwill' },
                            },
                            {
                                data: { name: 'Other intangibles, net', key: 'other_intangibles_net' },
                            }
                        ]
                    },
                    {
                        data: { name: 'Deferred charges', key: 'deferred_charges' },
                    },
                    {
                        data: { name: 'Other long term assets, total', key: 'long_term_other_assets_total' },
                    },
                ]
            }
        ]
    },
    {
        data: { name: 'Total liabilities', key: 'total_liabilities' },
        children: [
            {
                data: { name: 'Total current liabilities', key: 'total_current_liabilities' },
                children: [
                    {
                        data: { name: 'Short term debt', key: 'short_term_debt' },
                        children: [
                            {
                                data: { name: 'Current portion of LT debt and capital leases', key: 'current_port_debt_capital_leases' },
                            },
                            {
                                data: { name: 'Short term debt excl. current portion of LT debt', key: 'short_term_debt_excl_current_port' },
                            },
                        ]
                    },
                    {
                        data: { name: 'Accounts payable', key: 'accounts_payable' },
                    },
                    {
                        data: { name: 'Income tax payable', key: 'income_tax_payable' },
                    },
                    {
                        data: { name: 'Accrued payroll', key: 'accrued_payroll' },
                    },
                    {
                        data: { name: 'Deferred income, current', key: 'deferred_income_current' },
                    },
                    {
                        data: { name: 'Other current liabilities', key: 'other_current_liabilities' },
                    },
                ]
            },
            {
                data: { name: 'Total non-current liabilities', key: 'total_non_current_liabilities' },
                children: [
                    {
                        data: { name: 'Long term debt', key: 'long_term_debt' },
                        children: [
                            {
                                data: { name: 'Long term debt excl. lease liabilities', key: 'long_term_debt_excl_capital_lease' },
                            },
                            {
                                data: { name: 'Capital and operating lease obligations', key: 'capital_operating_lease_obligations' },
                                children: [
                                    {
                                        data: { name: 'Capital lease obligations', key: 'capital_lease_obligations' },
                                    },
                                    {
                                        data: { name: 'Operating lease liabilities', key: 'operating_lease_liabilities' },
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        data: { name: 'Provision for risks & charge', key: 'provision_f_risks' },
                    },
                    {
                        data: { name: 'Deferred tax liabilities', key: 'deferred_tax_liabilities' },
                    },
                    {
                        data: { name: 'Deferred income, non-current', key: 'deferred_income_non_current' },
                    },
                    {
                        data: { name: 'Other non-current liabilities, total', key: 'other_liabilities_total' },
                    },
                ]
            }
        ]
    },
    {
        data: { name: 'Total equity', key: 'total_equity' },
        children: [
            {
                data: { name: 'Shareholders\' equity', key: 'shrhldrs_equity' },
                children: [
                    {
                        data: { name: 'Common equity, total', key: 'common_equity_total' },
                        children: [
                            {
                                data: { name: 'Retained earnings', key: 'retained_earnings' },
                            },
                            {
                                data: { name: 'Paid in capital', key: 'paid_in_capital' },
                                children: [
                                    {
                                        data: { name: 'Common stock par/Carrying value', key: 'common_stock_par' },
                                    },
                                    {
                                        data: { name: 'Additional paid-in capital/Capital surplus', key: 'additional_paid_in_capital' },
                                    },
                                    {
                                        data: { name: 'Treasury stock - common', key: 'treasury_stock_common' },
                                    },
                                ]
                            },
                            {
                                data: { name: 'Other common equity', key: 'other_common_equity' },
                            }
                        ]
                    },
                    {
                        data: { name: 'Preferred stock, carrying value', key: 'preferred_stock_carrying_value' },
                    }
                ]
            },
            {
                data: { name: 'Minority interest', key: 'minority_interest' },
            }
        ]
    },
    {
        data: { name: 'Total liabilities & shareholders\' equities', key: 'total_liabilities_shrhldrs_equity' },
    },
    {
        data: { name: 'Total debt', key: 'total_debt' },
    },
]


const CashFlowSchema = [
    {
        data: { name: 'Cash from operating activities', key: 'cash_f_operating_activities' },
        children: [
            {
                data: { name: 'Funds from operations', key: 'funds_f_operations' },
                children: [
                    {
                        data: { name: 'Net income (cash flow)', key: 'net_income_starting_line' },
                    },
                    {
                        data: { name: 'Depreciation & amortization (cash flow)', key: 'cash_flow_deprecation_n_amortization' },
                        children: [
                            {
                                data: { name: 'Depreciation/depletion', key: 'depreciation_depletion' },
                            },
                            {
                                data: { name: 'Amortization', key: 'amortization' },
                            }
                        ]
                    },
                    {
                        data: { name: 'Deferred taxes (cash flow)', key: 'cash_flow_deferred_taxes' },
                    },
                    {
                        data: { name: 'Non-cash items', key: 'non_cash_items' },
                    },
                ]
            },
            {
                data: { name: 'Changes in working capital', key: 'changes_in_working_capital' },
                children: [
                    {
                        data: { name: 'Change in accounts receivable', key: 'change_in_accounts_receivable' },
                    },
                    {
                        data: { name: 'Change in taxes payable', key: 'change_in_taxes_payable' },
                    },
                    {
                        data: { name: 'Change in accounts payable', key: 'change_in_accounts_payable' },
                    },
                    {
                        data: { name: 'Change in accrued expenses', key: 'change_in_accrued_expenses' },
                    },
                    {
                        data: { name: 'Change in inventories', key: 'change_in_inventories' },
                    },
                    {
                        data: { name: 'Change in other assets/liabilities', key: 'change_in_other_assets' },
                    },
                ]
            }
        ]
    },
    {
        data: { name: 'Cash from investing activities', key: 'cash_f_investing_activities' },
        children: [
            {
                data: { name: 'Purchase/sale of business, net', key: 'purchase_sale_business' },
                children: [
                    {
                        data: { name: 'Sale of fixed assets & businesses', key: 'sales_of_business' },
                    },
                    {
                        data: { name: 'Purchase/acquisition of business', key: 'purchase_of_business' },
                    }
                ]
            },
            {
                data: { name: 'Purchase/sale of investments, net', key: 'purchase_sale_investments' },
                children: [
                    {
                        data: { name: 'Sale/maturity of investments', key: 'sales_of_investments' },
                    },
                    {
                        data: { name: 'Purchase of investments', key: 'purchase_of_investments' },
                    }
                ]
            },
            {
                data: { name: 'Capital expenditures', key: 'capital_expenditures' },
                children: [
                    {
                        data: { name: 'Capital expenditures - fixed assets', key: 'capital_expenditures_fixed_assets' },
                    },
                    {
                        data: { name: 'Capital expenditures - other assets', key: 'capital_expenditures_other_assets' },
                    }
                ]
            },
            {
                data: { name: 'Other investing cash flow items, total', key: 'other_investing_cash_flow_items_total' },
                children: [
                    {
                        data: { name: 'Investing activities – other sources', key: 'other_investing_cash_flow_sources' },
                    },
                    {
                        data: { name: 'Investing activities – other uses', key: 'other_investing_cash_flow_uses' },
                    }
                ]
            },
        ]
    },
    {
        data: { name: 'Cash from financing activities', key: 'cash_f_financing_activities' },
        children: [
            {
                data: { name: 'Issuance/retirement of stock, net', key: 'issuance_of_stock_net' },
                children: [
                    {
                        data: { name: 'Sale of common & preferred stock', key: 'sale_of_stock' },
                    },
                    {
                        data: { name: 'Repurchase of common & preferred stock', key: 'purchase_of_stock' },
                    }
                ]
            },
            {
                data: { name: 'Issuance/retirement of debt, net', key: 'issuance_of_debt_net' },
                children: [
                    {
                        data: { name: 'Issuance/retirement of long term debt', key: 'issuance_of_long_term_debt' },
                        children: [
                            {
                                data: { name: 'Issuance of long term debt', key: 'supplying_of_long_term_debt' },
                            },
                            {
                                data: { name: 'Reduction of long term debt', key: 'reduction_of_long_term_debt' },
                            }
                        ]
                    },
                    {
                        data: { name: 'Issuance/retirement of short term debt', key: 'issuance_of_short_term_debt' },
                    },
                    {
                        data: { name: 'Issuance/retirement of other debt', key: 'issuance_of_other_debt' },
                    }
                ]
            },
            {
                data: { name: 'Total cash dividends paid', key: 'total_cash_dividends_paid' },
                children: [
                    {
                        data: { name: 'Common dividends paid', key: 'common_dividends_cash_flow' },
                    },
                    {
                        data: { name: 'Preferred dividends paid', key: 'preferred_dividends_cash_flow' },
                    }
                ]
            },
            {
                data: { name: 'Other financing cash flow items, total', key: 'other_financing_cash_flow_items_total' },
                children: [
                    {
                        data: { name: "Financing activities – other sources", key: "other_financing_cash_flow_sources" },
                    },
                    {
                        data: { name: "Financing activities – other uses", key: "other_financing_cash_flow_uses" },
                    },
                ]
            }
        ]
    },
    {
        data: { name: 'Free cash flow', key: 'free_cash_flow' },
    }
]

const TableClasses = {
    information: '--information',
    success: '--success',
    error: '--error',
    warning: '--warning',
}


export { NewIncomeStatementSchema, BalanceSheetSchema, CashFlowSchema, TableClasses }