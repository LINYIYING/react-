import React from 'react'
import { Button, Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import './less/Login.less'
import { RegisterApi } from '../request/api'


export default function Register() {
    const navigate = useNavigate()

    const onFinish = values => {
        console.log('Success:', values)
        RegisterApi({
            username: values.username,
            password: values.password
        }).then(res=>{
            console.log(res)
            if(res.errCode===0){
                message.success(res.message);
                //跳转登录页
                setTimeout(() => navigate('/login'), 1500);
            }else{
                message.error(res.message);
            }
        })
    }
    return (
        <div className="login">
            <div className="login_box">
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入用户名' }]}
                    >
                        <Input
                            size="large"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="请输入用户名"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input.Password
                            size="large"
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="请输入密码"
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        // label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: '请再次确认密码',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve()
                                    }

                                    return Promise.reject(
                                        new Error(
                                            'The two passwords that you entered do not match!'
                                        )
                                    )
                                },
                            }),
                        ]}
                    >
                        <Input.Password size="large"
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="请再次确认密码"/>
                    </Form.Item>

                    <Form.Item>
                        <Link to="/Login">已有账号，前往登录</Link>
                    </Form.Item>

                    <Form.Item>
                        <Button size="large" type="primary" htmlType="submit" block>
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
