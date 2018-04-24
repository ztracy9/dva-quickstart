import React from 'react';
import { Modal, Button ,Input,Row,Col,Select, DatePicker,message} from 'antd';
import PosterUpload from "./PosterUpload";
import moment from 'moment';
import request from '../../../utils/request';

const { TextArea } = Input;
const Option = Select.Option;
const {  RangePicker} = DatePicker;

const type_value = ['喜剧','剧情','动画','科幻','动作','悬疑','3D'];
const children=[];
for (let i = 0; i < type_value.length; i++) {
  children.push(<Option key={type_value[i]}>{type_value[i]}</Option>);
}

class EditMovieWindow extends React.Component{

  constructor (props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false,
      movieInfo: '',
    }
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
    let body = this.state.movieInfo;
    console.log(body);
    request('http://localhost:8080/movie/update',JSON.stringify(body))
      .then((res)=>{
        console.log(res);
        message.success('更新成功');
        this.setState({ confirmLoading: false});
      });
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  beginTimeChange (date, dateString){
    console.log(dateString);
    this.state.movieInfo.beginTime=dateString;
  }

  endTimeChnage(date,dateString){
    this.state.movieInfo.endTime=dateString;
  }
  getPosterUrl (imgUrl){
    this.state.movieInfo.poster = imgUrl;
  }
  typeChange(value){
    console.log(value);
    let type = '';
    for (let i in value){
      if(i!=0)
        type+=',';
      type += value[i];
    }
    this.state.movieInfo.movieType=type;
  }
  NameChange(event){
    let id = event.target.id;
    if(id=='name')
      this.state.movieInfo.name=event.target.value;
    else if(id=='EnglishName')
      this.state.movieInfo.englishname = event.target.value;
    else if(id=='director')
      this.state.movieInfo.director=event.target.value;
    else if(id=='description')
      this.state.movieInfo.description=event.target.value;
    else if(id=='cast')
      this.state.movieInfo.cast=event.target.value;
    else if(id=='country')
      this.state.movieInfo.country = event.target.value;
    else if(id=='duration')
      this.state.movieInfo.duration = event.target.value;
  }
  render(){
    const { visible, confirmLoading,disabled,movieInfo} = this.state;
    let btime = moment(movieInfo.beginTime);
    let etime = moment(movieInfo.endTime);
    let typeStr  = movieInfo.movieType;
    let types = typeStr.split(',');
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
                <PosterUpload mode="edit" src={movieInfo.poster} getPosterUrl={this.getPosterUrl.bind(this)}/>
              </div>
            </Col>

            <Col span={17}>
              <div style={{padding:10}}>
                电影名称<Input id="name" onChange={this.NameChange.bind(this)} defaultValue={movieInfo.name} />
              </div>
              <div style={{padding:10}}>
                英文名称<Input id="EnglishName" onChange={this.NameChange.bind(this)} defaultValue={movieInfo.englishname}  />
              </div>
              <div style={{padding:10}}>
                <Row gutter={32}>
                  <Col span={9}>
                    导演：<Input id="director"  onChange={this.NameChange.bind(this)} defaultValue={movieInfo.director}  />
                  </Col>
                  <Col span={15}>
                    类型：
                    <Select mode="multiple"  style={{ width: '100%' }} placeholder="Please select"
                            onChange={this.typeChange.bind(this)} defaultValue={types}>
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
                国家：<Input id="country"  onChange={this.NameChange.bind(this)} defaultValue={movieInfo.country} />
              </Col>
              <Col span={11}>
                时长：<Input id="duration"  onChange={this.NameChange.bind(this)} defaultValue={movieInfo.duration}/>
              </Col>
            </Row>
          </div>
          <div style={{padding:10}}>
            演员表：<Input id='cast' onChange={this.NameChange.bind(this)} defaultValue={movieInfo.cast}/>
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
