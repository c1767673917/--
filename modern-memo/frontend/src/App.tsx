import React, { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Spin } from 'antd'
import MainLayout from './layouts/MainLayout'

// 懒加载页面组件
const Home = React.lazy(() => import('./pages/Home'))
const Login = React.lazy(() => import('./pages/Login'))
const Register = React.lazy(() => import('./pages/Register'))
const MemoList = React.lazy(() => import('./pages/MemoList'))
const MemoEdit = React.lazy(() => import('./pages/MemoEdit'))
const NotFound = React.lazy(() => import('./pages/NotFound'))

const App: React.FC = () => {
  return (
    <Suspense fallback={<div className="loading"><Spin size="large" /></div>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="memos" element={<MemoList />} />
          <Route path="memos/new" element={<MemoEdit />} />
          <Route path="memos/:id" element={<MemoEdit />} />
          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App 