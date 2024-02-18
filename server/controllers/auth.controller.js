import bcryptjs from "bcryptjs"
import { nanoid } from "nanoid"
import jwt from "jsonwebtoken"

import User from "../model/User.js"
import { formatDataToSend } from "../utils/formatDataToSend.js"

export const signup = async (req, res, next) => {
  const { fullname, email, password } = req.body

  if (!fullname || !email || !password) {
    return res.status(403).json({ error: 'Все поля обязательны для заполнения' });
  }

  if (fullname.length < 3) {
    return res.status(403).json({ error: 'Имя должно содержать минимум 3 символа' });
  }

  if (email.length < 3) {
    return res.status(403).json({ error: 'Электронная почта должна содержать минимум 3 символа' });
  }

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!emailRegex.test(req.body.email)) {
    return res.status(403).json({ error: 'Некорректный формат email' });
  }

  const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{6,})$/;
  if (!passwordRegex.test(req.body.password)) {
    return res.status(403).json({ error: 'Некорректный формат пароля' });
  }

  const duplicateEmail = await User.exists({ "personal_info.email": email })
  if (duplicateEmail) {
    return res.status(400).json({ error: "Такой Email существует" })
  }

  let username = email.split("@")[0]
  const existsUsername = await User.exists({ "personal_info.username": username })
  if (existsUsername) {
    username += nanoid().substring(0, 5)
  }

  const hashedPassword = await bcryptjs.hash(password, 10)

  const newUser = await User.create({
    personal_info: {
      fullname, email, password: hashedPassword, username
    }
  })

  let returnedData = formatDataToSend(newUser._doc)
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_TOKEN)
  returnedData.accessToken = token

  return res.status(200).json({ success: true, returnedData })
}

export const signin = async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(403).json({ error: 'Все поля обязательны для заполнения' });
  }

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!emailRegex.test(req.body.email)) {
    return res.status(403).json({ error: 'Некорректный формат email' });
  }

  const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{6,})$/;
  if (!passwordRegex.test(req.body.password)) {
    return res.status(403).json({ error: 'Некорректный формат пароля' });
  }

  const existingUser = await User.findOne({ "personal_info.email": email })
  if (!existingUser) {
    return res.status(404).json({ error: "Пользователь с указанным адресом электронной почты не найден" })
  }

  const currectlyPassword = await bcryptjs.compare(password, existingUser.personal_info.password)
  if (!currectlyPassword) {
    return res.status(403).json({ error: "Неверный пароль. Пожалуйста, проверьте введенный пароль и попробуйте снова." })
  }

  let returnedData = formatDataToSend(existingUser._doc)
  const token = jwt.sign({ id: existingUser._id }, process.env.JWT_TOKEN)
  returnedData.accessToken = token

  res.status(200).json({ success: true, user: returnedData })
}