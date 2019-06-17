import React from 'react'
import { 
    Form, 
    Icon, 
    Input,
    Button, 
    message
  } from 'antd'
import Logo from '../../assets/images/logo.png'
import {Redirect} from 'react-router-dom'
import {reqLogin} from '../../api'
import './login.less'
import memoryUtils from '../../utils/memoryUtils'

import {saveUser} from '../../utils/storageUtils.js'



 class Login extends React.Component{
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.form.validateFields(async (err, values)=>{
      if(!err){
        const {userName, password} = values
        const  result= await reqLogin(userName,password)
        if(result.status === 0){
          const user = result.data
          saveUser(user)
          memoryUtils.user = user
          this.props.history.replace('/')
        }else {
          message.error(result.msg)
        }
      }
    })  
  } 
  
  // validator = (relu, value='', callback) => {
  //   value = value.trim()
  //   if (!value){
  //     callback('密码不能为空')
  //   }else if (value.length<4){
  //     callback('密码长度不能小于4')
  //   }else if (value.length>12){
  //     callback('密码长度不能大于12')
  //   }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
  //     callback('密码必须是字母，数字或者下划线')
  //   }else {
  //     callback()
  //   }
  // }
    render () {
      if(memoryUtils.user._id){
        return <Redirect to="/"/>
      }



      let {getFieldDecorator} = this.props.form
        return (
            <div className="login">
                <header className="login-header">
                    <img src={Logo} alt="Logo"/>
                <h1>React项目: 后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item >{
                  getFieldDecorator('userName',{rules:[
                    { required: true, message: '请输入用户名字' },
                    { min: 4, message: '用户名不能少与4' },
                    { max: 12, message: '用户名不能大于12' },
                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能是数字和字母.下划线' }
                  ]})(
                    <Input
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="用户名"
                    />
                  )
            }
           
              
            </Form.Item>
            <Form.Item>{
                getFieldDecorator('password',{rules:[
                  (relu, value='', callback) => {
                    value = value.trim()
                    if (!value){
                      callback('密码不能为空')
                    }else if (value.length<4){
                      callback('密码长度不能小于4')
                    }else if (value.length>12){
                      callback('密码长度不能大于12')
                    }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
                      callback('密码必须是字母，数字或者下划线')
                    }else {
                      callback()
                    }
                  }
                ]
              })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />
                )
            }
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登 陆
              </Button>
            </Form.Item>
            </Form>         
                </section>
            </div>          
        )     
    }
}
const WrappedNormalLoginForm = Form.create()(Login);

export default WrappedNormalLoginForm ;