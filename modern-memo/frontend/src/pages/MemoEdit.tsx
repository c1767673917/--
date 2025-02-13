import React, { useEffect } from 'react'
import { Form, Input, Button, Select, message } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import {
  useGetMemoByIdQuery,
  useCreateMemoMutation,
  useUpdateMemoMutation
} from '../api'
import { Memo } from '../store/slices/memoSlice'

const { TextArea } = Input
const { Option } = Select

const categories = ['工作', '学习', '生活', '其他']

const MemoEdit: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const { data: memoData, isLoading: isLoadingMemo } = useGetMemoByIdQuery(id || '', {
    skip: !id
  })
  const [createMemo, { isLoading: isCreating }] = useCreateMemoMutation()
  const [updateMemo, { isLoading: isUpdating }] = useUpdateMemoMutation()

  useEffect(() => {
    if (memoData?.data.memo) {
      form.setFieldsValue(memoData.data.memo)
    }
  }, [memoData, form])

  const handleSubmit = async (values: Partial<Memo>) => {
    try {
      if (id) {
        await updateMemo({ id, memo: values }).unwrap()
        message.success('更新成功')
      } else {
        await createMemo(values).unwrap()
        message.success('创建成功')
      }
      navigate('/memos')
    } catch (error) {
      message.error(id ? '更新失败' : '创建失败')
    }
  }

  const isLoading = isLoadingMemo || isCreating || isUpdating

  return (
    <div className="memo-edit">
      <h2>{id ? '编辑备忘录' : '新建备忘录'}</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ tags: [], category: '其他' }}
      >
        <Form.Item
          name="title"
          label="标题"
          rules={[
            { required: true, message: '请输入标题' },
            { max: 100, message: '标题不能超过100个字符' }
          ]}
        >
          <Input placeholder="请输入标题" />
        </Form.Item>

        <Form.Item
          name="content"
          label="内容"
          rules={[{ required: true, message: '请输入内容' }]}
        >
          <TextArea
            placeholder="请输入内容"
            autoSize={{ minRows: 4, maxRows: 8 }}
          />
        </Form.Item>

        <Form.Item
          name="category"
          label="分类"
          rules={[{ required: true, message: '请选择分类' }]}
        >
          <Select placeholder="请选择分类">
            {categories.map(category => (
              <Option key={category} value={category}>
                {category}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="tags"
          label="标签"
          rules={[{ type: 'array' }]}
        >
          <Select
            mode="tags"
            placeholder="输入标签后按回车"
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            style={{ marginRight: 16 }}
          >
            {id ? '更新' : '创建'}
          </Button>
          <Button onClick={() => navigate('/memos')}>
            取消
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default MemoEdit 