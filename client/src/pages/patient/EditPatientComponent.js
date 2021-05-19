import React from 'react';

import { Card } from 'antd'

import { Form, Input, Button } from 'antd';

import axios from 'axios'

import Swal from 'sweetalert2/dist/sweetalert2.js'

import { DatePicker, Space } from "antd";

import moment from "moment";

const { RangePicker } = DatePicker;

const dateFormat = "YYYY/MM/DD";

const customFormat = (value) => `custom format: ${value.format(dateFormat)}`;

class EditPatientComponent extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      patient: []
    }

  }


  handleChange = (e) => {
    this.setState({ patient: e.target.value });
  }
  componentDidMount() {
    this.getData();
  }

  getData() {

    const patentID = this.props.match.params.id;

    axios
      .get("/patent/id", { params: { patentID } })
      .then((res) => {
        this.state.patient = res.data.data;
        this.setFormValue(res.data.data[0]);

        // console.log(res.data)
      })
      .catch((err) => {
        console.error(err);
        // window.location = "/patent";
      });

  }
  setFormValue(data) {
    this.formRef.current.setFieldsValue({
      name: data.name ? data.name : "",
      // dob: data.dob ? data.dob : " ",
      email: data.email ? data.email : " ",
      tel: data.tel ? data.tel : "",
      job: data.job ? data.job : ""

    })
  }

  saveFormData() {

  }

  render() {

    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 8,
      },
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
      // console.log(values)
      const patentID = this.props.match.params.id

      // console.log(typeof (values.dob))

      const data = {
        patentID: patentID,
        name: values.name,
        dob: values.dob,
        email: values.email,
        tel: values.tel,
        job: values.job
      }

      // console.log(data)
      axios.put('patent/id', data).then(res => {
        if (res.status === 200) {
          Toast.fire({
            icon: 'success',
            title: 'Update success'
          }).then(() => {
            window.location = "/patient";
          })

        } else {
          Toast.fire({
            icon: 'error',
            title: 'Fail to update'
          })
        }

        // console.log(res.status)
      })
    }

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




    return (
      <div className="touch">
        <Card title="Edit" className="card" bordered={true}>

          <Form
            {...layout}
            ref={this.formRef}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="dob"
              label="dob"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker />
            </Form.Item>

            <Form.Item
              name="tel"
              label="tel"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="email"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="job"
              label="JOB"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}


export default EditPatientComponent;