import React from "react";
import { Router, Link } from "react-router-dom";

import { Card, Col, Row, Button, Modal, Input, InputNumber, Form, Table, Space, } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';


import Swal from 'sweetalert2/dist/sweetalert2.all.min'
import axios from 'axios'
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

class payment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      bottom: 'bottomCenter',
      dataSet: [],
      orderList: []
    }
  }

  componentDidMount() {
    this.getData()
  }

  showModal() {
    this.setState({
      visible: true,
    });
  };

  getData() {
    axios.get('orders')
      .then(res => {
        const data = res.data.data
        const report = []
        data.map(x => {
          const id = {
            key: x,
            reportID: x
          }
          report.push(id)
        })

        this.setState({ orderList: report })
        // console.log(this.state.orderList)

      }).catch(err => {
        console.log(err)
      })
  }

  render() {

    const { visible } = this.state;


    const onFinish = (values) => {
      const orders = values.orders
      const data = []
      orders.map(value => {
        const y = {
          "reportID": values.reportID,
          "staffID": localStorage.getItem('staffID'),
          "subject": value.subject,
          "price": value.price,
        }
        data.push(y)
      })
      const dataSet = {
        'reportID': values.reportID,
        'order': data
      }
      
      axios.post('orders', dataSet)
        .then(res => {
          if (res.status === 201) {
            axios.post('/payments', { reportID: values.reportID })
            Toast.fire({
              icon: 'success',
              title: 'Create order success'
            }).then(() => {
              window.location = "/payment";
            })
          } else {
            Toast.fire({
              icon: 'error',
              title: 'Fail to add order please check again'
            })
          }
        })
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
        title: "ReportID",
        dataIndex: "key",
        key: "key",
        responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
      },
      {
        title: "Detail Receipt",
        dataIndex: "detail",
        responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
        render: (text, record) => (
          <Space size="middle">
            <Link
              to={{
                pathname: `/payment/detail/${record.key}`,
                query: "/paymant/paymentdetail",
              }}
            >
              <Button type="primary">View order</Button>
            </Link>
          </Space>
        ),
      },
    ];

    const data = this.state.orderList



    return (
      <>
        <Modal
          title="เพิ่ม"
          visible={visible}
          onOk={() => this.setState({ visible: false })}
          onCancel={() => this.setState({ visible: false })}
          width={1000}
          style={{ top: 20 }}
          footer={[
          ]}

        >
          <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
            <Form.Item
              name={'reportID'}
              rules={[{ required: true, message: 'Missing report ID' }]}
            >
              <Input placeholder="report ID" />
            </Form.Item>
            <Form.List name="orders">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...restField}
                        name={[name, 'subject']}
                        fieldKey={[fieldKey, 'subject']}
                        rules={[{ required: true, message: 'Missing subject' }]}
                      >
                        <Input placeholder="ชื่อหัวข้อ" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'price']}
                        fieldKey={[fieldKey, 'price']}
                        rules={[{ required: true, message: 'Missing price' }]}
                      >
                        <InputNumber placeholder="0" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Add field
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>

          </Form>
        </Modal>

        <div className="touch">
          <Button style={{ margin: "10px", backgroundColor: "#f759ab", color: "white" }} onClick={() => this.showModal()} type="text" size="small" icon={<PlusOutlined />} >Add order</Button>
          <Card className="card" title="จำนวนคิว" bordered={true}>
            <Row gutter={16}>
              <Col sm={24} md={24} xl={24}>
                <Table columns={columns} dataSource={data} size="middle" pagination={{ position: [this.state.bottom] }} />
              </Col>
            </Row>
          </Card>
        </div>
      </>
    )
  }
}


export default payment;
