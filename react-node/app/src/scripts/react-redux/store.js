import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import reducer from './reducers'

const store = createStore(reducer,applyMiddleware(thunk,promise))

export default store