import React from 'react'

import { Link } from 'react-router-dom'
import { Card, Table, Button, Space } from "antd";
import axios from 'axios';
import Moment from 'react-moment';
import moment from 'moment';

class ViewMedicine extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            medicine: []
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData() {
        axios.get('/medicine').then(res => {
            const data = res.data.data.map(row => ({
                key: row._id,
                medID: row._id,
                name: row.name,
                amount: row.amount,
                lot_num: row.lot_num,
                EXP: row.EXP,
                MFG: row.MFG,
                price: row.price
            }))
            this.setState({ medicine: data })
  
        }).catch(err => {
            console.error(err)
        })
    }

    render() {

        const columns = [
            {
                title: '#',
                dataIndex: 'medID',
                key: 'medID',
                style: { textAlign: 'center' }
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                style: { textAlign: 'center' }
            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                key: 'amount',
                style: { textAlign: 'center' }
            },
            {
                title: 'Lot_num',
                dataIndex: 'lot_num',
                key: 'lot_num',
                style: { textAlign: 'center' }
            },
            {
                title: 'MFG',
                dataIndex: 'MFG',
                key: 'MFG',
                style: { textAlign: 'center' },
                render: (text, record) => (
                    < Moment date={record.MFG} format="DD/MM/YYYY" />
                    
                )
            },
            {
                title: 'EXP',
                dataIndex: 'EXP',
                key: 'EXP',
                style: { textAlign: 'center' },
                render: (text, record) => (
                    moment(record.EXP).format("DD/MM/YYYY")
                )
            },
            {
                title: 'PRICE',
                dataIndex: 'price',
                key: 'price',
                style: { textAlign: 'center' }
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (

                    <Space size="middle">
       
                        <Link to={{ pathname: `/medicine/update/${record.key}`, query: "/medicine/update" }} >
                            <Button type="primary">
                                เพิ่มจำนวนยา </Button>
                        </Link>


                    </Space>
                ),
            },
        ]

        const data = this.state.medicine


        const state = {
            bottom: 'bottomCenter',
        };
        return (
            <div className="touch">
                <Card className="card" bordered={true} title="Medicines List">
                    <Table
                        columns={columns}
                        pagination={{ position: [state.bottom] }}
                        dataSource={data}
                    />


                </Card>

            </div>
        )
    }

}


export default ViewMedicine;