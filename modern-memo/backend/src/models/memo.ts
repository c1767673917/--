import mongoose from 'mongoose'

export interface IMemo extends mongoose.Document {
  title: string
  content: string
  tags: string[]
  category: string
  userId: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const memoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, '请输入标题'],
      trim: true,
      maxlength: [100, '标题不能超过100个字符']
    },
    content: {
      type: String,
      required: [true, '请输入内容'],
      trim: true
    },
    tags: {
      type: [String],
      default: []
    },
    category: {
      type: String,
      required: [true, '请选择分类'],
      trim: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, '备忘录必须属于一个用户']
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

// 索引
memoSchema.index({ title: 'text', content: 'text' })
memoSchema.index({ userId: 1, createdAt: -1 })

export const MemoModel = mongoose.model<IMemo>('Memo', memoSchema) 