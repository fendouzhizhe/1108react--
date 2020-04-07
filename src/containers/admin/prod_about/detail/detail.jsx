import React, { Component } from 'react'
import {Button,Card,List,message} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons';
import {connect} from 'react-redux'
import {createSaveCategoryAsyncAction} from '../../../../redux/actions/category'
import {reqProductDetailById} from '../../../../ajax'
import './css/detail.less'

const {Item} = List

class Detail extends Component {

	state = {
    //商品图片
    imgs:[],
    //商品分类id
    categoryId:'',
    //商品名称
    name:'',
    //商品描述
    desc:'',
    //商品价格
    price:0,
    //商品详情
    detail:'',
    //是否处于请求中
		isLoading:true 
	}

	//根据分类id计算分类名
	getCategoryName = (categoryId)=>{
		let result = this.props.categoryList.find((categoryObj)=>{
			return categoryObj._id === categoryId
		})
		if(result){
      return result.name
    } 
	}

	//根据商品id获取商品详细信息
	getProductDetail = async()=>{
    //获取通过路由传递过来的商品_id
    //获取传递过来的id
    const {id} = this.props.match.params 
    //请求详细信息
		let result = await reqProductDetailById(id) 
		const {status,data,msg} = result
		if(status === 0){
			//如果成功维护数据进状态
			const {imgs,categoryId,name,desc,price,detail} = data
			this.setState({imgs,categoryId,name,desc,price,detail,isLoading:false})
		}else{
			message.error(msg)
		}
	}

	componentDidMount(){
		//尝试着从redux中读取商品分类数据
		const {categoryList,saveCategoty} = this.props
		//通知redux请求分类信息并保存
    if(!categoryList.length) {
      saveCategoty()
    }
    //根据id查询商品详细信息
		this.getProductDetail() 
	}

	render() {
		//从状态中读取数据
		const {imgs,categoryId,name,desc,price,detail,isLoading} = this.state
		return (
			<Card 
				title={
					<div>
						<Button onClick={this.props.history.goBack} type="link">
							<ArrowLeftOutlined/>
						</Button>
						<span>商品详情</span>
					</div>
				} 
			>
				<List loading={isLoading}>
					<Item className="product-item">
						<span className="item-title">商品名称：</span>
						<span>{name}</span>
					</Item>
					<Item className="product-item">
						<span className="item-title">商品描述：</span>
						<span>{desc}</span>
					</Item>
					<Item className="product-item">
						<span className="item-title">商品价格：</span>
						<span>{'￥'+price}</span>
					</Item>
					<Item className="product-item">
						<span className="item-title">所属分类：</span>
						<span>{this.getCategoryName(categoryId)}</span>
					</Item>
					<Item className="product-item">
						<span className="item-title">商品图片：</span>
						{
							imgs.map((imgName,index)=>{
								return <img key={index} src={'/upload/'+imgName} alt="pic"/>
							})
						}
					</Item>
					<Item className="product-item">
						<span className="item-title">商品详情：</span>
						<span dangerouslySetInnerHTML={{__html:detail}}></span>
					</Item>
				</List>
			</Card>
		)
	}
}

export default connect(
  //传递状态
	(state)=>({categoryList:state.categoryList}),
	{//传递操作状态的方法
		saveCategoty:createSaveCategoryAsyncAction
	}
)(Detail)

