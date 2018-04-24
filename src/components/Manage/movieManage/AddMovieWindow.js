import React from 'react';
import { Modal, Button ,Input,Row,Col,Select, DatePicker,message} from 'antd';
import PosterUpload from "./PosterUpload";
import request from '../../../utils/request';

const { TextArea } = Input;
const Option = Select.Option;
const {  RangePicker} = DatePicker;

const type_value = ['喜剧','剧情','动画','科幻','动作','悬疑','爱情','3D'];
const children=[];
for (let i = 0; i < type_value.length; i++) {
  children.push(<Option key={i}>{type_value[i]}</Option>);
}
var info={
  name:'',
  englishname:'',
  director:'',
  cast:'',
  description:'',
  beginTime:'',
  endTime:'',
  movieType:'',
  poster:'',
  country:'',
  duration:'',
};
class AddMovieWindow extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      visible: false ,
      confirmLoading: false,

      movieInfo:{
        name:'',
        englishname :'',
        director:'',
        cast:'',
        description:'',
        beginTime:'',
        endTime:'',
        movieType:'',
        poster:'',
        country:'',
        duration:'',
      }
    };
  }
  showModal () {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    this.setState({ confirmLoading: true});
    let body = this.state.movieInfo;
    console.log(body);
    request('http://localhost:8080/movie/add',JSON.stringify(body))
      .then((res)=>{
           console.log(res);
           this.setState({ confirmLoading:false});
           message.success('添加成功');
           this.props.flush();//刷新表格
        })
      .then(()=>{
        this.setState({
          visible: false,
        });
      });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  getPosterUrl (imgUrl){
    info.poster = imgUrl;
    this.setState({
      movieInfo:info
    });
  }
  beginTimeChange (date, dateString){
    info.beginTime=dateString;
    this.setState({
      movieInfo:info
    });
  }
  endTimeChange(date,dateString){
    info.endTime=dateString;
    this.setState({
      movieInfo:info
    });
  }
  typeChange(value){
    let type = '';
    for (let i in value){
      if(i!=0)
        type+=',';
      let a = parseInt(value[i]);
      type += type_value[a];
    }
    info.movieType=type
    this.setState({
      movieInfo:info
    });
  }
  NameChange(event){
    let id = event.target.id;
    if(id=='name')
     info.name=event.target.value;
    else if(id=='EnglishName')
      info.englishname = event.target.value;
    else if(id=='director')
      info.director=event.target.value;
    else if(id=='description')
     info.description=event.target.value;
    else if(id=='cast')
      info.cast=event.target.value;
    else if(id=='country')
      info.country = event.target.value;
    else if(id=='duration')
      info.duration = event.target.value;
    this.setState({
      movieInfo:info
    });
  }
  componentWillMount(){

  }
  render(){
    const { visible, confirmLoading,movieInfo} = this.state;
    return(
      <div>
        <Button onClick={this.showModal.bind(this)}>添加</Button>
        <Modal
          title="添加影片"
          visible={this.state.visible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
          confirmLoading={confirmLoading}
          width='600px'
          destroyOnClose={true}
        >
          <Row  style={{width:'100%'}}>

            <Col span={7}>
              <div style={{padding:'20px 0px 20px 10px'}}>
              <PosterUpload mode='add' getPosterUrl={this.getPosterUrl.bind(this)}/>
              </div>
            </Col>

            <Col span={17}>
              <div style={{padding:10}}>
                电影名称<Input id="name" onChange={this.NameChange.bind(this)} />
              </div>
              <div style={{padding:10}}>
                英文名称<Input id="EnglishName" onChange={this.NameChange.bind(this)} />
              </div>
              <div style={{padding:10}}>
                <Row gutter={32}>
                  <Col span={9}>
                    导演：<Input id="director"  onChange={this.NameChange.bind(this)} />
                  </Col>
                  <Col span={15}>
                    类型：
                    <Select mode="multiple"  style={{ width: '100%' }} placeholder="Please select"
                            onChange={this.typeChange.bind(this)} >
                      {children}
                    </Select>
                  </Col>
                </Row>
              </div>
            </Col>

          </Row>

          <div style={{padding:10}}>
            <Row gutter={32}>
              <Col span={11}>
                国家：<Input id="country"  onChange={this.NameChange.bind(this)} />
              </Col>
              <Col span={11}>
                时长：<Input id="duration"  onChange={this.NameChange.bind(this)} />
              </Col>
            </Row>
          </div>

          <div style={{padding:10}}>
            演员表：<Input id='cast' onChange={this.NameChange.bind(this)}/>
          </div>

          <div style={{padding:10}}>
            上映时间：
            <DatePicker style={{marginRight:10}} id="begin" onChange={this.beginTimeChange.bind(this)} />
            截止时间：
            <DatePicker id="end" onChange={this.endTimeChange.bind(this)}/>
          </div>

          <div style={{padding:10}}>
            剧情介绍：
            <TextArea rows={4} id='description'  onChange={this.NameChange.bind(this)} />
          </div>
        </Modal>
      </div>
    );
  }
}
export default AddMovieWindow;
