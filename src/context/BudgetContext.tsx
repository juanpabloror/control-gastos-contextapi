import { createContext, useMemo, useReducer, type ActionDispatch, type ReactNode } from "react"
import { budgetReducer, initialState, type BudgetActions, type BudgetState } from "../reducers/budget-reducer"

type BudgetContextProps = {
    state: BudgetState,
    dispatch: ActionDispatch<[action: BudgetActions]>,
    totalExpenses : number,
    remaintBudget : number
}

type BudgetProviderProps = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
    const [state, dispatch] = useReducer(budgetReducer, initialState)
    const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0), [state.expenses])
    const remaintBudget = state.budget - +totalExpenses

    return (
        <BudgetContext.Provider
            value={{
                dispatch,
                state,
                totalExpenses,
                remaintBudget
            }}
        >
            {children}
        </BudgetContext.Provider>
    );
}