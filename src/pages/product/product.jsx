import React, { Component } from 'react'

import {Switch,Route,Redirect} from 'react-router-dom'

import AddUpdate from './add-update.js'
import ProductDetail from './product-detail'
import ProductHome from './product-home'
/**
 * 商品管理
 */
export default class Product extends Component {
  render() {
    return (
          <Switch>
            <Route exact path="/product" component={ProductHome}/>
            <Route path="/product/detail" component={ProductDetail}/>
            <Route path="/product/addupdate" component={AddUpdate}/>
            <Redirect to="/product"/>
          </Switch>  
    
    )
  }
}
