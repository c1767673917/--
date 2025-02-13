import React, { useState } from 'react'
import { List, Card, Tag, Space, Button, Input, Empty, Spin, message } from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useGetMemosQuery, useDeleteMemoMutation } from '../api'
import { Memo } from '../store/slices/memoSlice'

const { Search } = Input

const MemoList: React.FC = () => {
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState('')
  const { data, isLoading, error } = useGetMemosQuery()
  const [deleteMemo] = useDeleteMemoMutation()

  const handleDelete = async (id: string) => {
    try {
      await deleteMemo(id).unwrap()
      message.success('删除成功')
    } catch (error) {
      message.error('删除失败')
    }
  }

  const filteredMemos = data?.data.memos.filter(memo =>
    memo.title.toLowerCase().includes(searchText.toLowerCase()) ||
    memo.content.toLowerCase().includes(searchText.toLowerCase()) ||
    memo.tags.some(tag => tag.toLowerCase().includes(searchText.toLowerCase()))
  )

  if (isLoading) {
    return (
      <div className="loading">
        <Spin size="large" />
      </div>
    )
  }

  if (error) {
    return <div>加载失败，请重试</div>
  }

  return (
    <div className="memo-list">
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Search
          placeholder="搜索备忘录..."
          allowClear
          style={{ width: 300 }}
          onChange={e => setSearchText(e.target.value)}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('/memos/new')}
        >
          新建备忘录
        </Button>
      </div>

      {filteredMemos?.length ? (
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={filteredMemos}
          renderItem={(memo: Memo) => (
            <List.Item>
              <Card
                title={memo.title}
                extra={
                  <Space>
                    <Button
                      type="text"
                      icon={<EditOutlined />}
                      onClick={() => navigate(`/memos/${memo.id}`)}
                    />
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleDelete(memo.id)}
                    />
                  </Space>
                }
              >
                <p className="memo-content">
                  {memo.content.length > 100
                    ? `${memo.content.slice(0, 100)}...`
                    : memo.content}
                </p>
                <div className="memo-tags">
                  {memo.tags.map(tag => (
                    <Tag key={tag} color="blue">
                      {tag}
                    </Tag>
                  ))}
                </div>
                <div className="memo-category">
                  <Tag color="green">{memo.category}</Tag>
                </div>
              </Card>
            </List.Item>
          )}
        />
      ) : (
        <Empty description="暂无备忘录" />
      )}
    </div>
  )
}

export default MemoList 