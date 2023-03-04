const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const router = require('./router')

const PORT = process.env.PORT || 3000

const app = express()

app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded())

app.use(cors())

// 挂载路由
app.use('/api', router)

app.listen(PORT, () => {
    console.log(`Server is running at http:// localhost: ${PORT}`);
})