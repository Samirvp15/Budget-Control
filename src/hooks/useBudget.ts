import { useContext } from "react"
import { BudgetContext } from "../context/BudgetContext"


export const useBudget = () =>{
    const context = useContext(BudgetContext)
    if(!context){
        throw new Error('errros')
    }
    return context
}

/*
{isValidBudget && (
        <main className="max-w-3xl mx-auto py-10">
            <ExpenseModal/>
        </main>
      )}

*/


