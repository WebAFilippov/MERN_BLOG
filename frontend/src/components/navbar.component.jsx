import { Link, Outlet } from "react-router-dom"

import logo from "../imgs/logo.png"
import { useState } from "react"

export const Navbar = () => {
  const [searchBoxVisiblility, setSearchBoxVisibility] = useState(false)

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="flex-none w-10">
          <img src={logo} alt="logo" className="w-full" />
        </Link>
        <div
          className={
            "absolute top-full left-0 py-4 px-[5vw] bg-white w-full border-b border-grey mt-0.5 md:relative md:block md:inset-0 md:p-0 md:border-none md:w-auto md:show " +
            (searchBoxVisiblility ? "show" : "hide")
          }
        >
          <input
            type="text"
            placeholder="Поиск"
            className="w-full md:w-auto bg-grey placeholder:text-dark-grey rounded-full p-4 pl-6 md:pr-[12%] pr-6 md:pl-12"
          />
          <i className="fi fi-rr-search absolute right-[10%] md:left-5 text-dark-grey text-xl top-1/2 -translate-y-1/2 md:pointer-events-none" />
        </div>
        <div className="flex items-center gap-3 md:gap-6 ml-auto">
          <button
            className="md:hidden w-12 h-12 rounded-full bg-grey flex items-center justify-center"
            onClick={() => setSearchBoxVisibility(!searchBoxVisiblility)}
          >
            {!searchBoxVisiblility ? (
              <i className="fi fi-rr-search text-dark-grey text-xl flex" />
            ) : (
              <i className="fi fi-rr-cross-small text-dark-grey text-2xl flex items-center"></i>
            )}
          </button>
          <Link to="/editor" className="hidden md:flex gap-2 link">
            <i class="fi fi-rr-file-edit"></i>
            <p>Написать</p>
          </Link>
          <Link to="/signin" className="btn-dark py-2">
            Войти
          </Link>
          <Link to="/signup" className="btn-light hidden md:block py-2">
            Регистрация
          </Link>
        </div>
      </nav>

      <Outlet />
    </>
  )
}
