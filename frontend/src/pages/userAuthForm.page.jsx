import { useContext } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { Toaster, toast } from "react-hot-toast"

import axios from "../utils/axios"
import googleIcon from "../imgs/google.png"
import { InputBox } from "../components/input.component"
import { storeInSession } from "../common/session"
import { AnimationWrapper } from "../common/page-animation"
import { UserContext } from "../App"
import { authGoogleWithPopup } from "../common/firebase"

export const UserAuthForm = ({ type }) => {
  const navigate = useNavigate()
  const {
    userAuth: { accessToken },
    setUserAuth,
  } = useContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    // eslint-disable-next-line no-undef
    let form = new FormData(formElement)
    let formData = {}
    for (let [key, value] of form.entries()) {
      formData[key] = value
    }

    const { fullname, email, password } = formData

    if (type === "signin") {
      if (!email || !password) {
        return toast.error("Все поля обязательны для заполнения")
      }
    } else {
      if (!fullname || !email || !password) {
        return toast.error("Все поля обязательны для заполнения")
      }
      if (fullname.length < 3) {
        return toast.error("Имя должно содержать минимум 3 символа")
      }
    }

    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

    if (!emailRegex.test(email)) {
      return toast.error("Пожалуйста, введите корректный адрес электронной почты")
    }
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{6,})$/
    if (!passwordRegex.test(password)) {
      return toast.error("Пожалуйста, введите корректный пароль")
    }

    let reqURL = type === "signin" ? "/auth/signin" : "/auth/signup"
    axios
      .post(reqURL, formData)
      .then(({ data }) => {
        storeInSession("user", JSON.stringify(data))
        setUserAuth(data)
        navigate("/")
      })
      .catch(({ response }) => {
        return toast.error(response.data.error)
      })
  }

  const handleGoogleAuth = async () => {
    try {
      const accessToken = await authGoogleWithPopup()

      const { data } = await axios.post("/auth/google-auth", { accessToken })

      storeInSession("user", JSON.stringify(data))
      setUserAuth(data)
      navigate("/")
    } catch (err) {
      toast.error(err.message)
    }
  }

  return accessToken ? (
    <Navigate to="/" />
  ) : (
    <AnimationWrapper keyValue={type}>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
        }}
      />
      <section className="h-cover flex justify-center items-center">
        <form id="formElement" className="w-[80%] max-w-[400px]">
          <h1 className="text-4xl text-center font-gelasio mb-14">
            {type === "signin" ? "Рады видеть вас снова!" : "Станьте частью нас сегодня!"}
          </h1>
          {type === "signup" && (
            <InputBox
              name="fullname"
              id="fullname"
              placeholder="Имя"
              type="fullname"
              icon="fi-rr-user"
            />
          )}
          <InputBox
            name="email"
            id="email"
            placeholder="Электронная почта"
            type="email"
            icon="fi-rr-envelope"
          />
          <InputBox
            name="password"
            id="password"
            placeholder="Пароль"
            type="password"
            icon="fi-rr-key"
          />

          <button type="submit" className="btn-dark center mt-10" onClick={handleSubmit}>
            {type === "signin" ? "Войти" : "Зарегистрироваться"}
          </button>

          <div className="flex w-full gap-2 items-center relative opacity-30 my-7 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p className="">или</p>
            <hr className="w-1/2 border-black" />
          </div>

          <button
            type="button"
            className="btn-dark mx-auto mb-10 flex w-[90%] items-center justify-center gap-4 normal-case"
            onClick={handleGoogleAuth}
          >
            <img src={googleIcon} alt="googleIcon" className="w-5" />
            <p>Войти с помощью Google</p>
          </button>

          {type === "signin" ? (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Нет аккаунта?
              <Link to="/signup" className="text-black text-xl underline ml-1">
                Создайте его.
              </Link>
            </p>
          ) : (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Уже зарегистрированы?
              <Link to="/signin" className="text-black text-xl underline ml-1">
                Войдите в систему.
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  )
}
