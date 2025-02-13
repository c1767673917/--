import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { AppError } from './errorHandler'
import { UserModel } from '../models/user'

interface JwtPayload {
  id: string
}

declare global {
  namespace Express {
    interface Request {
      user?: any
    }
  }
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1) 获取token
    let token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      return next(new AppError('请先登录', 401))
    }

    // 2) 验证token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key'
    ) as JwtPayload

    // 3) 检查用户是否仍然存在
    const user = await UserModel.findById(decoded.id)
    if (!user) {
      return next(new AppError('用户不存在', 401))
    }

    // 4) 将用户信息添加到请求对象
    req.user = user
    next()
  } catch (error) {
    next(new AppError('认证失败', 401))
  }
} 