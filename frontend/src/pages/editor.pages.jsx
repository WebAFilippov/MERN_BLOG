import { createContext, useContext, useState } from "react"
import { Navigate } from "react-router-dom"

import { UserContext } from "../App"
import { BlogEditor } from "../components/blog-editor.component"
import { PublishForm } from "../components/publish-form.component"

const blogStructure = {
  banner: "",
  title: "",
  description: "",
  content: [],
  tags: [],
  author: {},
}

export const EditorContext = createContext({})

export const Editor = () => {
  const [blog, setBlog] = useState(blogStructure)
  const [editorState, setEditorState] = useState("editor")
  const {
    userAuth: { accessToken },
  } = useContext(UserContext)

  return (
    <EditorContext.Provider value={{ blog, setBlog, editorState, setEditorState }}>
      {accessToken === null ? (
        <Navigate to="/signin" />
      ) : editorState === "editor" ? (
        <BlogEditor />
      ) : (
        <PublishForm />
      )}
    </EditorContext.Provider>
  )
}
