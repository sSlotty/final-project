import React from 'react';
import { Table, Tag, Radio, Space, Button } from 'antd';

import { Router, Link } from 'react-router-dom'

const columns = [
    {
        title: 'ลำดับคิว',
        dataIndex: 'queue',
        key: 'queue',

    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        responsive: ['md'],
    },
    {
        title: 'Booking Time',
        dataIndex: 'booking',
        key: 'booking',
        responsive: ['lg'],
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (

            <Space size="middle">

                <Link to={{ pathname: `/doctor/report/${record.age}`, query: "/doctor/report" }} >
                    <Button type="primary">
                        รับผู้ป่วย {record.name}</Button>
                </Link>

            </Space>
        ),
    },
];

const data = [
    {
        queue: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        queue: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        queue: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

const state = {
    bottom: 'bottomCenter',
};
const DoctorQue = () => {
    return (

        <div>
            <Table
                columns={columns}
                pagination={{ position: [state.bottom] }}
                dataSource={data}
            />

        </div>
    )
}

export default DoctorQue