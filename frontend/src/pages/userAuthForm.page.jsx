import { Link } from "react-router-dom"

import { InputBox } from "../components/input.component"
import googleIcon from "../imgs/google.png"
import { AnimationWrapper } from "../common/page-animation"

export const UserAuthForm = ({ type }) => {
  return (
    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex justify-center items-center">
        <form className="w-[80%] max-w-[400px]">
          <h1 className="text-4xl text-center font-gelasio mb-14">
            {type === "signin" ? "Добро пожаловать!" : "Присоединяйтесь к нам!"}
          </h1>
          {type === "signup" && (
            <InputBox name="fullname" id="fullname" placeholder="Имя" type="fullname" icon="fi-rr-user" />
          )}
          <InputBox name="email" id="email" placeholder="Электронная почта" type="email" icon="fi-rr-envelope" />
          <InputBox name="password" id="password" placeholder="Пароль" type="password" icon="fi-rr-key" />

          <button type="submit" className="btn-dark center mt-10">
            {type === "signin" ? "Войти" : "Зарегистрироваться"}
          </button>

          <div className="flex w-full gap-2 items-center relative opacity-30 my-7 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p className="">или</p>
            <hr className="w-1/2 border-black" />
          </div>

          <button className="flex gap-4 items-center justify-center btn-dark w-[90%] mx-auto mb-10">
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
