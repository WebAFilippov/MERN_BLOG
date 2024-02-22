import { Link } from "react-router-dom"
import { useContext } from "react"

import { AnimationWrapper } from "../common/page-animation"
import { UserContext } from "../App"

export const UserNavigationPanel = () => {
  const {
    userAuth: { username },
    setUserAuth,
  } = useContext(UserContext)

  const handleSingOut = () => {
    sessionStorage.clear("user")
    setUserAuth({ accessToken: null })
  }

  return (
    <AnimationWrapper className="absolute z-50" transition={{ duration: 0.2 }}>
      <div className="absolute right-0 bg-white border border-grey w-60 duration-200 divide-y-[1px] divide-grey">
        <div>
          <Link to="/editor" className="link flex gap-4 p-4 pl-8 md:hidden">
            <i className="fi fi-rr-file-edit"></i>
            <p>Написать</p>
          </Link>
          <Link to={`/user/${username}`} className="link flex gap-2 p-4 pl-8">
            Профиль
          </Link>
          <Link to="/dashboard/blogs" className="link flex gap-2 p-4 pl-8">
            Панель управления
          </Link>
          <Link to="/settings/edit-profile" className="link flex gap-2 p-4 pl-8">
            Настройки
          </Link>
        </div>
        <div>
          <Link className="pl-8 p-4 block text-left bg-white hover:bg-grey" onClick={handleSingOut}>
            <h1 className="font-bold text-xl">Выйти</h1>
            <p className="text-dark-grey truncate">@{username}</p>
          </Link>
        </div>
      </div>
    </AnimationWrapper>
  )
}
