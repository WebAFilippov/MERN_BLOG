import { useState } from "react"
import { cn } from "./../utils/cn"

export const InputBox = ({ name, type, id, placeholder, value, icon }) => {
  const [passwordVisible, setPasswordVisible] = useState(false)

  return (
    <div className="relative mb-4 w-full">
      <input
        className="input-box"
        name={name}
        id={id}
        type={type === "password" ? (passwordVisible ? "text" : "password") : type}
        placeholder={placeholder}
        defaultValue={value}
      />
      <i className={cn("fi", icon, "input-icon")}></i>
      {type === "password" && (
        <i
          className={cn(
            "fi",
            "input-icon left-auto right-4 cursor-pointer",
            passwordVisible ? "fi-rr-eye-crossed" : "fi-rr-eye",
          )}
          onClick={() => setPasswordVisible(!passwordVisible)}
        />
      )}
    </div>
  )
}
