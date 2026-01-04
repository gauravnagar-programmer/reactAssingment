import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"

const Header = () => {
  const location = useLocation()
  const [menuActive,setMenuActive] = useState(false)

  useEffect(() =>{
    setMenuActive(false)
  },[location.pathname])

  return (
    <header className="bg-indigo-600 text-white">
  <div className="mx-auto max-w-7xl flex items-center justify-between px-5 md:px-10 py-4">
    
    {/* Logo / Brand */}
    <h1 className="text-xl md:text-2xl font-bold tracking-tight">
      <Link to={"/"}>
        FrontEnd
      </Link>
    
    </h1>

    {/* Navigation */}
    <nav className="hidden md:flex items-center space-x-10 text-sm font-medium">
      <Link to="/" className="hover:text-indigo-200 transition-colors">
        Home
      </Link>
      <Link to="/product/form" className="hover:text-indigo-200 transition-colors">
        Form
      </Link>
    </nav>


    {/* Mobile menu placeholder */}
    <div className="md:hidden relative text-sm font-medium">

    <button onClick={() => setMenuActive(!menuActive)} className="cursor-pointer">
      ☰
    </button>
{menuActive && 
    <nav className="flex flex-col mr-3 border-2 rounded-md border-white bg-gray-700   absolute top-0 right-5 space-y-3">
      <Link to="/" className="active:bg-indigo-600 px-3 py-2">Home</Link>
      <Link to="/product/form" className="active:bg-indigo-600  px-3 py-2" >Form</Link>
    </nav>
}
    </div>

  </div>
</header>

  )
}

export default Header