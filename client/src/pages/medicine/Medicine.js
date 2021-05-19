import React from "react";
import { AudioOutlined } from "@ant-design/icons";
import { Router, Link } from "react-router-dom";
import { Card, Col, Row, Button, Modal, Space, Search, Input, Table } from "antd";
import axios from 'axios'

class MedicineComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      dispense: [],
      id: []
    }
  }
  componentDidMount() {
    this.getData()
  }

  async getData() {

    const response = await axios.get('/dispense')
    if (response.status == 200) {
      this.setState({ dispense: response.data.data })

    }

  }


  render() {


    const data = this.state.dispense

    const columns = [
      {
        title: "report ID",
        dataIndex: data,
        render: (text, record) => (

          <Space size="middle">
            <h3>{record}</h3>
          </Space>
        )
      },
      {
        title: "Action",
        dataIndex: "Detail",
        render: (text, record) => (

          <Space size="middle">
 
            <Link to={{ pathname: `/medicine/detail/${record}`, query: "/medicine/detail/" }} >
              <Button type="primary">
                รายละเอียด </Button>
            </Link>

          </Space>
        ),
      },
    ];

    return (
      <>
        <Row>
          <Col style={{ padding: "10px" }} xs={24} sm={24} md={24} lg={24} xl={24}>
            <div className="touch" >
              <Card className="card" title="ใบสั่งยา" bordered={true}>
                <Table columns={columns} dataSource={data} size="middle" style={{ minWidth: 300 }}/>
              </Card>
            </div>
          </Col>
        </Row>

      </>
    )
  }

}

export default MedicineComponent
