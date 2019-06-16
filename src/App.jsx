import React from 'react'
import Admin from './pages/admin/admin.jsx'
import Login from './pages/login/login.jsx'
import {BrowserRouter,Route,Switch} from 'react-router-dom'


export default class App extends React.Component{
  render(){
    return (
     
     <BrowserRouter>
       <Switch>
       <Route path="/login" component={Login}></Route>
       <Route path="/" component={Admin}></Route>       
       </Switch>
     </BrowserRouter>
    )
  }
}