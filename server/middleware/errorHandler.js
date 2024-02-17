import { logEvents } from "./logEvents.js"

export const errorHandler = (err, req, res, next) => {
  logEvents(`${err.name} ${err.message}`, "errLog.txt")
  console.log(`${err.name} ${err.message}`)
  return res.status(500).send(err.message)
}