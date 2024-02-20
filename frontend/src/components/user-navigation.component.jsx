import { Link } from "react-router-dom"
import { useContext } from "react"

import { AnimationWrapper } from "../common/page-animation"
import { UserContext } from "../App"

export const UserNavigationPanel = () => {
  const {
    userAuth: { username },
  } = useContext(UserContext)

  return (
    <AnimationWrapper className="absolute z-50" transition={{ duration: 0.2 }}>
      <div className="absolute right-0 bg-white border border-grey w-60 duration-200">
        <Link className="link flex gap-4 p-4 pl-8 md:hidden">
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
        <Link className="pl-8 p-4 block text-left border-t border-grey hover:bg-grey">
          <h1 className="font-bold text-xl">Выйти</h1>
          <p className="text-dark-grey">@{username}</p>
        </Link>
      </div>
    </AnimationWrapper>
  )
}
