import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect,Route,Switch } from "react-router-dom";
import { Layout } from "antd";
import Header from "./header/header";
import "./css/admin.less";

import Home from '../../components/home/home';
import Category from '../admin/prod_about/category/category';
import Produte from '../admin/prod_about/product/product';
import User from '../admin/user/user';
import Role from '../admin/role/role';
import Bar from '../admin/charts/bar/bar';
import Line from '../admin/charts/line/line';
import Pie from '../admin/charts/pie/pie';
import AddUpdate from './prod_about/add_update/add_update';
import Detail from './prod_about/detail/detail';

import LeftNav from "./left_nav/left_nav";
const { Footer, Sider, Content } = Layout;

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
          <Content className="admin-content">
            <Switch>
              <Route path="/admin/home" component={Home}/>
              <Route path="/admin/prod_about/category" component={Category}/>
              <Route path="/admin/prod_about/product" exact component={Produte}/>
              <Route path="/admin/user" component={User}/>
              <Route path="/admin/role" component={Role}/>
              <Route path="/admin/charts/bar" component={Bar}/>
              <Route path="/admin/charts/line" component={Line}/>
              <Route path="/admin/charts/pie" component={Pie}/>
              <Route path="/admin/prod_about/product/add" component={AddUpdate}/>
              <Route path="/admin/prod_about/product/update/:id" component={AddUpdate}/>
							<Route path="/admin/prod_about/product/detail/:id" component={Detail}/>
              <Redirect to="/admin/home"/>
            </Switch>
          </Content>
          <Footer className="admin-footer">
            推荐使用谷歌浏览器，获取最佳用户体验
          </Footer>
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
