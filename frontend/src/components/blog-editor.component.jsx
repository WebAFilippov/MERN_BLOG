import { Link } from "react-router-dom"
import { AnimationWrapper } from "../common/page-animation"
import logo from "../imgs/logo.png"

export const BlogEditor = () => {
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="flex-none size-10">
          <img src={logo} alt="logo" />
        </Link>
        <p className="max-md:hidden line-clamp-1 text-black w-full text-2xl">Новый блог</p>
        <div className=" ml-auto flex gap-4">
          <button className="btn-dark py-2">Опубликовать</button>
          <button className="btn-light py-2">Черновик</button>
        </div>
      </nav>

      <AnimationWrapper>
        <section className="max-w-[900px] w-full mx-auto relative"></section>
      </AnimationWrapper>
    </>
  )
}
