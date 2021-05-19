import React from 'react';

import { Card, Form, Input, Button } from 'antd';

import axios from 'axios';

import Swal from 'sweetalert2/dist/sweetalert2.all.min'
import 'sweetalert2/dist/sweetalert2.min'

class AddUserComponent extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {


        const layout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 10,
            },
        };

        const validateMessages = {
            required: '${label} is required!',
            types: {
                email: '${label} is not a valid email!',
                number: '${label} is not a valid number!',
            },
            number: {
                range: '${label} must be between ${min} and ${max}',
            },
        };

        const onFinish = (values) => {
            axios.post('authentication/signup', values.user).then(res => {
                if (res.status === 201) {
                    Toast.fire({
                        icon: 'success',
                        title: 'Create success'
                    }).then(() => {
                        window.location = "/user";
                    })
                } else {
                    Toast.fire({
                        icon: 'error',
                        title: 'Fail to add user please check again'
                    })
                }
            })
        };

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        return (
            <div className="touch">
                <Card className="card" title="เพิ่มสมาชิก">
                    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                        <Form.Item
                            name={['user', 'username']}
                            label="username"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={['user', 'password']}
                            label="Password"
                            rules={[
                                {
                                    required: true
                                },
                                { min: 6, message: 'กรุณากรอกรหัสผ่าน 6 ตัวขึ้นไป' }

                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name={['user', 'name']}
                            label="name"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={['user', 'role']}
                            label="Role"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={['user', 'department']}
                            label="department"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>


                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                        
                    </Form>
                </Card>
            </div>
        )
    }
}

export default AddUserComponent;