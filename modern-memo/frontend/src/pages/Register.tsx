import React from 'react'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../api'
import { useAppDispatch } from '../hooks/store'
import { setCredentials } from '../store/slices/authSlice'

interface RegisterForm {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const Register: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [register, { isLoading }] = useRegisterMutation()

  const onFinish = async (values: RegisterForm) => {
    if (values.password !== values.confirmPassword) {
      message.error('两次输入的密码不一致')
      return
    }

    try {
      const response = await register({
        username: values.username,
        email: values.email,
        password: values.password
      }).unwrap()
      
      dispatch(setCredentials(response))
      message.success('注册成功！')
      navigate('/')
    } catch (error) {
      message.error('注册失败，请重试')
    }
  }

  return (
    <div className="register-form">
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>注册</h2>
      <Form
        name="register"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="username"
          rules={[
            { required: true, message: '请输入用户名' },
            { min: 2, max: 30, message: '用户名长度应在2-30个字符之间' }
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="用户名"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: '请输入邮箱' },
            { type: 'email', message: '请输入有效的邮箱地址' }
          ]}
        >
          <Input
            prefix={<MailOutlined />}
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

        <Form.Item
          name="confirmPassword"
          rules={[
            { required: true, message: '请确认密码' },
            { min: 6, message: '密码至少6个字符' }
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="确认密码"
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
            注册
          </Button>
        </Form.Item>

        <Form.Item>
          <Button
            type="link"
            block
            onClick={() => navigate('/login')}
          >
            已有账号？立即登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Register 