import React, { Component } from "react"; // import { Button } from "antd";
import styles from "./login.css";
import router from "umi/router";
import { Login } from "ant-design-pro";
import { connect } from "dva"
const { UserName, Password, Submit } = Login; // 通用的用户名、密码和提交组件
@connect()
export default class extends Component {
  onSubmit = (err, values) => { 
    if ( !err ) {
      this.props.dispatch({
        type: "user/login",
        payload: values
      })
    }
  };
  render() {
    return (
      <div className={styles.loginForm}>
        <Login onSubmit={this.onSubmit}>
          <UserName
            name="userName"
            placeholder="kaikeba"
            rules={[{ required: true, message: "请输入用户名" }]}
          />
          <Password
            name="password"
            placeholder="123"
            rules={[{ required: true, message: "请输入密码" }]}
          />
          <Submit>登录</Submit>
        </Login>
      </div>
    )
  }

}