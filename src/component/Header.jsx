import React, { useEffect, useState } from 'react'
import logoImg from '../assets/logo.png'
import { CaretDownOutlined, SmileOutlined } from '@ant-design/icons'
import { Dropdown, Menu, Space, message } from 'antd'
import defaultAvatar from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'

export default function Header() {
    const navigate = useNavigate()
    const [avata, setAvatar] = useState(defaultAvatar)
    const [username, setUsername] = useState('游客')

    useEffect(() => {
        let username1 = localStorage.getItem('username')
        let avata1 = localStorage.getItem('avatar')
        if (username1) {
            setUsername(username1)
        }
        if (avata1) {
            setAvatar('http://47.93.114.103:6688/' + avata1)
        }
    }, [])

    //退出登录
    const logout = () => {
        localStorage.clear();
        message.success('退出成功，即将返回登录页')
        setTimeout(() => {
            navigate('/login')
        }, 1500);
    }

    const menu = (
        <Menu>
            <Menu.Item key={1}>修改资料</Menu.Item>
            <Menu.Divider />
            <Menu.Item key={2} onClick={logout}>退出登录</Menu.Item>
        </Menu>
    )

    return (
        <div>
            <header>
                <img src={logoImg} alt="" className="logo" />
                <div className="right">
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            <Space>
                                <img src={avata} alt="" className="avatar" />
                                <span>{username}</span>
                                <CaretDownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </div>
            </header>
        </div>
    )
}
