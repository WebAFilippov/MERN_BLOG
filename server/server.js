import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import adminFirebase from "firebase-admin"
import dotenv from "dotenv"
dotenv.config()

import authRoute from "./route/auth.route.js"
import blogRoute from "./route/blog.route.js"
import { logger } from "./middleware/logEvents.js"
import { errorHandler } from './middleware/errorHandler.js';
import serviceAccountKey from "./mern-blog-jsx-firebase-adminsdk-10x5b-a05bedfd1c.json"assert {
  type: 'json'
};


const PORT = process.env.PORT
const MONGO_DB = process.env.MONGO_DB

adminFirebase.initializeApp({
  credential: adminFirebase.credential.cert(serviceAccountKey)
})

const server = express()

server.use(express.json())
server.use(cors())
server.use(logger)

server.use("/api/auth", authRoute)
server.use("/api/blog", blogRoute)


server.use(errorHandler)

mongoose.connection.on('error', err => {
  console.log("Error MongoDB " + err);
});

mongoose.connection.once("open", () => {
  server.listen(PORT, () => console.log(`Server started on ${PORT}`));
});

mongoose.connect(MONGO_DB, {
  autoIndex: true
})
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log('Error connection MongoDB: ' + err));