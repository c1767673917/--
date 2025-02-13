import { Request, Response, NextFunction } from 'express'
import { MemoModel } from '../models/memo'
import { AppError } from '../middlewares/errorHandler'

// 获取所有备忘录
export const getAllMemos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const memos = await MemoModel.find({ userId: req.user._id })
      .sort('-createdAt')
      .exec()

    res.status(200).json({
      status: 'success',
      results: memos.length,
      data: { memos }
    })
  } catch (error) {
    next(error)
  }
}

// 获取单个备忘录
export const getMemo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const memo = await MemoModel.findOne({
      _id: req.params.id,
      userId: req.user._id
    })

    if (!memo) {
      return next(new AppError('未找到该备忘录', 404))
    }

    res.status(200).json({
      status: 'success',
      data: { memo }
    })
  } catch (error) {
    next(error)
  }
}

// 创建备忘录
export const createMemo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const memo = await MemoModel.create({
      ...req.body,
      userId: req.user._id
    })

    res.status(201).json({
      status: 'success',
      data: { memo }
    })
  } catch (error) {
    next(error)
  }
}

// 更新备忘录
export const updateMemo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const memo = await MemoModel.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user._id
      },
      req.body,
      {
        new: true,
        runValidators: true
      }
    )

    if (!memo) {
      return next(new AppError('未找到该备忘录', 404))
    }

    res.status(200).json({
      status: 'success',
      data: { memo }
    })
  } catch (error) {
    next(error)
  }
}

// 删除备忘录
export const deleteMemo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const memo = await MemoModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    })

    if (!memo) {
      return next(new AppError('未找到该备忘录', 404))
    }

    res.status(204).json({
      status: 'success',
      data: null
    })
  } catch (error) {
    next(error)
  }
}

// 搜索备忘录
export const searchMemos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { q } = req.query

    if (!q) {
      return next(new AppError('请输入搜索关键词', 400))
    }

    const memos = await MemoModel.find({
      userId: req.user._id,
      $text: { $search: q as string }
    })
      .sort({ score: { $meta: 'textScore' } })
      .exec()

    res.status(200).json({
      status: 'success',
      results: memos.length,
      data: { memos }
    })
  } catch (error) {
    next(error)
  }
} 