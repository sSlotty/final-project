import React from 'react'

import { Card, Col, Row, Table, Tag, Button, Space } from 'antd';
import moment from 'moment'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Swal from 'sweetalert2/dist/sweetalert2.all.min'
import 'sweetalert2/dist/sweetalert2.min'

class DoctorComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            patientWait: [],
            bottom: 'bottomCenter',
        }
    }

    componentDidMount() {
        this.getData()
    }
    getData() {
        axios.get('booking')
            .then(res => {
                const waitingList = res.data.data.filter(row => {
                    if (row.status == "กำลังรอคิว" || row.status == "กำลังตรวจ") {
                        const data = {
                            key: row._id,
                            bookingID: row._id,
                            patentID: row.patentID,
                            date: row.dateBooking,
                            detail: row.detail,
                            status: row.status
                        }
                        return data
                    }


                })
                this.setState({ patientWait: waitingList })
            })
            .catch(err => {
                console.log(err)
            })
    }




    render() {

        async function onAccess(id) {
            Swal.fire({
                icon: 'question',
                title: 'ยืนยันการรับเคส ',
                showCancelButton: true,
                confirmButtonText: `Access`,
                denyButtonText: `Don't access`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    const data = {
                        'bookingID': id
                    }
                    axios.put('booking/id/confirm', data)
                        .then(res => {
                            Toast.fire({
                                icon: 'success',
                                title: 'Access success'
                            }).then(() => {
                                window.location = "/doctor/process/" + data.bookingID;
                            })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            })
        }

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

        const columns = [
            {
                title: 'bookingID',
                dataIndex: '_id',
                key: '_id',
            },
            {
                title: 'detail',
                dataIndex: 'detail',
                key: 'detail',
                responsive: ['md'],
            },
            {
                title: 'Date Booking',
                dataIndex: 'dateBooking',
                key: 'dateBooking',
                responsive: ['md'],
                render: dateBooking => <Tag color='red'>{moment(dateBooking).format('Do MMMM YYYY : HH:mm:ss')}</Tag>
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                responsive: ['md'],
                render: text => <Tag color={text == 'ตรวจเสร็จสิ้น' ? 'green' : 'yellow'}>{text}</Tag>
            },
            {
                title: 'Action',
                key: 'action',
                render: (rext, record) => (
                    <Space size="middle">


                        <Button type="text" style={{ backgroundColor: '#a0d911' }} onClick={() => { onAccess(record._id) }}>
                            Access  </Button>

                    </Space>
                ),
            },
        ];




        return (
            <>
                {/* <Button style={{ margin: "10px" }} type="primary" shape="round" size="large" >เพิ่มผู้ป่วย </Button> */}

                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <div className="touch">
                            <Card className="card" title="จำนวนคิว" bordered={true}>
                                <Table
                                    style={{minWidth:300}}
                                    columns={columns}
                                    pagination={{ position: [this.state.bottom] }}
                                    dataSource={this.state.patientWait}
                                    size='small'
                                />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </>
        )
    }
}



export default DoctorComponent;
