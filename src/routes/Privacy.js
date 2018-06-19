import React from 'react';
import { Layout, Menu,Icon,message,Row,Col} from 'antd';
import request from '../utils/request';
import HomeLayout from '../layout/Header/HomeLayout';
import Select from '../components/Personal/Select';
import styles from './Privacy.css';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Header, Content,Sider} = Layout;

class Privacy extends React.Component {
	constructor(props){
    super(props);
    this.state={
    	pid:1,
    	PUrl:"http://localhost:8080/static/images/avatars/avatar.jpeg",
      url:'',//除去头部的图片链接
    	Ptext:'',
    	Ptelenumber:'',
    	Pmail:'',
    	Ppassword:'',
      Pmoney:0,
    }
  }
  componentWillMount(){
    let a=sessionStorage.getItem('userId');
    let body={
      uid:a
    }
    request('http://localhost:8080/user/getById',JSON.stringify(body))//根据用户Id获取用户全部信息，用于显示
    .then((data)=>{
          if(data){
            console.log('显示');
            console.log(data);
            let a="http://localhost:8080"+data.avatar;
            this.setState({
              PUrl:a,
              url:data.avatar,
              Ptext:data.name,
              Ptelenumber:data.tel,
              Pmail:data.email,
              Pmoney:data.money,
              Ppassword:data.password
            });
          }
        });
  }
  getTele=(e)=>{
  	this.setState({
      Ptelenumber:e
    });
  }
  getPW=(e)=>{
    this.setState({
      Ppassword:e
    })
  	this.state.Ppassword=e;
  }
  handleChange=(val,va)=>{
    let a=sessionStorage.getItem('userId');
    let t=sessionStorage.getItem('isAdmin');
    let tp=0;
    if(t==="true")
      tp=1;
    let ava="http://localhost:8080"+val;
    if(ava!==this.state.PUrl||va!==this.state.Ptext){
      let body={
        id:a,
        name:va,
        password:this.state.Ppassword,
        tel:this.state.Ptelenumber,
        money:this.state.Pmoney,
        isAdmin:tp,
        email:this.state.Pmail,
        avatar:val
      }
      request('http://localhost:8080/user/update',JSON.stringify(body))//更新用户信息
        .then((data)=>{
          if(data){
            message.success('保存成功！');
            this.setState({
              PUrl:ava,
              url:val,
              Ptext:va
            });
          }
        });
    }
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      pid: e.key,
    });
  }
	render(){
    if(sessionStorage.getItem('isAdmin')=='true')
      return(<div style={{padding:40,fontWeight:'bold',fontSize:16,textAlign:'center'}}>你不是普通用户，无权查看此页面</div>);
    console.log(this.state.PUrl);
		return(
      <HomeLayout>
        <div style={{padding:'0px 24px 20px 0px'}}>
          <Row gutter={32}>
            <Col span={5} >
              <div  style={{background:'#fff',minHeight:890,paddingTop:40}}>
                <div className={styles.setPos}>
                  <img alt=" " src={this.state.PUrl} className={styles.setCircle}/>
                </div>
                <Menu onClick={this.handleClick} mode="inline" style={{height: '100%', borderRight: 0}} >
                  <SubMenu key="1" title={<span><Icon type="setting" className={styles.list}/>账号设置</span>}>
                    <Menu.Item key="11"><div style={{paddingLeft:'50px'}}>账号信息</div></Menu.Item>
                    <Menu.Item key="12"><div style={{paddingLeft:'50px'}}>账号绑定</div></Menu.Item>
                    <Menu.Item key="13"><div style={{paddingLeft:'50px'}}>修改密码</div></Menu.Item>
                  </SubMenu>
                  <Menu.Item key="2"><Icon type="wallet"className={styles.list}/>我的账户</Menu.Item>
                  <SubMenu key="3" title={<span><Icon type="global" className={styles.list}/>我的电影票</span>}>
                    <Menu.Item key="31"><div style={{paddingLeft:'50px'}}>全部影票</div></Menu.Item>
                    <Menu.Item key="32"><div style={{paddingLeft:'50px'}}>未观看影票</div></Menu.Item>
                  </SubMenu>
                  <Menu.Item key="4" ><Icon type="barcode" className={styles.list}/>我看过的电影</Menu.Item>
                </Menu>
              </div>
            </Col>
            <Col span={19}>
              <div  style={{background: '#fff', padding:24, marginTop:20, minHeight:870}}>
                <Select pid={this.state.pid} handleChange={this.handleChange} url={this.state.url} money={this.state.Pmoney} text={this.state.Ptext}
                        telenumber={this.state.Ptelenumber} mail={this.state.Pmail} getPW={this.getPW} getTele={this.getTele}/>
              </div>
            </Col>
          </Row>
        </div>
      </HomeLayout>
		);
	}
}

Privacy.propTypes = {
};

export default Privacy;
