import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Layout } from "antd";
import Header from './header/header';
import './css/admin.less'
import LeftNav from './left_nav/left_nav';
const {Footer, Sider, Content } = Layout;

class Admin extends Component {
  // logout=()=>{
  //   this.props.deleteUserInfo()
  // }

  render() {
    if (!this.props.isLogin) {
      return <Redirect to="/login" />;
    }
    return (
      <Layout className="layout-wrap">
          <Sider>
            <LeftNav />
          </Sider>
          <Layout>
            <Header />
            <Content>Content</Content>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
    );
  }
}

export default connect(
  state => ({
    isLogin: state.userInfo.isLogin
  }),
  {}
)(Admin);
