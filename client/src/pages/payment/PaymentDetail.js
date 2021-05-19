import React from "react";
import { Card, Col, Row, Table, Alert, Tag } from "antd";
import { Button } from "antd";

import axios from 'axios'
import Swal from "sweetalert2";
import Moment from 'react-moment';
import moment from 'moment';


class PaymentDetailComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      medicine: [],
      order: [],
      data: [],
      user: [],
      id: this.props.match.params.id,
      color:"error"
    }
  }
  componentDidMount() {
    this.getData()

  }


  async confirmPayment() {
    const sendData = {
      'reportID': this.state.id
    }
    const response = await axios.put('/payments/id', sendData)
    // console.log(response)
    if (response.status == 200) {
      Swal.fire(
        'สำเร็จ!',
        'ยืนยันการชำระเงินสำเร็จ!',
        'success'
      ).then(() => {
        window.location = '/payment/detail/' + this.state.id
      })
    } else {
      Swal.fire(
        'Fail !',
        'ไม่สามารถยืนยันการชำระเงินได้!',
        'error'
      ).then(() => {
        window.location = '/payment/detail/' + this.state.id
      })
    }
  }


  async getData() {
    const reportID = this.props.match.params.id
    const paymentResponse = await axios.get('/payments/id', { params: { reportID } })
    const reportResponse = await axios.get('/report/id', { params: { reportID } })
    const user = reportResponse.data.data.patient
    console.log(user)

    const med = paymentResponse.data.data['bill'][0]?.objMed
    const ord = paymentResponse.data.data['bill'][0]?.objOrder

    let medMerged = [].concat.apply([], med)
    let ordMerged = [].concat.apply([], ord)

    const data = {
      'price': paymentResponse.data.data['bill'][0].price,
      'status': paymentResponse.data.data['bill'][0].status,
      'reportID': paymentResponse.data.data['bill'][0].reportID
    }

    this.setState({ medicine: medMerged })
    this.setState({ order: ordMerged })
    this.setState({ data: data })
    this.setState({ user: user })
    if (paymentResponse.data.data['bill'][0].status == "รอชำระเงิน") {
      this.setState({color:"error"})
    } else {
      this.setState({ color: "green" })
    }
  }


  render() {

    const reportID = this.props.match.params.id


    let dataMed = this.state.medicine
    let dataOrder = this.state.order
    let data = this.state.order
    let user = this.state.user

    // console.log(dataOrder)

    const columnsMed = [
      {
        title: 'medicine ID',
        dataIndex: 'medID',
        key: 'medID',
        width: 30,
        render: text => <a>{text}</a>,
      },
      {
        title: 'ชื่อยา',
        dataIndex: 'name',
        key: 'name',
        width: 40,
        responsive: ['md'],
      },
      {
        title: 'Price / per',
        dataIndex: 'price',
        key: 'price',
        width: 40,
        responsive: ['md'],
      },
      {
        title: 'amount',
        dataIndex: 'amount',
        key: 'amount',
        width: 10,
        responsive: ['lg'],
      },
      {
        title: 'Total',
        dataIndex: 'sum_price',
        key: 'sum_price',
        width: 50,
        responsive: ['lg'],
      },
    ];


    const columnsOrder = [
      {
        title: 'Order ID',
        dataIndex: 'orderID',
        key: 'orderID',
        width: 30,
        render: text => <a>{text}</a>,
      },
      {
        title: 'หัวข้อ',
        dataIndex: 'subject',
        key: 'subject',
        width: 40,
        responsive: ['md'],
      },
      {
        title: 'ราคารวม',
        dataIndex: 'price',
        key: 'price',
        width: 40,
        responsive: ['md'],
      }
    ];
    
    



    const createBill = () => {
      const asd = this.props.match.params.id
      // console.log(asd)
      axios.post('/payments', { reportID: reportID })
        .then(res => {
          if (res.status == 200) {
            Swal.fire(
              'Success',
              'ทำการสร้างใบเสร็จ สำเร็จ',
              'success'
            )
            window.location = '/payment/detail/' + reportID

          } else {
            Swal.fire(
              'เตือน',
              'ใบเสร็จนี้ถูกสร้างขึ้นแล้ว ไม่สามารถสร้างซ้ำได้',
              'error'
            )

          }
        }).catch(err => {
          console.log(err)
        })
    }




    return (
      <>
        <Button type="text" onClick={() => createBill()} style={{ backgroundColor: 'green', color: 'white' }}>สร้างใบเสร็จ</Button>
        <Row>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Button type="primary"></Button>

            <div className="touch">
              <Card className="card" title="รายละเอียด" bordered={true} style={{ marginRight: '10px' }}>
                <Table columns={columnsMed} dataSource={dataMed} size="small" pagination={false}/>
                <hr></hr>
                <Table columns={columnsOrder} dataSource={dataOrder} size="small" pagination={false}/>
              </Card>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Button type="primary"></Button>

            <div className="touch">
              <Card className="card" title="ใบเสร็จ" bordered={true} style={{ marginLeft: '10px' }}>
                <p>ชื่อ : {this.state.user.name}</p>
                <p>วันเกิด : <Moment date={this.state.user.dob} format="D/MM/YYYY"></Moment></p>
                <p>อายุ : {moment(this.state.user.dob, "YYYMMDD").fromNow().replace("ago", " ")}</p>

                <p>อีเมล : {this.state.user.email}</p>
                <p>เบอร์โทรศัพท์ : {this.state.user.tel}</p>
                {/* {console.log(this.state.user)} */}
                <hr></hr>
                <h1>รวมค่าใช้จ่ายทั้งสิ้น : <span style={{ color: 'red' }}>{this.state.data.price}</span></h1>
                
                <h1><Tag color={this.state.color}>{this.state.data.status }</Tag></h1>
                <Button onClick={()=>{this.confirmPayment()}} type="text" style={{ backgroundColor: 'green', color: 'white' }}>ยืนยันการชำระเงิน</Button>
              </Card>
            </div>
          </Col>
        </Row>
      </>
    )
  }
}


export default PaymentDetailComponent;
