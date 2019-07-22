import React from 'react';
import ReactDOM ,{render}from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './styles/index.scss';
import store from './scripts/react-redux/store'


const hotRender = ()=>{
    render(
        <App />, document.getElementById('root')
    )
}

hotRender()

store.subscribe(hotRender)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
