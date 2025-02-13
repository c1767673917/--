import React from 'react'
import { Typography, Card, Row, Col, Statistic } from 'antd'
import {
  FileTextOutlined,
  TagsOutlined,
  FolderOutlined,
  ClockCircleOutlined
} from '@ant-design/icons'
import { useGetMemosQuery } from '../api'

const { Title } = Typography

const Home: React.FC = () => {
  const { data } = useGetMemosQuery()
  const memos = data?.data.memos || []

  // 统计数据
  const totalMemos = memos.length
  const totalTags = [...new Set(memos.flatMap(memo => memo.tags))].length
  const totalCategories = [...new Set(memos.map(memo => memo.category))].length
  const recentMemos = memos.filter(
    memo => new Date(memo.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
  ).length

  return (
    <div className="home">
      <Title level={2}>欢迎使用现代化备忘录</Title>
      <p style={{ marginBottom: 32 }}>
        这是一个简单而强大的备忘录应用，帮助你管理和组织你的想法。
      </p>

      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总备忘录数"
              value={totalMemos}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="总标签数"
              value={totalTags}
              prefix={<TagsOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="分类数"
              value={totalCategories}
              prefix={<FolderOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="最近7天新增"
              value={recentMemos}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: 32 }}>
        <Title level={3}>使用指南</Title>
        <ul>
          <li>点击顶部导航栏的"备忘录"查看所有备忘录</li>
          <li>使用"新建备忘录"按钮创建新的备忘录</li>
          <li>为备忘录添加标签和分类，方便管理</li>
          <li>使用搜索功能快速找到需要的备忘录</li>
        </ul>
      </Card>
    </div>
  )
}

export default Home 