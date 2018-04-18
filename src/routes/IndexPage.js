import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import request from '../utils/request';
function handleClick(){
  let body =  {
    email: "329@",
    password: "111"
  };
  console.log(body);
  request('http://localhost:8080/user/login',JSON.stringify(body))
    .then((data)=>{console.log(data)});
}
function h2 (){
  let body={cid:1};
  console.log(body);
  request('http://localhost:8080/cinema/getByCity',JSON.stringify(body))
    .then((res)=>{
      console.log(res);
    });
}
function IndexPage() {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to dva!</h1>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
        <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
      </ul>

      <button onClick={handleClick}>获取token</button>
      <button onClick={h2}>显示当前token</button>
    </div>
  );
}

IndexPage.propTypes = {
};

export default IndexPage;
