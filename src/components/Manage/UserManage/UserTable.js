import React from 'react';
import request from '../../../utils/request';
import { Table,Button,Row,Col,Input,Popconfirm,Dropdown,Menu,message,Pagination} from 'antd';
import SearchUser from './SearchUser';
var flag=0;
const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);
class UserTable extends React.Component{
  constructor (props) {
    super(props);
    this.state={
      user_list:[],
      selectedRowKeys: [],
      loading: false,
      kind:'昵称',
      renovation:1,//刷新
      current:1,
      pageSize:5,
      cacheData:[]
    };
    this.columns = [
  {
    title: '编号',
    dataIndex: 'id',
    width:'8%'
  }, {
    title: '昵称',
    dataIndex: 'name',
    render:(text,record)=>this.renderColumns(text,record,'name')
  },{
    title: '密码',
    dataIndex: 'password',
    render:(text,record)=>this.renderColumns(text,record,'password')
  }, {
    title: '邮箱',
    dataIndex: 'email',
    render:(text,record)=>this.renderColumns(text,record,'email')
  },{
    title: '手机号',
    dataIndex: 'tel',
    render:(text,record)=>this.renderColumns(text,record,'tel')
  },{
    title: '账户金额',
    dataIndex: 'money',
    render:(text,record)=>this.renderColumns(text,record,'money')
  },{
    title:'操作',
    render: (text, record) => {
        const { editable } = record;
        return (
          <div className="editable-row-operations">
            {
              editable ?
                <span>
                  <a onClick={() => this.save(record.id,flag)}>保存</a>
                  <Popconfirm title="确定取消？" okText="确定" cancelText="取消" onConfirm={() => this.cancel(record.id)}>
                    <a style={{paddingLeft:'5px'}}>取消</a>
                  </Popconfirm>
                </span>
                : <Button type="primary" onClick={() => this.edit(record.id,0)}>编辑</Button>
            }
          </div>
        );
    }
  }];
  this.state.cacheData=this.state.user_list.map(item=>({...item}));
}
  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.id, column)}
      />
    );
  }
  getUserList(){
    fetch('http://localhost:8080/user/getAll')
      .then(res => res.json())
      .then(res => {
        this.setState({
         user_list: res.data.data
        });
      });
  }
  componentWillMount(){
    this.getUserList();
  }
  onChange = (page) => {
    this.setState({
      current: page,
    });
  }
  handleChange(value, id, column) {
    const newData = [...this.state.user_list];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      target[column] = value;
      this.setState({ user_list: newData });
    }
  }
  edit(id,x) {
    flag=x;
    const newData = [...this.state.user_list];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      target.editable = true;
      this.setState({ user_list: newData });
      if(flag){//跳转至最后页，即添加框所在的页码
        this.setState({
          current: parseInt(this.state.user_list.length/5)+1
        });
      }
    }
  }
  renovate(){
    let tp=this.state.renovation+1;
    this.setState({
      renovation:tp
    })
  }
  save(id,flag) {
    let newData = [...this.state.user_list];      
    let target = newData.filter(item => id === item.id)[0];
    if(!target.password){
      message.error('用户密码不能为空！');
    }else if(!target.name){
      message.error('用户昵称不能为空！');
    }else {
      delete target.editable;
      this.setState({ user_list: newData });
      this.state.cacheData = newData.map(item => ({ ...item })); 
      console.log('cache');
      console.log(this.state.cacheData);
      if(!target.money)
        target.money=0;
      if(flag){
        let body={
          name:target.name,
          email:target.email,
          password:target.password,
          tel:target.tel,
          money:parseFloat(target.money)
        };
        request('http://localhost:8080/user/register',JSON.stringify(body))
        .then((data)=>{
          if(data){
            message.success('添加成功!');    
            this.state.user_list.pop();
            this.state.user_list.push(data); 
          }
        });
      }else{
        let body={
          id:target.id,
          name:target.name,
          password:target.password,                       
          tel:target.tel,
          money:parseFloat(target.money),            
          isAdmin:0,
          email:target.email, 
          avatar:"null"
        };
        request('http://localhost:8080/user/update',JSON.stringify(body))
        .then((data)=>{
          if(data){
            message.success('修改成功!');    
            for(let i=0;i<this.state.user_list.length;i++){
              if(this.state.user_list[i].id==target.id){
                this.state.user_list[i]=data;
              }
            } 
          }
        });
      }       
    }        
  }
  cancel(id) {
    if(flag){
      this.state.user_list.pop();//若是点击添加之后放弃添加，会将当前行删除      
    }else{
      let newData = [...this.state.user_list];
      let target = newData.filter(item => id === item.id)[0];
      if (target) {
        Object.assign(target, this.state.cacheData.filter(item => id === item.id)[0]);
        delete target.editable;
        this.setState({ user_list: newData });
      }
    }    
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  handleMenuClick=(e)=>{
    if(e.key==="1"){
      this.setState({
        kind:"昵称"
      });
    }else if(e.key==="2"){
      this.setState({
        kind:"邮箱"
      });
    }else{
      this.setState({
        kind:"手机"
      });
    }
  }  
  addUser=()=>{
    let tp=1;
    if(this.state.user_list.length>0)
     tp=this.state.user_list[this.state.user_list.length-1].id+1;
    this.state.user_list.push({
      id:tp,
      name:'',
      email:'',
      tel:''
    });
    flag=1;    
    this.edit(this.state.user_list[this.state.user_list.length-1].id,flag);
  }
  delUser=()=>{
      const keys=this.state.selectedRowKeys;
      for(let k in keys){
        let body={
          uid:keys[k]
        }
        request('http://localhost:8080/user/delete',JSON.stringify(body))                
      }
      message.success('删除成功！');
      let tp=this.state.renovation+1;
    this.setState({
      renovation:tp
    })
  }
  selectUser=(e)=>{
    let list=this.state.user_list;
    if(this.state.kind==="昵称"){
      list=list.filter(item=>item.name===e);
    }else if(this.state.kind==="邮箱"){
      list=list.filter(item=>item.email===e);
    }else{
      list=list.filter(item=>item.tel===e);
    }
    this.setState({user_list:list});
  }
  
  render(){
    const { loading, selectedRowKeys,user_list } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const menu = (//搜索自动补全选择种类
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">昵称</Menu.Item>
        <Menu.Item key="2">邮箱</Menu.Item>
        <Menu.Item key="3">手机</Menu.Item>
      </Menu>
    );
    return(
      <div style={{width:800,height:600,margin:40}}>
        <div style={{ marginBottom: 16}}>
          <Row>
            <Col span={2}>
              <Button type="primary"  disabled={!hasSelected} loading={loading} onClick={this.delUser}>
                删除
              </Button>
            </Col>
            <Col span={4}>
              <Button onClick={this.addUser}>添加</Button>
            </Col>
            <Col span={3}>
              <Dropdown.Button overlay={menu}>{this.state.kind}</Dropdown.Button>             
            </Col>
            <Col span={8}>
              <SearchUser handleSelect={this.selectUser} getAll={this.getUserList.bind(this)} kind={this.state.kind} style={{width:150}}/>
            </Col>
          </Row>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `已选中 ${selectedRowKeys.length} 项` : ''}
          </span>
        </div>

        <Table rowKey={record => record.id} rowSelection={rowSelection} columns={this.columns}
          dataSource={user_list} 
          pagination={{
            total:this.state.user_list.length,
            current:this.state.current,
            onChange:this.onChange,
            pageSize:this.state.pageSize
          }}
        />

      </div>
    );
  }
}
export default UserTable;
