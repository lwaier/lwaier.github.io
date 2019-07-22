import React, {Component} from 'react'
import SearchHeader from '../../components/header/searchHead';
import SearchLan from '../../components/searchLan';


export default class Search extends Component {
    
    render(){
        return (
            <div>
                <SearchHeader/>
                <SearchLan/>
            </div>

        )
    }
}