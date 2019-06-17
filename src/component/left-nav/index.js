import React, { Component } from 'react'
import {Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd'

import menuList from "../../config/menuConfig"   // ===> [<Item/>, <SubMenu/>>]
import logo from '../../assets/images/logo.png'
import './index.less'

const { SubMenu, Item } = Menu


class LeftNav extends Component {


  
  getMenusNodes = (menuList) => {
    
   
    return menuList.map(item => {

      
      if (!item.children) {
        return (
          <Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Item>
        )
      } else {  
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {
              this.getMenusNodes(item.children)
            }
          </SubMenu>
        )
      }

     


    })
  }


  getMenuNodes2 = (menuList) => {


   
    const path = this.props.location.pathname

    return menuList.reduce((pre, item) => {
     
      if (!item.children) {
        pre.push(
          <Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Item>
        )
      } else { 
       
        const cItem = item.children.find((cItem, index) => cItem.key===path)
        if (cItem) { 
          this.openKey = item.key
        }

        pre.push(
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes2(item.children)}
          </SubMenu>
        )
      }
      
      return pre
    }, [])
  }


  componentWillMount () {
    this.menuNodes = this.getMenuNodes2(menuList)
  }

  render() {
    
   
    const selectedKey = this.props.location.pathname
    
    const openKey = this.openKey

    return (
      <div className="left-nav">
        <Link to="/home" className="left-nav-header">
          <img src={logo} alt="logo"/>
          <h1>后台管理</h1>
        </Link>

        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[selectedKey]}
          defaultOpenKeys={[openKey]}
        >
          {
            this.menuNodes
          }

          {/* <Item key="/home">
            <Link to="/home">
              <Icon type="home" />
              <span>首页</span>
            </Link>
          </Item>
          
          <SubMenu
            key="/products"
            title={
              <span>
                <Icon type="mail" />
                <span>商品</span>
              </span>
            }
          >
            <Item key="/category">
              <Link to="/category">
                <Icon type="home" />
                <span>分类管理</span>
              </Link>
            </Item>
            <Item key="/product">
              <Link to="/product">
                <Icon type="home" />
                <span>商品管理</span>
              </Link>
            </Item>
          </SubMenu> */}
          
        </Menu>
      </div>
    )
  }
}


export default withRouter(LeftNav)