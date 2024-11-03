import { ReactNode } from "react"


type ErrorMessageProps = {
    children: ReactNode
}



export default function ErrorMessage({children}: ErrorMessageProps) {
  return (
    <p className="bg-red-500 text-center text-sm font-bold text-white">
        {children}
    </p>
  )
}


