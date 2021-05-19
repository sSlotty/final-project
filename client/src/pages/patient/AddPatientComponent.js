import React from 'react'
import { Card, Form, Input, Button, DatePicker } from 'antd';
import axios from 'axios';


import Swal from 'sweetalert2/dist/sweetalert2.all.min'
import 'sweetalert2/dist/sweetalert2.min'

class AddPatientComponent extends React.Component {

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
            console.log(values)
            axios.post('/patent', values.patient).then(res => {
                if (res.status === 201) {
                    Toast.fire({
                        icon: 'success',
                        title: 'Create success'
                    }).then(() => {
                        // window.location = "/patient";
                    })
                } else {
                    Toast.fire({
                        icon: 'error',
                        title: 'Fail to add patient please check again'
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
                <Card className="card" title="เพิ่มผู้ป่วย">
                    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                        <Form.Item
                            name={['patient', 'name']}
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
                            name={['patient', 'dob']}
                            label="DOB"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <DatePicker />
                        </Form.Item>

                        <Form.Item
                            name={['patient', 'tel']}
                            label="Tel"
                            rules={[
                                {
                                    required: true,
                                },
                                { min: 0, max: 10, messages: "กรุณากรอกเบอร์โทรศัพท์" }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={['patient', 'email']}
                            label="E-mail"
                            rules={[
                                {
                                    required: true,
                                },
                                { type: 'email' }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={['patient', 'job']}
                            label="JOB"
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

export default AddPatientComponent;