import { useState, useRef } from "react"
import { Link } from "react-router-dom"
import { Toaster, toast } from "react-hot-toast"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

import { storage } from "../common/firebase"
import { AnimationWrapper } from "../common/page-animation"
import { ProgressBar } from "./progress-bar.component"
import blogBanner from "../imgs/blog banner.png"
import logo from "../imgs/logo.png"

export const BlogEditor = () => {
  const [progressValue, setProgressValue] = useState(0)
  const [titleBlog, setTitleBlog] = useState("")
  const blogBannerRef = useRef(null)

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
      (err) => {
        setProgressValue(0)
        toast.dismiss(toastLoading)
        toast.error(
          "К сожалению, мы не можем загрузить ваше изображение.\nПожалуйста, убедитесь, что размер вашего файла не превышает 2 МБ.",
        )
      },
      () => {
        getDownloadURL(uploadFile.snapshot.ref).then((downloadURL) => {
          toast.remove()
          setProgressValue(0)
          toast.success("Фотография успено загружена")
          blogBannerRef.current.src = downloadURL
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
    setTitleBlog(e.target.value)
  }

  return (
    <>
      <Toaster />
      <nav className="navbar">
        <Link to="/" className="flex-none size-10">
          <img src={logo} alt="logo" />
        </Link>
        <p className="max-md:hidden line-clamp-1 text-black w-full text-2xl">
          {titleBlog ? titleBlog : "Новый блог"}
        </p>
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
                <img ref={blogBannerRef} src={blogBanner} alt="blogBanner" />
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
            <textarea
              name="blogTitle"
              id="blogTitle"
              placeholder="Название"
              className="text-4xl font-medium mt-10 w-full h-40 outline-none placeholder:text-opacity-40 resize-none leading-tight"
              onKeyDown={handleTitleKeyDown}
              onChange={handleTitleChange}
            ></textarea>
          </div>
        </section>
      </AnimationWrapper>
    </>
  )
}
