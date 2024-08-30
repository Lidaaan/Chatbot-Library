import dotenv from 'dotenv'
import express from 'express'
import chatRouter from './routes/LibraryAiChat.js'
import cors from 'cors'
dotenv.config()

const app = express()
const port = process.env.PORT
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
  extended : true
}))

app.use('/',(req,res,next)=>{
  
  
  next()
})

app.use('/api',chatRouter)

app.listen(port,()=>{
  console.log(`listening on port ${port}`);
  
})
