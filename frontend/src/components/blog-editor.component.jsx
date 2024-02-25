import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { Toaster, toast } from "react-hot-toast"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

import { storage } from "../common/firebase"
import { ProgressBar } from "./progress-bar.component"
import { EditorContext } from "../pages/editor.pages"
import { AnimationWrapper } from "../common/page-animation"
import blogBanner from "../imgs/blog banner.png"
import logo from "../imgs/logo.png"

export const BlogEditor = () => {
  const { blog, setBlog } = useContext(EditorContext)
  const [progressValue, setProgressValue] = useState(0)

  const handleUploadBlogBanner = (e) => {
    const image = e.target.files[0]
    if (!image) return

    const storageRef = ref(storage)
    const fileName = new Date().getDate() + image.name
    const fileRef = ref(storageRef, "images/")
    const fullRef = ref(fileRef, fileName)
    const uploadFile = uploadBytesResumable(fullRef, image)

    const toastLoading = toast.loading("Загрузка...")
    uploadFile.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgressValue(Math.round(progress))
      },
      // eslint-disable-next-line no-unused-vars
      (err) => {
        setProgressValue(0)
        toast.dismiss(toastLoading)
        toast.error(
          "К сожалению, мы не можем загрузить ваше изображение.\nПожалуйста, убедитесь, что размер вашего файла не превышает 2 МБ.",
        )
      },
      () => {
        getDownloadURL(uploadFile.snapshot.ref).then((downloadURL) => {
          toast.dismiss(toastLoading)
          setProgressValue(0)
          toast.success("Фотография успено загружена")
          setBlog({ ...blog, banner: downloadURL })
        })
      },
    )
  }

  const handleTitleKeyDown = (e) => {
    if (e.keyCode === 13) e.preventDefault()
  }

  const handleTitleChange = (e) => {
    const element = e.target
    element.style.height = "auto"
    element.style.height = element.scrollHeight + "px"
    setBlog({ ...blog, title: e.target.value })
  }

  const handleErrorBanner = (e) => {
    const imgTarget = e.target
    imgTarget.src = blogBanner
  }

  return (
    <>
      <Toaster />
      <nav className="navbar">
        <Link to="/" className="flex-none size-10">
          <img src={logo} alt="logo" />
        </Link>
        <p className="max-md:hidden line-clamp-1 text-black w-full text-2xl">
          {blog.title ? blog.title : "Новый блог"}
        </p>
        <div className=" ml-auto flex gap-4">
          <button className="btn-dark py-2">Опубликовать</button>
          <button className="btn-light py-2">Черновик</button>
        </div>
      </nav>

      <AnimationWrapper>
        <section>
          <div className="max-w-[900px] w-full mx-auto relative">
            {/* banner */}
            <div className="relative aspect-video bg-white border-4 border-grey hover:opacity-80 duration-500">
              <label htmlFor="blogBanner" className="cursor-pointer">
                <img src={blog.banner} alt="blogBanner" onError={handleErrorBanner} />
                <input
                  id="blogBanner"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  hidden
                  onChange={handleUploadBlogBanner}
                />
              </label>
            </div>
            {progressValue > 0 && <ProgressBar value={progressValue} />}

            {/* title */}
            <textarea
              name="blogTitle"
              id="blogTitle"
              placeholder="Название"
              className="text-4xl font-medium mt-10 w-full h-40 outline-none placeholder:text-opacity-40 resize-none leading-tight"
              style={{ height: "auto" }}
              onKeyDown={handleTitleKeyDown}
              onChange={handleTitleChange}
            ></textarea>

            <hr className="w-full opacity-10 my-5" />
          </div>
        </section>
      </AnimationWrapper>
    </>
  )
}
