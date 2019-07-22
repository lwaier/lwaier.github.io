import React,{Component} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom'
import App from './app';
import Add from './add';
import Login from './login';
import Edit from './edit';
import EditUpdate from './editupdate';
import Search from './search';
import AddFenLei from './addfenlei';
import ZiLiao from './mine/ziLiao';


export default class Layout extends Component{
    render(){
        return (
            <div style={{width:'100%',height:'100%'}}>
                <Switch>
                    <Route path="/" exact  render={()=><Redirect to="/index"  />}></Route>
                    <Route path="/index" component={App} ></Route>
                    <Route path="/add" component={Add} ></Route>
                    <Route path="/login" component={Login} />
                    <Route path="/edit" component={Edit} />
                    <Route path="/editupdate" component={EditUpdate} />
                    <Route path="/search" component={Search} />
                    <Route path="/addfenlei" component={AddFenLei} />
                    <Route path="/ziliao" component={ZiLiao} />
                </Switch>
            </div>
        )
    }
} 