import { formatDate } from "../helpers"
import type { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"

type ExpenseDetailProps = {
    expense: Expense
}

export default function ExpenseDetail({ expense } : ExpenseDetailProps) {
  return (
    <div className="bg-white shadow-lg w-full border-d border-gray-200 flex gap-5 item-center">
        <div>

        </div>
        <div>
            <p >{expense.expenseName}</p>
            <p className="text-slate-600 text-sm">{(formatDate(expense.date!.toString()))}</p>
        </div>

        <AmountDisplay amount={expense.amount}/>
    </div>
  )
}
