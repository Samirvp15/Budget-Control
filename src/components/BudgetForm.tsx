import { ChangeEvent, useState } from "react"


export default function BudgetForm() {

    const [budget, setBudget] = useState(0)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber)
    }

    return (
        <>

            <form action="" className=" space-y-5">
                <div className="flex flex-col space-y-5">
                    <label htmlFor="budget"
                        className="text-4xl text-orange-500 font-bold text-center">
                        Definir Presupuesto
                    </label>
                    <input
                        id="budgetID"
                        type="number"
                        className="w-full bg-white border border-gray-400 p-2"
                        placeholder="Define tu presupuesto"
                        name="budget"
                        value={budget}
                        onChange={handleChange}
                    />
                </div>


                <input type="submit"
                    className="w-full bg-orange-400 hover:bg-orange-500 cursor-pointer p-2 text-white font-bold uppercase"
                    value="Definir tu presupuesto"
                    placeholder="Define tu presupuesto"
                    name="budget"
                />



            </form>

        </>
    )
}
