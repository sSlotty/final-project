import React from 'react';
import { Table, Card, Col, Row, Tag } from 'antd';

import axios from 'axios'
import Moment from 'react-moment';
import moment from 'moment';

class ViewReportDetailComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            report: [],
            medicine: [],
            order: [],
            patient: []
        }
    }

    componentDidMount() {
        this.getData()
    }

    async getData() {
        const reportID = this.props.match.params.id
        const responseReport = await axios.get('/report/id', { params: { reportID: reportID } })

        this.setState({ report: responseReport.data.data['report'] })
        this.setState({ medicine: responseReport.data.data['dispenses'] })
        this.setState({ order: responseReport.data.data['orders'] })
        this.setState({ patient: responseReport.data.data['patient'] })
        // console.log(this.state.medicine)
    }

    render() {

        const columnsMed = [
            {
                title: 'ID Medicine',
                dataIndex: '_id',
                key: '_id',
                responsive: ['md', 'xs', 'sm', 'xl', 'lg'],
                render: text => <a>{text}</a>,
            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                key: 'amount',
                responsive: ['md', 'xs', 'sm', 'xl', 'lg'],
            },
            {
                title: 'status',
                dataIndex: 'status',
                key: 'status',
                responsive: ['md', 'sm', 'xl', 'lg'],
                render: text => <Tag color={text == 'จ่ายยาสำเร็จ' ? 'green' : 'yellow'}>{text}</Tag>
            },
        ];

        const columnsOrder = [
            {
                title: 'ID Order',
                dataIndex: '_id',
                key: '_id',
                responsive: ['md', 'xs', 'sm', 'xl', 'lg'],
                render: text => <a>{text}</a>,
            },
            {
                title: 'Subject',
                dataIndex: 'subject',
                key: 'subject',
                responsive: ['md', 'xs', 'sm', 'xl', 'lg'],
            },
            {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
                responsive: ['md', 'xs', 'sm', 'xl', 'lg'],

            },
        ];

        const dataMed = this.state.medicine
        const dataOrder = this.state.order
        return (
            <><Row>

                <Col xs={24} sm={24} md={12} xl={12} lg={12} style={{ padding: '10px' }}>
                    <div className='touch'>
                        <Card className='card'>

                            <h1>User ID : {this.state.patient._id} </h1>
                            <h1>ชื่อ : {this.state.patient.name} </h1>
                            <h1>วันเกิด : <Moment date={this.state.patient.dob} format="D/MM/YYYY" /> </h1>
                            <p>อายุ : {moment(this.state.patient.dob, "YYYMMDD").fromNow().replace("ago", " ")}</p>
                            <h1>job : {this.state.patient.job} </h1>
                            <h1>tel : {this.state.patient.tel} </h1>

                        </Card>
                    </div>
                </Col>

                <Col xs={24} sm={24} md={12} xl={12} lg={12} style={{ padding: '10px' }}>
                    <div className='touch'>
                        <Card className='card'>
                            <h1>Report ID : {this.props.match.params.id} </h1>
                            <h1>หัวข้อ : {this.state.report._id} </h1>
                            <h1>รายละเอียด : {this.state.report.detail} </h1>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>

                        </Card>
                    </div>
                </Col>

                <Col xs={24} sm={24} md={12} xl={12} lg={12} style={{ padding: '10px' }}>
                    <div className='touch'>
                        <Card className='card' title="รายละเอียดการจ่ายยา">
                            <Table columns={columnsMed} dataSource={dataMed} pagination={false} style={{ minWidth: 300 }}
                            />
                        </Card>
                    </div>
                </Col>

                <Col xs={24} sm={24} md={12} xl={12} lg={12} style={{ padding: '10px' }}>
                    <div className='touch'>
                        <Card className='card' title="ค่าใช้จ่ายเพิ่มเติม">
                            <Table columns={columnsOrder} dataSource={dataOrder} pagination={false}
                                style={{ minWidth: 300 }}/>
                        </Card>
                    </div>
                </Col>

            </Row>
            </>
        )
    }
}
export default ViewReportDetailComponent;