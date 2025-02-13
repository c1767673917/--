import express from 'express'
import { body } from 'express-validator'
import * as memoController from '../controllers/memo'
import { protect } from '../middlewares/auth'
import { validate } from '../middlewares/validate'

const router = express.Router()

// 验证规则
const memoValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('请输入标题')
    .isLength({ max: 100 })
    .withMessage('标题不能超过100个字符'),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('请输入内容'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('请选择分类'),
  body('tags')
    .isArray()
    .withMessage('标签必须是数组')
]

// 所有路由都需要认证
router.use(protect)

// 备忘录路由
router
  .route('/')
  .get(memoController.getAllMemos)
  .post(memoValidation, validate, memoController.createMemo)

router
  .route('/:id')
  .get(memoController.getMemo)
  .put(memoValidation, validate, memoController.updateMemo)
  .delete(memoController.deleteMemo)

// 搜索路由
router.get('/search', memoController.searchMemos)

export default router 