import axios from "axios"

const instance = axios.create({
  baseURL: "http://localhost:5000/api/",
  headers: { 'X-Custom-Header': 'mern_blog' }
})

export default instance