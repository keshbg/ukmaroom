import express from 'express'
import mongoose from 'mongoose'
import { port, dbURI } from './config/environment.js'
import router from './config/router.js'

const app = express()


const startServers = async() => {
  try {

    // mongoose connect
    await mongoose.connect(dbURI)
    console.log('db connected success')

    app.use(express.json())

    app.use((req,_res,next)=> {
      console.log(`request received: ${req.method}- ${req.url}`)
      next()
    })
    
    app.use('/api',router)

    app.use((_req, res)=>{
      res.status(404).json({ message: 'route not found here' })
    })

    app.listen(port, ()=> 
      console.log(`server up and running on port ${port}`)
    )
  } catch (err) {
    console.log('something is wrong', err)
  }
}

startServers()