import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { errorHandler } from './middlewares/errorHandler'
import authRoutes from './routes/auth'
import memoRoutes from './routes/memo'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// 中间件
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// 数据库连接
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/modern-memo')
  .then(() => console.log('数据库连接成功'))
  .catch((err) => console.error('数据库连接失败:', err))

// 路由
app.use('/api/auth', authRoutes)
app.use('/api/memos', memoRoutes)

// 错误处理
app.use(errorHandler)

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`)
}) 