import User from "../model/User.js"

export const transformEmailToUser = async (email) => {
  let username = email.split("@")[0]

  const existsUsername = await User.exists({ "personal_info.username": username })
  if (existsUsername) {
    username += nanoid().substring(0, 5)
  }

  return username
}