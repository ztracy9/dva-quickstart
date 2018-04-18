import React from 'react';
import { Modal, Button ,Input,Row,Col,Select, DatePicker} from 'antd';

class ShowDetailWindow extends React.Component{
  constructor (props) {
    super(props);
    console.log(this.props.movie.poster);
    this.state = {
      visible: false,
     // imgurl:require('../../assets/m1.jpg')
      imgurl:this.props.movie.poster
    };
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  render() {
    const{movie} = this.props;
    return (
      <div>
        <Button type="primary" size="small" onClick={this.showModal}>查看</Button>
        <Modal
          title={movie.name}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div>
            <Row>
              <Col span={16}>
                <p>上映日期：{movie.beginTime}</p>
                <p>下架日期：{movie.endTime}</p>
                <p>导演：{movie.director}</p>
                <p>类型：{movie.type}</p>
                <p>演员：{movie.cast}</p>
              </Col>
              <Col span={8}>
                <img style={{width:100,height:150}} src={this.state.imgurl} alt=""/>
              </Col>
            </Row>
            <p>{movie.description}</p>
          </div>
        </Modal>
      </div>
    );
  }
}


export default ShowDetailWindow;
