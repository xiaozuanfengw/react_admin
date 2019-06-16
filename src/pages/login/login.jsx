import React from 'react'
import { 
    Form, 
    Icon, 
    Input,
    Button, 
  } from 'antd'
import Logo from './images/logo.png'
import './login.less'



 class Login extends React.Component{
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.form.validateFields((err, values)=>{
        if(!err){
          console.log(values)
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
              })
                (
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