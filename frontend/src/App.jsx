import { Route, Routes } from "react-router-dom"
import { createContext, useEffect, useState } from "react"

import { Navbar } from "./components/navbar.component"
import { UserAuthForm } from "./pages/userAuthForm.page"
import { lookInSession } from "./common/session"
import { Editor } from "./pages/editor.pages"

export const UserContext = createContext({})

export const App = () => {
  const [userAuth, setUserAuth] = useState({})

  useEffect(() => {
    const userSession = lookInSession("user")

    userSession ? setUserAuth(JSON.parse(userSession)) : setUserAuth({ accessToken: null })
  }, [])

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="signin" element={<UserAuthForm type="signin" />} />
          <Route path="signup" element={<UserAuthForm type="signup" />} />
        </Route>
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </UserContext.Provider>
  )
}
