import { categories } from "../data/categories";
import { DatePicker } from 'react-date-picker'
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'
import type { DraftExpense } from "../types";
import { useEffect, useState, type ChangeEvent } from "react";
import type { Value } from "react-calendar/dist/shared/types.js";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";


export default function ExpenseForm() {
    const initialExpense: DraftExpense = {

        amount: 0,
        expenseName: '',
        category: '',
        date: new Date
    }

    const [expense, setExpense] = useState<DraftExpense>(initialExpense)
    const [previousAmount, setPreviousAmount] = useState(0)
    const [error, setError] = useState('')

    const { dispatch, state, remaintBudget } = useBudget()

    useEffect(() => {
        if (state.editingId) {
            const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0]
            setExpense(editingExpense)
            setPreviousAmount(editingExpense.amount)
        }
    }, [state.editingId])
    const handleChange = (e: ChangeEvent<HTMLSelectElement, HTMLSelectElement> | ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        const { name, value } = e.target
        const isAmountField = ['amount'].includes(name)
        setExpense({
            ...expense,
            [name]: isAmountField ? +value : value
        })  

    }

    const handleChangeDate = (value: Value) => {
        console.log(value)
        setExpense({ ...expense, date: value })
    }

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (Object.values(expense).includes('')) {
            setError('Todos los cambios son obligatorios')
            return
        }

        if ((expense.amount - previousAmount)> remaintBudget) {
            setError('Presupuesto revasado')
            return
        }

        if(state.editingId){
            dispatch({type: 'update-expense', payload: {expense: {id: state.editingId, ...expense}}})
        }else{

            dispatch({ type: 'add-extense', payload: { expense } })
        }

        setExpense(initialExpense)
        setPreviousAmount(0)
    }
    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">{state.editingId ? 'Guardar Cambios' : 'Nuevo Gasto'} </legend>

            {error && <ErrorMessage>{error}</ErrorMessage>}
            <div className="flex flex-col gap-2">
                <label htmlFor="expenseName" className="text-xl">Nombre Gasto:</label>
                <input type="text" id="expenseName" className="bg-slate-100 p-2" placeholder="Añade el Nombre del Gasto"
                    name="expenseName"
                    value={expense.expenseName}
                    onChange={handleChange}

                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">Cantidad:</label>
                <input type="number" className="bg-slate-100 p-2" id="amount" placeholder="Añade la Cantidad del Gasto"
                    name="amount" value={expense.amount} onChange={handleChange} />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-xl">Categoria:</label>
                <select className="bg-slate-100 p-2" id="category"
                    name="category" value={expense.category} onChange={handleChange}>
                    <option value=""></option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">Fecha gasto:</label>
                <DatePicker
                    className='bg-slate-100 p-2 border-0'
                    value={expense.date}
                    onChange={handleChangeDate}
                />
            </div>

            <input type="submit" className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg" value={state.editingId ? 'Guardar Cambios' : 'Registrar Gasto'} />
        </form>
    )
}
