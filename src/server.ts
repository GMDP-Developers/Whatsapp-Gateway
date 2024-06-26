import express from 'express'
import bodyParser from 'body-parser'
import router from './router/index.js'
import { resolve, dirname } from 'node:path'
import { Server } from 'socket.io'
import Whatsapp from './libraries/Whatsapp.js'
import QRCode from 'qrcode'
const app = express()
const port = process.env.PORT || 3000
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * Body Parser
 */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/**
 * Template Engine
 */
app.set('view engine', 'ejs')
app.set('views', resolve(__dirname, 'views'))

/**
 * Router
 */
app.use(router)

/**
 * Express Server
 */
const server = app.listen(port, () => {
  console.log(`Application running under port: ${port}`)
})

/**
 * Socket IO
 */
const io = new Server(server)

// /**
//  * Whatsapp
//  */
Whatsapp.connect(async (qr, status) => {
  if (status != undefined) {
    io.emit('status', status)
  }

  if (qr != undefined) {
    console.log('qrcode refreshed')
    io.emit('qr', await QRCode.toDataURL(qr))
  }
})
