import React from 'react';
import {Upload,Icon,message} from 'antd';

function getBase64(img,callback){
	const reader=new FileReader();
	reader.addEventListener('load',()=>callback(reader.result));
	reader.readAsDataURL(img);
}
function beforeUpload(file){
	const isJPG=file.type==='image/jpeg';
	if(!isJPG)
		message.error('只能上传jpg格式的图片！');
	const isLt2M=file.size/1024/1024<2;
	if(!isLt2M)
		message.error('图片大小必须小于2MB！');
	return isJPG&&isLt2M;
}
class UploadAvatar extends React.Component{
	constructor(props){
    super(props);
    this.state={
    	loading:false
    }
  }
	handleChange=(info)=>{
		if(info.file.status==='uploading'){
			this.setState({loading:'true'});
			return;
		}
		let res=info.file.response;
		this.setState({
			imageUrl:res.data.data
		});
		/*console.log('头像');
		console.log(res.data.data);		
		console.log('imageUrl');
		console.log(this.state.imageUrl);*/
	}
	render(){
		const uploadButton=(
			<div>
        		<a href="javascript:void(0)"  style={{color:'white'}}>更改头像</a>
      		</div>
		);
		const imageUrl=this.state.imageUrl;
		return(
			<Upload
				name="img"
				showUploadList={false}
				action="http://localhost:8080/pic/uploadAvatar"
				beforeUpload={beforeUpload}
				onChange={this.handleChange}
			>
			{imageUrl ? this.props.handleVal(this.state.imageUrl): ''}
			{uploadButton}
			</Upload>
		);
	}
}

export default UploadAvatar;