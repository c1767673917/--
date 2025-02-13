import express from 'express'
import { body } from 'express-validator'
import * as authController from '../controllers/auth'
import { validate } from '../middlewares/validate'

const router = express.Router()

// 注册验证规则
const registerValidation = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('请输入用户名')
    .isLength({ min: 2, max: 30 })
    .withMessage('用户名长度应在2-30个字符之间'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('请输入邮箱')
    .isEmail()
    .withMessage('请输入有效的邮箱地址'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('请输入密码')
    .isLength({ min: 6 })
    .withMessage('密码至少6个字符')
]

// 登录验证规则
const loginValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('请输入邮箱')
    .isEmail()
    .withMessage('请输入有效的邮箱地址'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('请输入密码')
]

router.post('/register', registerValidation, validate, authController.register)
router.post('/login', loginValidation, validate, authController.login)

export default router 