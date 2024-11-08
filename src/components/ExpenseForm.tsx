import { categories } from '../data/categories';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { DraftExpense, Value } from "../types";
import ErrorMessage from './ErrorMessage';
import { useBudget } from '../hooks/useBudget';



export default function ExpenseForm() {

  //STATES
  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date()
  })

  const [error, setError] = useState('')
  const [previousAmount, setPreviousAmount] = useState(0)
  const { dispatch, state, remainingBudget } = useBudget()

  useEffect(() => {
    if (state.editingId) {
      const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0]
      setExpense(editingExpense)
      setPreviousAmount(editingExpense.amount)
    }
  }, [state.editingId])

  //VALIDATIONS FUNCT OF FORM
  const handleChange = (e: ChangeEvent<HTMLInputElement>
    | ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    const isAmountField = ['amount'].includes(name)
    setExpense({
      ...expense,
      [name]: isAmountField ? +value : value
    })
  }

  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    //VALIDAR
    if (Object.values(expense).includes('')) {
      setError('Todos los campos son obligatorios')
      return
    }

    //VALIDAR QUE GASTO NO PASE DEL LIMITE DE PRESUPUESTO
    if ((expense.amount - previousAmount) > remainingBudget) {
      setError('Ese gasto se sale del presupuesto')
      return
    }

    //AGREGAR O ACTUALIZAR GASTO
    if (state.editingId) {
      dispatch({ type: 'update-expense', payload: { expense: { id: state.editingId, ...expense } } })
    } else {
      dispatch({ type: 'add-expense', payload: { expense } })
    }

    //REINICIAR STATE
    setExpense({
      amount: 0,
      expenseName: '',
      category: '',
      date: new Date()
    })

    setPreviousAmount(0)


  }

  return (
    <>

      <form action="" className="space-y-5" onSubmit={handleSubmit}>
        <legend className=" uppercase text-center text-2xl 
      font-black border-b-4 py-2 border-blue-500">
          {state.editingId ? 'Actualizar datos' : 'Nuevo Gasto'}
        </legend>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <div className="flex flex-col gap-2">
          <label
            htmlFor="expenseName"
            className="text-xl">
            Nombre de Gasto:
          </label>
          <input
            type="text"
            id="expenseName"
            placeholder="Agrega nombre del gasto"
            className="bg-slate-200 p-2"
            name="expenseName"
            value={expense.expenseName}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="amount"
            className="text-xl">
            Cantidad:
          </label>
          <input
            type="text"
            id="amount"
            placeholder="Agrega cantidad del gasto: ej. 300"
            className="bg-slate-200 p-2"
            name="amount"
            value={expense.amount}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="category"
            className="text-xl">
            Categoria:
          </label>
          <select
            id="category"
            className="bg-slate-200 p-2"
            name="category"
            value={expense.category}
            onChange={handleChange}
          >
            <option value="">--Seleccione--</option>
            {categories.map(category => (
              <option
                key={category.id}
                value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="amount"
            className="text-xl"
          >
            Fecha Gasto:
          </label>
          <DatePicker
            className="bg-slate-100 p-2 border-0"
            onChange={handleChangeDate}
            value={expense.date}
          />
        </div>


        <input
          type="submit"
          className="bg-blue-600 cursor-pointer w-full p-2
             text-white uppercase font-bold rounded-lg"
          value={state.editingId ? 'Guardar Cambios' : 'Registrar Gasto'} />


      </form>

    </>
  )
}
