import React from "react";
import { AudioOutlined } from "@ant-design/icons";
import { Router, Link } from "react-router-dom";
import { Card, Col, Row, Button, Modal, Space, Search, Input, Table, Tag } from "antd";
import Moment from 'react-moment';
import moment from 'moment';

import axios from 'axios'
import Swal from "sweetalert2";
class MedicineDetailComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      medicine: [],
      id: this.props.match.params.id,
      patient: [],
      color: "",
      status: ""
    }
  }

  componentDidMount() {
    this.getData()
  }

  async getData() {
    const responseMedicine = await axios.get('/dispense/id', { params: { reportID: this.state.id } })
    const responseReport = await axios.get('/report/id', { params: { reportID: this.state.id } })
    if (responseMedicine.status == 200) {

      const data = []
      responseMedicine.data.data.map(value => {
        const x = {
          'reportID': value['reportID'],
          'id': value['_id'],
          'name': value['meds'][0]?.name,
          'amount': value['amount'],
        }
        data.push(x)
      })
      this.setState({ medicine: data })
      this.setState({ patient: responseReport.data.data['patient'] })
      this.setState({ status: responseMedicine.data.data[0]?.status })
      if (this.state.status === "รอรับยา") {
        this.setState({ color: "warning" })
      } else {
        this.setState({ color: "green" })
      }
    } else {

    }
  }

  confirmDispense() {
    const data = {
      reportID: this.state.id
    }
    axios.post('/dispense/confirm', data)
      .then(res => {
        Swal.fire(
          'Success',
          'จ่ายยาสำเร็จ',
          'success'
        )
        window.location = '/medicine/detail/' + this.state.id
      }).catch(err => {
        console.log(err)
      })
  }

  render() {



    const data = this.state.medicine


    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: 'id',
        responsive: ['xs', 'sm', 'md', 'lg', 'xl'],

      },
      {
        title: "ชื่อยา",
        dataIndex: "name",
        key: 'name',
        responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
      },
      {
        title: "จำนวน",
        dataIndex: "amount",
        key: 'amount',
        responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
      }
    ];

    return (
      <>
        <Row>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Button type="primary"></Button>

            <div className="touch">
              <Card className="card" title="รายละเอียด" bordered={true} style={{ marginRight: '10px' }}>
                <Table columns={columns} dataSource={data} size="small" pagination={false}/>
                <hr></hr>
              </Card>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Button type="primary"></Button>

            <div className="touch">
              <Card className="card" title="ข้อมูลผู้ป่วย" bordered={true} style={{ marginLeft: '10px' }}>
                <p>ชื่อ : {this.state.patient.name}</p>
                <p>วันเกิด : <Moment date={this.state.patient.dob} format="D/MM/YYYY"></Moment></p>
                <p>อายุ : {moment(this.state.patient.dob, "YYYMMDD").fromNow().replace("ago", " ")}</p>
                <p>อีเมล : {this.state.patient.email}</p>
                <p>เบอร์โทรศัพท์ : {this.state.patient.tel}</p>
                <hr></hr>
                <h1><Tag color={this.state.color}>{this.state.status}</Tag></h1>
                <Button onClick={() => { this.confirmDispense() }} type="text" style={{ backgroundColor: 'green', color: 'white' }}>ยืนยันจ่ายยา</Button>
              </Card>
            </div>
          </Col>
        </Row>

      </>
    )
  }

}

export default MedicineDetailComponent;
