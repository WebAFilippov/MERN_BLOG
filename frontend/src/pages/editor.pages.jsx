import { useContext, useState } from "react"
import { Navigate } from "react-router-dom"

import { UserContext } from "../App"
import { BlogEditor } from "../components/blog-editor.component"
import { PublishForm } from "../components/publish-form.component"

export const Editor = () => {
  const [editorState, setEditorState] = useState("editor")
  const {
    userAuth: { accessToken },
  } = useContext(UserContext)

  return accessToken === null ? (
    <Navigate to="/signin" />
  ) : editorState === "editor" ? (
    <BlogEditor />
  ) : (
    <PublishForm />
  )
}
