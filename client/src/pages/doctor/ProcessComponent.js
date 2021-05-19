import React from 'react'

import { Card, Typography, Form, Input, Button, Alert, Modal, Upload, message, } from 'antd'
import axios from 'axios'
import { FormInstance } from 'antd/lib/form';
import Swal from 'sweetalert2/dist/sweetalert2.all.min'
import 'sweetalert2/dist/sweetalert2.min'
import { Redirect } from 'react-router-dom'
import Moment from 'react-moment';

import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';


function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class ProcessComponent extends React.Component {

    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            dataBooking: [],
            patients: [],
            fileList: [],
            previewVisible: false,
            previewImage: '',
            previewTitle: '',
            visible: false,

        }
    }

    componentDidMount() {
        this.getData()
    }

    async getData() {
        const bookingID = this.props.match.params.id
        let response = await axios.get('/booking/id', { params: { bookingID } })
        this.setState({ dataBooking: response.data.data })
        this.setState({ patients: response.data.data[0]['patients'] })

    }

    showModal() {
        this.setState({
            visible: true,
        });
    };

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    handleChange = ({ fileList }) => this.setState({ fileList });

    sendPicture = () => {
        let regex = /^data:image\/(png|jpg);base64,/
        const data = this.state.fileList
        const tumpUrl = data[0]['thumbUrl'];
        const img = tumpUrl.replace(regex, "")

        axios.post('/ocr', { "img": img }).then(response => {
            const res = response.data.data
            console.log(res)
            const text = res[0].fullTextAnnotation.text
            console.log(text)
            this.setState({ visible: false })
            if (response.status == 200) {
                this.formRef.current.setFieldsValue({
                    reportDetail: text ? text : "",
                })


            }
        }).catch(err => console.error(err))
    }

    render() {



        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );

        const onFinish = (values) => {
            console.log(values)
            if (values != null) {

                Swal.fire({
                    title: 'Are you sure?',
                    text: "You want to confirm the report!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes!'
                }).then((result) => {

                    if (result.isConfirmed) {

                        const data = {
                            'bookingID': this.props.match.params.id,
                            'staffID': localStorage.getItem('staffID'),
                            'patentID': this.state.patients[0]?._id,
                            'header': values.reportSubject,
                            'detail': values.reportDetail
                        }
                        console.log(data)
                        axios.post('/report', data)
                            .then(res => {
                                window.location = '/doctor/dispense/' + res.data.data;
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    }
                })

            }
        };

        const layout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 8,
            },
        };

        const { Title, Paragraph, Text, Link } = Typography;

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



        return (
            <>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}

                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
                <div className="touch">

                    <Card className="card" style={{ marginBottom: 15 }}>
                        <Typography>
                            <Paragraph>
                                <Alert
                                    message={
                                        <>
                                            Booking id : {this.state.dataBooking[0]?._id}
                                        </>
                                    }
                                    description={
                                        <>
                                            รายระเอียด : {this.state.dataBooking[0]?.detail}
                                        </>
                                    }
                                    type="warning"
                                />
                                <br></br>
                                <Alert
                                    message={
                                        <>
                                            <h5>ประวัติ</h5>
                                        </>
                                    }
                                    description={
                                        <>
                                            <p>ชื่อ : {this.state.patients[0]?.name}</p>
                                            <p>วันเกิด : <Moment date={this.state.patients[0]?.dob} format="D/MM/YYYY" /></p>
                                            <p>อายุ : {moment(this.state.patients[0]?.dob, "YYYMMDD").fromNow().replace("ago", " ")}</p>

                                        </>
                                    }
                                    type="info"
                                />
                            </Paragraph>
                        </Typography>

                        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} ref={this.formRef}>

                            <Modal title="ML : Upload picture for set text inside report detail"
                                visible={this.state.visible}
                                onOk={() => this.setState({ visible: false })}
                                onCancel={() => this.setState({ visible: false })}
                                footer={[
                                    <Button key="back" onClick={() => this.setState({ visible: false })} type="button" style={{ backgroundColor: '#FBBF24', color: 'black' }}>Back</Button>,
                                    <Button key="send-data" onClick={() => this.sendPicture()} type="button" style={{ backgroundColor: '#059669', color: '#F9FAFB' }}>Send data</Button>
                                ]}>
                                <Upload
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChange}
                                    maxCount={1}
                                >
                                    {fileList.length >= 1 ? null : uploadButton}
                                </Upload>
                            </Modal>
                            <Form.Item
                                name='reportSubject'
                                label="Subject"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item name='reportDetail' label="report detail"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                <Input.TextArea
                                    autoSize={{ minRows: 10, maxRows: 24 }}/>
                            </Form.Item>
                            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                <Button style={{backgroundColor: "#31A32B", color: "white" }} onClick={() => this.showModal()} type="text" size="small"  >New function</Button>
                            </Form.Item>
                            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>

                        </Form>
                    </Card>
                </div>
            </>
        )
    }
}

export default ProcessComponent