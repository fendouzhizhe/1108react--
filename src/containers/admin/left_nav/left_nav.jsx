import React, { Component } from "react";
import { Menu } from "antd";
import logo from "../../../static/imgs/logo.png";
import menus from "../../../config/menu_config";
import "./css/left_nav.less";
import { Link, withRouter } from "react-router-dom";
import {connect} from 'react-redux';
import {createSaveTitleAction} from '../../../redux/actions/title';
//import { createSaveUserAction } from "../../../redux/actions/login";

const { SubMenu, Item } = Menu;

class LeftNav extends Component {

	getTitleByPath = ()=>{
		const {pathname} = this.props.location
		let currentKey = pathname.split('/').reverse()[0]
		if(currentKey === 'admin') currentKey = 'home'
		let title = ''
		menus.forEach((menuObj)=>{
			if(menuObj.children instanceof Array){
				let result = menuObj.children.find((childObj)=>{
					return childObj.key === currentKey
				})
				if(result) title = result.title
			}else{
				if(menuObj.key === currentKey) title = menuObj.title
			}
		})
		this.props.saveTitle(title)
	}

	componentDidMount(){
		if(!this.props.title){
			this.getTitleByPath()
		} 
	}

  //根据菜单配置文件生成菜单
  createMenu = menuArr => {
    return menuArr.map(menuObj => {
      if (!menuObj.children) {
        return (
          <Item onClick={()=>{this.props.saveTitle(menuObj.title)}} key={menuObj.key}>
            <Link to={menuObj.path}>
              <menuObj.icon />
              <span>{menuObj.title}</span>
            </Link>
          </Item>
        );
      } else {
        return (
          <SubMenu
            key={menuObj.key}
            title={
              <span>
                <menuObj.icon />
                <span>{menuObj.title}</span>
              </span>
            }
          >
            {this.createMenu(menuObj.children)}
          </SubMenu>
        );
      }
    });
  };

  render() {
    const currentPathArr = this.props.location.pathname.split("/");
    const selectedKey = currentPathArr.reverse()[0];
    return (
      <div>
        <header className="nav-top">
          <img src={logo} alt="" />
          <h1>商品管理系统</h1>
        </header>
        <div>
          <Menu
            //初始选中的菜单项 key 数组
            // defaultSelectedKeys={[selectedKey]}
            selectedKeys={[selectedKey]}
            //初始展开的 SubMenu 菜单项 key 数组
            defaultOpenKeys={currentPathArr}
            //菜单类型
            mode="inline"
            //主题
            theme="dark"
          >
            {this.createMenu(menus)}
          </Menu>
        </div>
      </div>
    );
  }
}

export default connect(
	//传递状态
	(state)=>({title:state.title}),
	//操作状态的方法
	{saveTitle:createSaveTitleAction}
)(withRouter(LeftNav));
