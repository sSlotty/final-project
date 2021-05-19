import React from 'react'
import { Table, Input, Button, Space, Row, Col, Card, Form, InputNumber } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios'

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import Swal from 'sweetalert2/dist/sweetalert2.all.min'
import 'sweetalert2/dist/sweetalert2.min'

class DoctorDispenseComponent extends React.Component {
    state = {
        searchText: '',
        searchedColumn: '',
        medicine: []
    };

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            this.setState({
                                searchText: selectedKeys[0],
                                searchedColumn: dataIndex,
                            });
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });



    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };


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

        const data = this.state.medicine

        const onFinish = values => {

            const data = {
                'reportID': this.props.match.params.id,
                'meds_ref': values.meds_ref
            }

            axios.post('/dispense', data)
                .then(res => {
                    Swal.fire({
                        icon: 'success',
                        title: 'เพิ่มการสั่งยาสำเร็จ',
                        text: "reportID : " + this.props.match.params.id,
                    }).then(() => {
                        window.location = '/doctor'
                    })
                }).catch(err => {
                    console.log(err)
                })
        };

        const columns = [
            {
                title: 'Medicine ID',
                dataIndex: 'medID',
                key: 'medID',
                width: '30%',
                ...this.getColumnSearchProps('medID'),
                // responsive: ['xs'],
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width: '20%',
                ...this.getColumnSearchProps('name'),
                // responsive: ['md'],
            },
            {
                title: 'amount',
                dataIndex: 'amount',
                key: 'amount',
                width: '20%',
                ...this.getColumnSearchProps('amount'),
                // responsive: ['xs'],
            },
        ];

        return (
            <Row>
                <Col span={12} xs={24} sm={24} md={12} lg={12}>
                    <Card className="card">
                        <Table columns={columns} dataSource={data}></Table>
                    </Card>
                </Col>
                <Col span={12} xs={24} sm={24} md={12} lg={12}>
                    <Card className="card">

                        <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
                            <Form.List name="meds_ref">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'med_id']}
                                                    fieldKey={[fieldKey, 'med_id']}
                                                    rules={[{ required: true, message: 'Missing medicine id' }]}
                                                >
                                                    <Input placeholder="174071" />
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'med_amount']}
                                                    fieldKey={[fieldKey, 'med_amount']}
                                                    rules={[{ required: true, message: 'Missing amount' }]}
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

                    </Card>
                </Col>
            </Row >

        )
    }
}

export default DoctorDispenseComponent