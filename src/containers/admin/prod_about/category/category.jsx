import React, { Component, Fragment } from "react";
// import { Card, Button, Table, message } from "antd";
import { Card, Button, Table, Modal, Form,Input,message } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
// import { reqCategoryList } from "../../../../ajax";

import { connect } from "react-redux";
import {reqAddCategory,reqUpdateCategory} from '../../../../ajax';
import {
  createSaveCategoryAsyncAction,
  createSaveCategoryAction
} from "../../../../redux/actions/category";

const {Item} = Form

class Category extends Component {
  //控制弹窗是否展示 
  state = { visible: false };
  //调用showModal展示弹窗
  showModal = (currentCategory) => {
    const {_id,name}=currentCategory
    if(_id && name){
      this._id = _id
			this.name = name
			this.isUpdate = true
    }else{
      this._id =''
			this.name =''
			this.isUpdate = false
    }

    //重置表单
    if(this.refs.categoryForm){
			this.refs.categoryForm.resetFields()
		}

    //展示弹窗
    this.setState({
      visible: true
    });
  };
  //确认按钮的回调
  handleOk = async() => {
		//获取表单值
		const {categoryName} = this.refs.categoryForm.getFieldsValue()
		if(!categoryName){
			message.error('分类名不能为空')
		}else{
			let result
			if(this.isUpdate){
				result = await reqUpdateCategory(this._id,categoryName)
			}else{
				result = await reqAddCategory(categoryName)
			}
			const {status,msg} = result
			if(status === 0){
				message.success(this.isUpdate ? '修改分类成功！' : '添加分类成功！')
				this.props.saveCategory()
				//通知redux在他所保存的那个分类列表中加入一个data
				//this.props.saveNewCategory([...this.props.categoryList,data])
				//重置表单
				this.refs.categoryForm.resetFields()
				//弹窗隐藏
				this.setState({visible: false});
			}else{
				message.error(msg)
			}
		}
	};
  //取消按钮的回调
  handleCancel = () => {
    //弹窗隐藏
    this.setState({
      visible: false
    });
    //重置表单
		this.refs.categoryForm.resetFields()
  };

  // state = {
  //   categoryList: []
  // };

  // getCategorry = async () => {
  //   let result = await reqCategoryList();
  //   const { status, msg, data } = result;
  //   if (status === 0) {
  //     this.setState({ categoryList: data });
  //   } else {
  //     message.error(msg);
  //   }
  // };

  componentDidMount() {
    // this.getCategorry();
    //通知redux保存分类数据
    this.props.saveCategory();
  }

  render() {
    //数据源
    const dataSource=[...this.props.categoryList]

    // const dataSource = [
    //   {
    //     key: "1",
    //     name: "测试分类一",

    //   },
    //   {
    //     key: "2",
    //     name: "测试分类二",

    //   }

    // ];

    // const dataSource = this.state.categoryList;
    // const dataSource = this.props.categoryList;

    const columns = [
      {
        title: "分类名",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "操作",
        //dataIndex: "name",
        key: "name",
        width: "20%",
        align: "center",
        render: (categoryObj) => {
          return <Button onClick={()=>{this.showModal(categoryObj)}} type="link">修改分类</Button>
        }
      }
    ];

    return (
      <Fragment>
        <Card
          extra={
            <Button onClick={this.showModal} type="primary" >
              <PlusCircleOutlined />
              添加
            </Button>
          }
        >
          {/* <Button onClick={this.getCategorry}>点我</Button> */}
          <Table
            dataSource={dataSource.reverse()}
            columns={columns}
            bordered={true}
            //分页器
            pagination={{ pageSize: 4, showQuickJumper: true }}
            rowKey="_id"
          />
        </Card>
        <Modal
          //弹窗的标题
          title={this.isUpdate ? '修改分类' : '添加分类'}
          //控制弹窗是否展示
          visible={this.state.visible}
          //确认的回调
          onOk={this.handleOk}
          //确认的回调
          onCancel={this.handleCancel}
          okText="确认"
					cancelText="取消"
        >
          <Form ref="categoryForm">
						<Item
							name='categoryName'
							rules={[
								{required:true,message:'分类名必填'}
							]}
						>
							<Input defaultValue={this.name}  placeholder="请输入分类名"/>
						</Item>
					</Form>
        </Modal>
      </Fragment>
    );
  }
}

export default connect(
   //传递状态
  state => ({ categoryList: state.categoryList }),
  //传递操作状态的方法
  {
    saveCategory: createSaveCategoryAsyncAction,
    saveNewCategory: createSaveCategoryAction
  } 
)(Category);
