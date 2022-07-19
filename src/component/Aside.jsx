import React, { useEffect, useState } from 'react'
import { ReadOutlined, EditOutlined, DatabaseOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Aside() {
    const navigate = useNavigate()
    const location = useLocation()
    const [defaultKey, setDefaultKey] = useState('')
    
    useEffect(()=>{
        let path = location.pathname
        let key = path.split('/')[1]
        setDefaultKey(key)
    })

    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        }
    }
    const items = [
        getItem('查看文章列表list', 'listlist', <ReadOutlined />),
        getItem('查看文章列表table', 'listtable', <ReadOutlined />),
        getItem('文章编辑', 'edit', <EditOutlined />),
        getItem('修改资料', 'means', <DatabaseOutlined />),
    ]

    const onClick = e => {
        console.log('click ', e)
        navigate('/' + e.key)
        setDefaultKey(e.key)
    }

    return (
        <Menu
            className="aside"
            onClick={onClick}
            style={{
                width: 200,
            }}
            selectedKeys={[defaultKey]}
            mode="inline"
            theme="dark"
            items={items}
        />
    )
}
