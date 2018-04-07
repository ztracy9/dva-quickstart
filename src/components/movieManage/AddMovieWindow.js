import React from 'react';
import { Modal, Button ,Input,Row,Col,Select, DatePicker} from 'antd';
import PosterUpload from "./PosterUpload";

const { TextArea } = Input;
const Option = Select.Option;
const {  RangePicker} = DatePicker;

const type_value = ['喜剧','剧情','动画','科幻','动作','悬疑','3D'];
const children=[];
for (let i = 0; i < type_value.length; i++) {
  children.push(<Option key={i}>{type_value[i]}</Option>);
}

class AddMovieWindow extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      visible: false ,
      name:'',
      EnglishName:'',
      director:'',
      cast:'',
      description:'',
      dateRange:'',
      movieType:[],
      propaganda:''
    };
  }
  showModal () {
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
    this.setState({
      visible: false,
    });
  }
  dateChange (date, dateString){
    this.setState({
      dateRange:dateString
    });
  }
  typeChange(value){
    console.log(value);
    var list = [];
    for (let i in value){
      let a = parseInt(value[i]);
      list.push(type_value[a]);
    }
    this.setState({
      movieType:list
    });
  }
  NameChange(event){
    let id = event.target.id;
    if(id=='name')
      this.setState({name:event.target.value});
    else if(id=='EnglishName')
      this.setState({EnglishName:event.target.value});
    else if(id=='director')
      this.setState({director:event.target.value});
    else if(id=='description')
      this.setState({description:event.target.value});
    else if(id=='cast')
      this.setState({cast:event.target.value});
    else if(id=='propaganda')
      this.setState({propaganda:event.target.value});
  }
  render(){
    return(
      <div>
        <Button type="primary" onClick={this.showModal.bind(this)}>添加影片</Button>
        <Modal
          title="添加影片"
          visible={this.state.visible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
          width='600px'
          destroyOnClose={true}
        >
          <Row  style={{width:'100%'}}>

            <Col span={7}>
              <div style={{padding:'20px 0px 20px 10px'}}>
              <PosterUpload/>
              </div>
            </Col>

            <Col span={17}>
              <div style={{padding:10}}>
                电影名称<Input id="name" onChange={this.NameChange.bind(this)}/>
              </div>
              <div style={{padding:10}}>
                英文名称<Input id="EnglishName" onChange={this.NameChange.bind(this)}/>
              </div>
              <div style={{padding:10}}>
                <Row gutter={32}>
                  <Col span={9}>
                    导演：<Input id="director"  onChange={this.NameChange.bind(this)}/>
                  </Col>
                  <Col span={15}>
                    类型：
                    <Select mode="multiple"  style={{ width: '100%' }} placeholder="Please select" onChange={this.typeChange.bind(this)}>
                      {children}
                    </Select>
                  </Col>
                </Row>
              </div>
            </Col>

          </Row>
          <div style={{padding:10}}>
            演员表：<Input id='cast' onChange={this.NameChange.bind(this)}/>
          </div>
          <div style={{padding:10}}>
            宣传语：<Input id="propaganda" onChange={this.NameChange.bind(this)}/>
          </div>
          <div style={{padding:10}}>
            选择上映时间：
            <RangePicker  onChange={this.dateChange.bind(this)}/>
          </div>

          <div style={{padding:10}}>
            剧情介绍：
            <TextArea rows={4} id='description'  onChange={this.NameChange.bind(this)}/>
          </div>

        </Modal>
      </div>
    );
  }
}
export default AddMovieWindow;
