import React from 'react';
import styleLoading from './LoadingComponent.module.css'
import {useSelector} from 'react-redux'

export default function LoadingComponent() {

    const {isLoading} = useSelector(state=> state.LoadingReducer)   // phai dung ten trong configStore
    if(isLoading) {
        return (
            <div className={styleLoading.bgLoading}>
                <img src={require('../../../assets/imgLoading/loading.gif')}  />
            </div>
        )
    }else {
        return ''
    }

}

