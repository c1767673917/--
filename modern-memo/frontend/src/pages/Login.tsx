import React from 'react'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../api'
import { useAppDispatch } from '../hooks/store'
import { setCredentials } from '../store/slices/authSlice'

interface LoginForm {
  email: string
  password: string
}

const Login: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [login, { isLoading }] = useLoginMutation()

  const onFinish = async (values: LoginForm) => {
    try {
      const response = await login(values).unwrap()
      dispatch(setCredentials(response))
      message.success('登录成功！')
      navigate('/')
    } catch (error) {
      message.error('登录失败，请检查邮箱和密码')
    }
  }

  return (
    <div className="login-form">
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>登录</h2>
      <Form
        name="login"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: '请输入邮箱' },
            { type: 'email', message: '请输入有效的邮箱地址' }
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="邮箱"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: '请输入密码' },
            { min: 6, message: '密码至少6个字符' }
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="密码"
            size="large"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={isLoading}
          >
            登录
          </Button>
        </Form.Item>

        <Form.Item>
          <Button
            type="link"
            block
            onClick={() => navigate('/register')}
          >
            还没有账号？立即注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login 