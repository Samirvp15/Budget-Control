import AmountDisplay from "./AmountDisplay";


export default function BudgetTracker() {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex justify-center">
                    <img src="/grafico.jpg" alt="grafica de gastos" />
                </div>

                <div className="flex flex-col justify-center items-center gap-8">
                    <button
                        type="button"
                        className="bg-pink-400 w-full p-2 text-white
                     uppercase font-bold rounded-lg"
                    >
                        Resetear App
                    </button>

                    <AmountDisplay
                        label="Presupuesto"
                        amount={500}
                    />

                    <AmountDisplay
                        label="Disponible"
                        amount={500}
                    />

                    <AmountDisplay
                        label="Gastado"
                        amount={500}
                    />


                </div>
            </div>

        </>
    )
}
