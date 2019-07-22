import {combineReducers} from 'redux'
import userReducer from './user'
import dataReducer  from './data'

const reducer = combineReducers({
    userReducer,
    dataReducer
})

export default reducer