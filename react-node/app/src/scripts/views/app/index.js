
import React, {Component} from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import GuoKe from '../guoke';
import Mine from '../mine';
import RiJi from '../riji';
import Foot from '../../components/foot';

import "./index.scss"




export default class App extends Component {
    render(){
        return (
            <div>
                
                <Switch>
                    <Route path="/index/riji" component={RiJi} />
                    <Route path="/index/guoke" component={GuoKe} />
                    <Route path="/index/mine" component={Mine} />
                    <Route render={
                        ()=>{
                            return <Redirect to="/index/riji" />
                        }
                    } />
                </Switch>
                <div className="footFu">
                    <Foot></Foot>
                </div>
            </div>
        )
    }
}