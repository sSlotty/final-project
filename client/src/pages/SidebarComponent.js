import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import { Layout, Menu, Dropdown, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  PaperClipOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  FormOutlined,
  CreditCardOutlined,
  MedicineBoxOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

import './Sidebar.css'


import axios from 'axios'


const { Header, Sider, Content, Footer } = Layout;

const Fetch = () => {
  console.log(localStorage.getItem('expires_in'));
  axios.get("/patent").then(({ data }) => {
    console.log(data);
  })
}

const MenuBar = (history) => {
  return (
    <Menu>
      <Menu.Item>
        <a onClick={() => {

          localStorage.removeItem('refreshToken')
          localStorage.removeItem('accessToken')
          localStorage.removeItem('expires_in')
          localStorage.removeItem('staffID')
          history.push('/')
        }}>Logout</a>
      </Menu.Item>
    </Menu>
  )
}

const SidebarComponent = ({ children }) => {
  const [state, setState] = useState({
    collapsed: false
  });
  const toggle = () => {
    setState({
      collapsed: !state.collapsed
    });
  };


  const { SubMenu } = Menu;
  let history = useHistory();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider style={{ height: 'auto', overflow: 'auto' }} trigger={null} collapsible collapsed={state.collapsed}>
        <div className="logo" />

        <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>

          <Menu.Item key="home" icon={<HomeOutlined />}>
            <Link to={'/'}>
              Home
            </Link>
          </Menu.Item>

          <Menu.Item key="patient" icon={<UsergroupAddOutlined />}>

            <Link to={'/patient'}>
              Patient
            </Link>
          </Menu.Item>

          <SubMenu key="doctor" icon={<FormOutlined />} title="Doctor">
            <Menu.Item key="report-1">
              <Link to={'/doctor'}>
                รับคิวผู้ป่วย
              </Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="payment" icon={<CreditCardOutlined />} title="Payment">
            <Menu.Item key="payment-1">
              <Link to={'/payment'}>
                Payment
              </Link></Menu.Item>
          </SubMenu>

          <SubMenu key="medicine" icon={<CreditCardOutlined />} title="Medicine">
            <Menu.Item key="medicine-1">
              <Link to={'/medicine'}>
              </Link>Dispense
            </Menu.Item>
            <Menu.Item key="medicine-2">
              <Link to={'/medicine/view'}>
              </Link>View medicine
            </Menu.Item>
            <Menu.Item key="medicine-3">
              <Link to={'/medicine/add'}>
              </Link>Add medicine
            </Menu.Item>
          </SubMenu>

          <SubMenu key="user" icon={<UserOutlined />} title="User Management">
            <Menu.Item key="users-1">
              <Link to={'/user'}>
                View Staff
              </Link>
            </Menu.Item>
            <Menu.Item key="users-2">
              <Link to={'/user/add'}>
                Add Staff
              </Link>
            </Menu.Item>
          </SubMenu>

        </Menu>
      </Sider>

      <Layout className="site-layout">
        <Header
          className="site-layout-background header"
          style={{
            padding: 0
          }}>
          {React.createElement(state.collapsed
            ? MenuUnfoldOutlined
            : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle
          })}
          <span className="header-profile">
            <Dropdown overlay={MenuBar(history)} placement="bottomRight" arrow>
              <Button><UserOutlined /></Button>
            </Dropdown>
          </span>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280
          }}>
          <div className="layout-content" style={{ backgroundColor: 'whitesmoke', padding: "10px" }}>
            {children}
          </div>
        </Content>

        <Footer className="footer" style={{ textAlign: 'center' }}>OatwantStudio Coppyright 2021</Footer>

      </Layout>

    </Layout>
  )
}

export default SidebarComponent;