import React from 'react';
import { Upload, Icon, message } from 'antd';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}
class PosterUpload extends React.Component {
  state = {
    loading: false,
    imageUrl:'',
  };

  handleChange = (info) => {
     if (info.file.status === 'uploading') {
      this.setState({loading: true});
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {this.setState({
        imageUrl,
        loading: false,
      });
      });
      let resUrl = info.file.response.data.data;
      let poster = resUrl;
      this.props.getPosterUrl(poster);
    }
  }

  render() {
    let show='';
    const uploadButton = (
      <div>
        <Icon style={{height:'150px',width:'100px'}} type={this.state.loading ? 'loading' : 'plus'}/>
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    let  imageUrl = this.state.imageUrl;
    if(this.props.mode=="edit"&&imageUrl=='')
    {
      imageUrl = "http://localhost:8080"+this.props.src;
    }

    console.log( imageUrl);
    return (
      <Upload
        name="img"
        listType="picture-card"
        showUploadList={false}
        action="http://localhost:8080/pic/uploadPost"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="" style={{height:'150px',width:'100px'}}/> : uploadButton}
      </Upload>
    );
  }
}

export default PosterUpload;

