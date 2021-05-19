import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

import { Table, Tag, Radio, Space } from 'antd';


const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        responsive: ['md'],
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        responsive: ['md'],
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        responsive: ['ls'],
        render: tags => (
            <span>
                {tags.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </span>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        responsive: ['ls'],
        render: (text, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

class DateList extends React.Component {
    state = {
        bottom: 'bottomCenter',
    };

    render() {
        return (
            <div>
                <Table
                    columns={columns}
                    pagination={{ position: [this.state.bottom] }}
                    dataSource={data}
                />
            </div>
        );
    }
}

export default DateList