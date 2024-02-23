import express from "express"

import { signup, signin, google } from "../controllers/auth.controller.js"

const router = express.Router()

router.post("/get-upload-url", signup)

export default router

