import { Link } from "react-router-dom"

import { AnimationWrapper } from "../common/page-animation"
import blogBanner from "../imgs/blog banner.png"
import logo from "../imgs/logo.png"

export const BlogEditor = () => {
  const handleChangeBlogBanner = (e) => {
    const image = e.target.files[0]
  }

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
        <section>
          <div className="max-w-[900px] w-full mx-auto relative">
            <div className="relative aspect-video bg-white border-4 border-grey hover:opacity-80">
              <label htmlFor="blogBanner" className="cursor-pointer">
                <img src={blogBanner} alt="blogBanner" />
                <input
                  id="blogBanner"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  hidden
                  onChange={handleChangeBlogBanner}
                />
              </label>
            </div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  )
}
