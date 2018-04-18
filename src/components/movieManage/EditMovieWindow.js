import React from 'react';
import { Modal, Button ,Input,Row,Col,Select, DatePicker} from 'antd';
import PosterUpload from "./PosterUpload";
import moment from 'moment';

const { TextArea } = Input;
const Option = Select.Option;
const {  RangePicker} = DatePicker;

const type_value = ['喜剧','剧情','动画','科幻','动作','悬疑','3D'];
const children=[];
for (let i = 0; i < type_value.length; i++) {
  children.push(<Option key={i}>{type_value[i]}</Option>);
}
var info={
  name:'',
  EnglishName:'',
  director:'',
  cast:'',
  description:'',
  beginTime:'',
  endTime:'',
  movieType:[],
  propaganda:''
};
class EditMovieWindow extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      visible: false ,
      confirmLoading: false,

      movieInfo:{
        name:'',
        EnglishName:'',
        director:'',
        cast:'',
        description:'',
        beginTime:'',
        endTime:'',
        movieType:[],
        propaganda:''
      },
      disabled:true
    };
  }
  componentWillMount(){
      this.setState({
        movieInfo:this.props.movie
      });
  }
  showModal () {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    this.setState({ confirmLoading: true});
    fetch('http://localhost:3000/movie', {
      method: 'post',
      // 使用fetch提交的json数据需要使用JSON.stringify转换为字符串
      body: JSON.stringify(this.state.movieInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((res) => {
        // 当添加成功时，返回的json对象中应包含一个有效的id字段
        // 所以可以使用res.id来判断添加是否成功
        if (res.id) {
          alert('添加电影成功');
        } else {
          alert('添加失败');
        }
        this.setState({
          visible: false,
          confirmLoading:false
        });
      })
      .catch((err) => console.error(err));
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  beginTimeChange (date, dateString){
    info.beginTime=dateString;
    this.setState({
      movieInfo:info
    });
  }
  endTimeChnage(date,dateString){
    info.endTime=dateString;
    this.setState({
      movieInfo:info
    });
  }
  typeChange(value){
    var list = [];
    for (let i in value){
      let a = parseInt(value[i]);
      list.push(type_value[a]);
    }
    info.movieType=list;
    this.setState({
      movieInfo:info
    });
  }
  NameChange(event){
    let id = event.target.id;
    if(id=='name')
      info.name=event.target.value;
    else if(id=='EnglishName')
      info.EnglishName=event.target.value;
    else if(id=='director')
      info.director=event.target.value;
    else if(id=='description')
      info.description=event.target.value;
    else if(id=='cast')
      info.cast=event.target.value;
    else if(id=='propaganda')
      info.propaganda=event.target.value;
    this.setState({
      movieInfo:info
    });
  }
  render(){
    const { visible, confirmLoading,disabled,movieInfo} = this.state;
    let btime = moment(movieInfo.beginTime);
    let etime = moment(movieInfo.endTime);
    return(
      <div>
        <Button size='small'  type='primary' onClick={this.showModal.bind(this)}>编辑</Button>
        <Modal
          title="影片详情"
          visible={visible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
          confirmLoading={confirmLoading}
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
                电影名称<Input id="name" onChange={this.NameChange.bind(this)} defaultValue={movieInfo.name} />
              </div>
              <div style={{padding:10}}>
                英文名称<Input id="EnglishName" onChange={this.NameChange.bind(this)} defaultValue={movieInfo.EnglishName}  />
              </div>
              <div style={{padding:10}}>
                <Row gutter={32}>
                  <Col span={9}>
                    导演：<Input id="director"  onChange={this.NameChange.bind(this)} defaultValue={movieInfo.director}  />
                  </Col>
                  <Col span={15}>
                    类型：
                    <Select mode="multiple"  style={{ width: '100%' }} placeholder="Please select"
                            onChange={this.typeChange.bind(this)} defaultValue={movieInfo.movieType}>
                      {children}
                    </Select>
                  </Col>
                </Row>
              </div>
            </Col>

          </Row>
          <div style={{padding:10}}>
            演员表：<Input id='cast' onChange={this.NameChange.bind(this)} defaultValue={movieInfo.cast}/>
          </div>
          <div style={{padding:10}}>
            宣传语：<Input id="propaganda" onChange={this.NameChange.bind(this)} defaultValue={movieInfo.propaganda}  />
          </div>
          <div style={{padding:10}}>
            上映时间：
            <DatePicker id="begin" onChange={this.beginTimeChange.bind(this)} defaultValue={btime}/>
            截止时间：
            <DatePicker id="end" onChange={this.endTimeChnage.bind(this)} defaultValue={etime}/>
          </div>

          <div style={{padding:10}}>
            剧情介绍：
            <TextArea rows={4} id='description'  onChange={this.NameChange.bind(this)} defaultValue={movieInfo.description} />
          </div>

        </Modal>
      </div>
    );
  }
}
export default EditMovieWindow;
