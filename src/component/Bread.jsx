import React, { useState, useEffect } from 'react'
import { HomeOutlined } from '@ant-design/icons'
import { Breadcrumb } from 'antd'
import { useLocation } from 'react-router-dom'

export default function Bread() {
    const { pathname } = useLocation()
    const [breadName, setBreadName] = useState('')

    useEffect(() => {
        switch (pathname) {
            case '/listlist':
                setBreadName('查看文章列表list')
                break
            case '/listtable':
                setBreadName('查看文章列表table')
                break
            case '/edit':
                setBreadName('文章编辑')
                break
            case '/means':
                setBreadName('修改资料')
                break
            default:
                break
        }
    }, [pathname])

    return (
        <div>
            <Breadcrumb style={{height:'30px',lineHeight:'30px'}}>
                <Breadcrumb.Item href="/">
                    <HomeOutlined />
                </Breadcrumb.Item>
                <Breadcrumb.Item>{breadName}</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    )
}
