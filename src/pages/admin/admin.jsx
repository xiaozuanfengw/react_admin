import React from 'react'

import {Redirect, Route, Switch} from 'react-router-dom'

import memoryUtils from '../../utils/memoryUtils'

import { Layout } from 'antd';

import AdminHeader from '../../component/header'

import LeftNav from '../../component/left-nav'

import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'



const { Footer, Sider, Content } = Layout;



export default class Admin extends React.Component{
    render () {
        const user = memoryUtils.user
        if (!user._id){
            return <Redirect to="/login"/>
        }
        return (
            <Layout style={{ height:'100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                   
                        <AdminHeader/>
                  
                    <Content style={{backgroundColor: 'white', margin:'30px'}}>
                        <Switch>
                            <Route path='/Home' component={Home}/>
                            <Route path='/Category' component={Category}/>
                            <Route path='/product' component={Product}/>
                            <Route path='/role' component={Role}/>
                            <Route path='/user' component={User}/>
                            <Route path='/charts/bar' component={Bar}/>
                            <Route path='/charts/line' component={Line}/>
                            <Route path='/charts/pie' component={Pie}/>
                            <Redirect to='/Home'/>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center'}}>Footer</Footer>
                </Layout>
            </Layout>
        )
    }
}