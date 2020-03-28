import React, { Component } from "react";
import { Form, Input, Button} from "antd";
import {reqLogin} from "../../ajax" ;

import { UserOutlined, LockOutlined } from "@ant-design/icons";

import "./css/login.less";

import logo from "./images/logo.png";

const { Item } = Form;




export default class Login extends Component {
  //表单提交的回调
  onFinish =async values => {
    //const{username,password}=values
    //  axios.post('http://localhost:3000/login',values).then(
    //   response => {console.log(response)},
    //   error => {console.log(error)}
    //  )

    // let result = await axios.post('http://localhost:3000/login',values)
		// console.log('@@@',result);
    // axios.post('http://localhost:3000/login',`username=${username}&password=${password}`).then(
    //   response => {console.log(response)},
    //   error => {console.log(error)}
    // )
    let result = await reqLogin(values)
		console.log('@@@',result);
  };

  pwdValidator = (_, value) => {
    let errmsg = [];
    if (!value.trim()) errmsg.push("Please input your password!");
    if (value.length < 4) errmsg.push("密码必须大于等于4位");
    if (value.length > 12) errmsg.push("密码必须小于等于12位");
    if (!/^\w+$/.test(value)) errmsg.push("密码必须是英文、数字或下划线组成");
    if (errmsg.length > 0) return Promise.reject(errmsg);
    else return Promise.resolve();
  };

  render() {
    return (
      <div className="login">
        <div className="header">
          <img src={logo} alt="logo" />
          <h1>商品管理系统</h1>
        </div>
        <div className="content">
          <h1>用户登录</h1>
          <Form className="login-form" onFinish={this.onFinish}>
            <Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
                { min: 4, message: "用户名必须大于等于4位" },
                { max: 12, message: "用户名必须小于等于12位" },
                {
                  pattern: /^\w+$/,
                  message: "用户名必须是英文、数字或下划线组成"
                }
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="用户名"
              />
            </Item>
            <Item
              name="password"
              rules={[
                {
                  validator: this.pwdValidator
                }
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Item>
            <Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Item>
          </Form>
        </div>
      </div>
    );
  }
}
