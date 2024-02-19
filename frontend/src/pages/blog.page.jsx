import { useOutletContext } from "react-router-dom"

export const Blog = () => {
  const [test, _, test2] = useOutletContext()

  return (
    <div>
      <div>{test}</div>
      <div>{test2}</div>
    </div>
  )
}
