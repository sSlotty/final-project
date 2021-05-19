import React from 'react';
import { Helmet } from 'react-helmet'


import { Card, Col, Row, Button, Modal, Input, Form, DatePicker, Table, Tag } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import './style.css'

import axios from 'axios'


import Swal from 'sweetalert2/dist/sweetalert2.all.min'
import 'sweetalert2/dist/sweetalert2.min'
import moment from 'moment'

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 10,
  },
};


class Home extends React.Component {

  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.state = {
      visible: false,
      bookingList: [],
      bottom: 'bottomCenter',
    }

    this.wrapper = React.createRef();
  }


  UNSAFE_componentWillMount() {
    this.getData()
  }

  getData() {
    axios.get('booking',)
      .then(res => {
        const bookingList = res.data.data.map(row => ({
          key: row._id,
          bookingID: row._id,
          patentID: row.patentID,
          date: row.dateBooking,
          detail: row.detail,
          status: row.status
        }))

        this.setState({ bookingList: bookingList });
        // console.log(bookingList)
      })
      .catch(err => {
        console.log(err)
      })
  }



  showModal() {
    this.setState({
      visible: true,
    });
  };

  render() {

    const { visible } = this.state;


    const TITLE = 'Home | Dashboard'


    const config = {
      rules: [
        {
          type: 'object',
          required: true,
          message: 'Please select time!',
        },
      ],
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
      // console.log(values.booking)
      const data = {
        "staffID": localStorage.getItem('staffID'),
        "patentID": values.booking.patentID,
        "detail": values.booking.detail,
        "dateBooking": values.booking.dateBooking,
      }
      axios.post('booking', data)
        .then(res => {
          if (res.status === 201) {
            Toast.fire({
              icon: 'success',
              title: 'Create success'
            }).then(() => {
              window.location = "/";
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


    const columns = [
      {
        title: 'bookingID',
        dataIndex: 'bookingID',
        key: 'bookingID',
        render: text => <a>{text}</a>,
      },
      {
        title: 'detail',
        dataIndex: 'detail',
        key: 'detail',
        responsive: ['md'],
      },
      {
        title: 'Date Booking',
        dataIndex: 'date',
        key: 'date',
        responsive: ['md'],
        render: date => <Tag color='red'>{moment(date).format('Do MMMM YYYY : HH:mm:ss')}</Tag>
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        responsive: ['md','xs','sm'],
        render: text => <Tag color={text == 'ตรวจเสร็จสิ้น' ? 'green' : 'yellow'}>{text}</Tag>
      },
    ];

    const data = this.state.bookingList

    return (

      <div>
        <div ref={this.wrapper}>{this.props.children}</div>

        <Helmet>
          <title>{TITLE}</title>
        </Helmet>

        <Modal
          ref={this.wrapper}
          title="เพิ่ม"
          visible={visible}
          onOk={() => this.setState({ visible: false })}
          onCancel={() => this.setState({ visible: false })}
          width={1000}
          style={{ top: 20 }}
          footer={[
          ]}

        >
          <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item
              name={['booking', 'patentID']}
              label="ID Patient"
              rules={[
                {
                  required: true,
                }
              ]}

            >
              <Input></Input>
            </Form.Item>

            <Form.Item name={['booking', 'dateBooking']} label="Booking time" {...config}>
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>

            <Form.Item
              name={['booking', 'detail']}
              label="Details"
              rules={[{ required: true }]}>
              <Input.TextArea />
            </Form.Item>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Row >
          <Col style={{ padding: "2px" }} xs={24} sm={24} md={24} lg={24} xl={24}>
            <div className="touch">
              <Card className="card" title="จำนวนคิว" bordered={true} >
                <Button style={{ margin: "10px", backgroundColor: "#f759ab", color: "white" }} onClick={() => this.showModal()} type="text" size="small" icon={<PlusOutlined />} >เพิ่มนัด</Button>

                <Table
                  columns={columns}
                  pagination={{ position: [this.state.bottom] }}
                  dataSource={data}
                  size='small'
                  style={{minWidth:300}}
                />
              </Card>
            </div>
          </Col>
        </Row>

      </div>
    )

  }

}

export default Home;