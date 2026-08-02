import type { DraftExpense, Expense } from "../types"

export type BudgetActions =
{type: 'add-budget' , payload: {budget: number}} |
{type: 'show-modal'} |
{type: 'close-modal'}|
{type: 'add-extense', payload: {expense: DraftExpense}}

export type BudgetState = {
    budget: number,
    modal: boolean,
    expense: Expense[]

}

export const initialState : BudgetState = {
    budget : 0,
    modal: false,
    expense: []
}

export const budgetReducer = (
    state: BudgetState = initialState,
    action: BudgetActions
) => {

    if(action.type === 'add-budget'){
        return {
            ...state,
            budget: action.payload.budget
        }
    }

    if(action.type === 'show-modal'){
        return {
            ...state,
            modal: true
        }
    }
    if(action.type === 'close-modal'){
        return {
            ...state,
            modal: false
        }
    }

    if(action.type === 'add-extense'){
        return {
            ...state,
            expense: [...state.expense, action.payload.expense]
        }
    }
    return state
}