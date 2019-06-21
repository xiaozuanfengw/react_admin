import React from 'react'

import { Modal } from 'antd';


import './index.less'

import memoryUtils from '../../utils/memoryUtils'

import {formateDate} from '../../utils/dateUtils'

import {withRouter} from 'react-router-dom'

import menuList from '../../config/menuConfig' 

import {reqWeather} from '../../api/index'

import {removeUser} from '../../utils/storageUtils'

import LinkButton from '../../component/link-button'

 class Header extends React.Component{
   
    state={
        currentTime:formateDate(Date.now()), //当前事件字符串
        dayPictureUrl:'',//天气图片
        weather:'',//天气文本
    }
    showCurrentTime = () =>{
            this.itervalId=setInterval(()=>{
            const currentTime = formateDate(Date.now())
            this.setState({currentTime
            })
        },1000)
    }

    getTitle = () =>{
        const path = this.props.location.pathname
        let title = ''
        menuList.forEach(item => {
          if (item.key===path) {
            title = item.title
          } else if (item.children) {
            const cItem = item.children.find(item => item.key===path)
            if (cItem) {
              title = cItem.title
            }
          }
        })
    
        return title
    }
// 退出登录
    logout = () =>{
        Modal.confirm({
            title: 'Do you Want to delete these items?',
            content: 'Some descriptions',
            onOk: ()=> {
              console.log('OK');
              removeUser()
              memoryUtils.user={}
              
              this.props.history.replace('/login')
            },
            onCancel() {
                
              console.log('Cancel');
            },
          });
    }
   



    componentWillUnmount(){
        clearInterval(this.itervalId)
        
    }

    getWeather = async () => {
        const { dayPictureUrl, weather} = await reqWeather('北京')
        debugger
        // 更新状态
        this.setState({
           dayPictureUrl, 
           weather 
        })
      }


    componentDidMount(){
        this.showCurrentTime()
        //当前天气显示
        this.getWeather() 
    }
    render(){
      
        const {currentTime,dayPictureUrl,weather}=this.state
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎, {memoryUtils.user.username}</span>
                    {/* <a href="javascpipt:;" >退出</a> */}
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                < div className = "header-bottom" >
                    <span className="header-bottom-left">
                        首页
                        <div></div>
                    </span>
                    <span className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl}alt="Weather"/>
                        <span>{weather}</span>
                    </span>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)