require('dotenv').config();
const express = require('express')
const authRoutes = require('./routes/auth')
const app = express()
const PORT = process.env.PORT || 4200

app.use(express.json())
app.use('/auth', authRoutes)

app.listen(PORT, ()=> {console.log(`Сервер запущен на порту ${PORT}`)})