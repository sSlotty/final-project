import React from 'react'

import { Card, Form, Input, Button, InputNumber, DatePicker } from 'antd';
import axios from 'axios';

import Swal from 'sweetalert2/dist/sweetalert2.all.min'
import 'sweetalert2/dist/sweetalert2.min'
class AddMedicineComponent extends React.Component {


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
   
            axios.post('medicine', values.medicine).then(res => {
                if (res.status === 201) {
                    Toast.fire({
                        icon: 'success',
                        title: 'Create success'
                    }).then(() => {
                        window.location = "/medicine/view";
                    })
                } else {
                    Toast.fire({
                        icon: 'error',
                        title: 'Fail to add medicine please check again'
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
                <Card className="card" title="เพิ่มยาลงคลัง">
                    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                        <Form.Item
                            name={['medicine', 'name']}
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
                            name={['medicine', 'amount']}
                            label="Amount"
                            rules={[
                                {
                                    type: 'number',
                                    min: 0,
                                    max: 1000000,
                                },
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            name={['medicine', 'lot_num']}
                            label="LOT_NUM"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={['medicine', 'MFG']}
                            label="MFG"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <DatePicker />
                        </Form.Item>
                        <Form.Item
                            name={['medicine', 'EXP']}
                            label="EXP"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <DatePicker />

                        </Form.Item>
                        <Form.Item
                            name={['medicine', 'price']}
                            label="Price"
                            rules={[
                                {
                                    type: 'number',
                                    min: 0,
                                    max: 1000000,
                                },
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <InputNumber />
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


export default AddMedicineComponent;