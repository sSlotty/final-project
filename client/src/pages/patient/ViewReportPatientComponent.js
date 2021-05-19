
import React from 'react'
import { Table, Row, Col, Card, Space, Button } from 'antd';

import {Link} from 'react-router-dom'
import axios from 'axios'
import Moment from 'react-moment';

class ViewReportPatientComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            id: this.props.match.params.id
        }
    }
    componentDidMount() {
        this.getData()
    }
    async getData() {
        const response = await axios.get('/report/patient', { params: { patientID: this.state.id } })

        this.setState({ data: response.data.data })
    }
    render() {


        const data = this.state.data
        // console.log(data)
        const columns = [
            {
                title: 'BookingID',
                dataIndex: '_id',
                key: '_id',
                width: '20px',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Header',
                dataIndex: 'header',
                key: 'header',
                width: '50px',
                responsive: ['md'],
            },
            {
                title: 'Detail',
                dataIndex: 'detail',
                key: 'detail',
                width: '50px',
                responsive: ['lg'],
            },
            {
                title: 'Action',
                key: 'bookingID',
                width: '100px',
                responsive: ['lg'],
                render: (text, record) => (

                    <Space size="middle">

                        <Link to={{ pathname: `/patient/report/${record._id}`, query: "/report" }} >
                            <Button type="primary">
                                View more detail </Button>
                        </Link>
                        {/* <Button type="text" onClick={() => { this.onClickDelete(`${record.staffID}`) }} style={{ backgroundColor: '#f5222d', color: 'white' }}>
                            Delete </Button> */}


                    </Space>
                ),
            },
        ];

        return (
            <>
                <div className="touch">
                    <Card className="card" title="ผลการตรวจ" bordered={true}>
                        <Row>
                            <Col xs={24} md={24} xl={24} lg={24}>
                                <Table columns={columns} dataSource={data} />
                            </Col>
                        </Row>
                    </Card>
                </div>
            </>
        )
    }
}


export default ViewReportPatientComponent;