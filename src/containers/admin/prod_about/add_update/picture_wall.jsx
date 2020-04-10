import React, { Component } from "react";
import { Upload, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { reqDeletePicture } from "../../../../ajax";

//getBase64专门用于将图片转为base64编码
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default class PicturesWall extends Component {
  state = {
    //是否展示预览窗
    previewVisible: false, 
    //预览(值可以是：url 或 base64)
    previewImage: "", 
    fileList: [
      //所有已经上传完毕的文件，所组成的文件列表
      /* {
        //图片的唯一编号
        uid: '1', 
        //经过服务器改名之后的图片名
        name: 'image.png', 
        //文件状态
				status: 'done', 
				//服务返回的图片查看地址
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
			} */
    ],
  };

  //根据fileList生成一个由新的图片名所组成的数组
  getImgsNameArr = () => {
    let arr = [];
    this.state.fileList.forEach((imgObj) => {
      arr.push(imgObj.name);
    });
    return arr;
  };

  //关闭预览按钮的回调（右上角的关闭按钮）
  handleCancel = () => this.setState({ previewVisible: false });

  //点击预览按钮的回调（小眼睛）
  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  //图片状态发生改变的回调
  handleChange = async ({ file, fileList }) => {
    if (file.status === "done") {
      if (file.response.status === 0) {
        message.success("图片上传成功！");
        const { name, url } = file.response.data;
        fileList[fileList.length - 1].name = name;
        fileList[fileList.length - 1].url = url;
      }
    }
    if (file.status === "removed") {
      //发送ajax请求，告诉服务器根据图片名去删除图片
      let result = await reqDeletePicture(file.name);
      const { status, msg } = result;
      if (status === 0) message.success("删除图片成功！");
      else message.error(msg);
    }
    this.setState({ fileList });
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">点击上传</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          //图片上传给哪个服务器？
          action="/manage/img/upload" 
          //发到后台的文件参数名
          name="image" 
          //照片墙视图
          listType="picture-card" 
          //配置要展示哪些上传完的图片
          fileList={fileList} 
          //点击“小眼睛”的回调
          onPreview={this.handlePreview} 
          //点击关闭预览的回调
          onChange={this.handleChange} 
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
