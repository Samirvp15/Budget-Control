import { categories } from "./data/categories";



export default function ExpenseForm() {
  return (
    <>

      <form action="" className="space-y-5">
        <legend className=" uppercase text-center text-2xl 
      font-black border-b-4 py-2 border-purple-500">
          Nuevo Gasto
        </legend>

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
            name="category">
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

        <input
          type="submit"
          className="bg-blue-600 cursor-pointer w-full p-2
             text-white uppercase font-bold rounded-lg"
             value={'Registrar gasto'} />


      </form>

    </>
  )
}
