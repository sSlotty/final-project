import React from 'react';

import { Card } from 'antd'

import { Form, Input, Button } from 'antd';

import axios from 'axios'

import Swal from 'sweetalert2/dist/sweetalert2.js'
class UserEditComponent extends React.Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            staff: []
        }

    }

    handleChange = (e) => {
        this.setState({ staff: e.target.value })
    }
    componentDidMount() {
        this.getData();
    }

    getData() {

        const staffID = this.props.match.params.id
        axios.get('/user/id', { params: { staffID } })
            .then(res => {
                this.state.staff = res.data.data
                this.setFormValue(res.data.data[0])
                // console.log(res.data)
                
            }).catch(err => {
                console.error(err)
                window.location = "/user";
            })

    }
    setFormValue(data) {
        this.formRef.current.setFieldsValue({
            name: data.name ? data.name : '',
            username: data.username ? data.username : ' ',
            role: data.role ? data.role : ''
        })
    }

    saveFormData() {

    }

    render() {

        const layout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 8,
            },
        };
        /* eslint-disable no-template-curly-in-string */

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
        /* eslint-enable no-template-curly-in-string */

        const onFinish = (values) => {
            const staffID = this.state.staff[0]._id

            const data = {
                staffID: staffID,
                username: values.username,
                name: values.name,
                role: values.role
            }
            // console.log(data)
            axios.put('user/id', data).then(res => {
                if (res.status === 200) {
                    Toast.fire({
                        icon: 'success',
                        title: 'Update success'
                    }).then(() => {
                        window.location = "/user";
                    })

                } else {
                    Toast.fire({
                        icon: 'error',
                        title: 'Fail to update'
                    })
                }

                // console.log(res.status)
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
                <Card title="Edit" className="card" bordered={true}>
                    <h1>{this.state.staff[0]}</h1>
                    <Form {...layout} ref={this.formRef} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="username"
                            label="Username"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="role"
                            label="Role"
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

export default UserEditComponent;