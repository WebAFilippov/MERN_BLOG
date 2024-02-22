import { logEvents } from "./logEvents.js"

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const name = err.name || "ERROR"
  const message = err.message || "Ошибка сервера"

  logEvents(`${statusCode} ${name} ${message}`, "errLog.txt")
  console.log(`${statusCode} ${name} ${message}`)

  return res.status(statusCode).send(message)
}