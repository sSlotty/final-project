import React from 'react'

import { Form, Input, Row, Col, Button, Card, Modal } from 'antd';

import { useHistory } from "react-router-dom";

import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './style.css'
import axios from 'axios'

import GlobalContext from '../context/GlobalContext'


const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 24,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 10,
  },
};


const LoginComponent = () => {
  let history = useHistory();

  const onFinish = (values) => {
    axios.post("/authentication/token", values)
      .then((res) => {
        const { access_token, refresh_token, expires_in, staffID } = res.data.data
        localStorage.setItem("refreshToken", refresh_token)
        localStorage.setItem("accessToken", access_token)
        localStorage.setItem("expires_in", Math.floor(Date.now() / 1000) + expires_in)
        localStorage.setItem('staffID', staffID)
        Modal.success({
          title: "Login success",
          onOk: () => {
            history.push("/dashboard")
          }
        });
      }).catch(({ response }) => {
        Modal.error({
          title: response.data.data.error_description,
        });
      })
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const [form] = Form.useForm();

  return (
    <div style={{ minHeight: "100vh", backgroundImage: `url(${'https://images.unsplash.com/photo-1621251358612-a89db45dde0a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1800&q=80'})` }}>
      <GlobalContext.Consumer>
      {context =>

        <div className="site-card-wrapper" style={{ padding: "100px" }}>
          <Row gutter={16}>
            <Col xs={2} sm={2} md={6} lg={8} xl={9}>
            </Col>
            <Col xs={20} sm={20} md={12} lg={8} xl={6}>
              <Card title="Login" style={{ textAlign: "center" }} bordered={false} className="blurred-box">
                <Form
                  {...layout}
                  form={form}
                  name="loginForm"
                  className="loginForm"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your username !',
                      },
                    ]}
                  >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Item>


                  <Form.Item {...tailLayout}>
                    <Button type="primary" size="middle" htmlType="submit">
                      Login
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
            <Col xs={2} sm={2} md={6} lg={8} xl={9}>
            </Col>
          </Row>
        </div>
      }
    </GlobalContext.Consumer>
      </div>
  )



}

export default LoginComponent;