import { Link } from "react-router-dom"

export function ButtonWarn({label, buttonText, to}) {
    return <div className="py-4 text-sm font-medium flex justify-center">
      <div>
        {label}
      </div>
      <Link className="pointer underline pl-1 cursor-pointer" to={to}>
        {buttonText}
      </Link>
    </div>
}