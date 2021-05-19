import React from 'react'
import { Form, Input, InputNumber, Button, Row, Col, Card } from 'antd';

import axios from 'axios'

import Swal from 'sweetalert2/dist/sweetalert2.all.min'
import 'sweetalert2/dist/sweetalert2.min'

class MedicineUpdateComponent extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 10 },
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
            const data = {
                'medicineID': this.props.match.params.id,
                'amount': values.med['amount']
            }

            axios.put('/medicine/id', data)
                .then(res => {
                    if (res.status === 200) {
                        Toast.fire({
                            icon: 'success',
                            title: 'Update success'
                        }).then(() => {
                            window.location = "/medicine/view";
                        })
                    }
                }).catch(err => {
                    Toast.fire({
                        icon: 'error',
                        title: 'Update Fail'
                    })
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
            <>
                <Row>
                    <Col xs={24} sm={24} md={24} xl={24} lg={24}>
                        <dib className="touch">
                            <Card className="card">
                                <h1>Medicine ID ที่ต้องการ Update : {this.props.match.params.id}</h1>
                                <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                                    <Form.Item name={['med', 'amount']} label="จำนวน" rules={[{ type: 'number' }, { required: 'true' }]}>
                                        <InputNumber placeholder />
                                    </Form.Item>
                                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                        <Button type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </dib>
                    </Col>
                </Row>
            </>
        )
    }


}

export default MedicineUpdateComponent