import React, {useEffect, useState} from 'react';
import {useLocation, useParams, useHistory} from 'react-router-dom';
import {tvApi} from 'api';

const useSeason = () => {
    const {id} = useParams();
    const {push} = useHistory();    
    const [state, setState] = useState({
        result: null,
        error: null,
        loading: true
    })
    console.log('tvdetail id', id);
    const checkId = () => {
        if(isNaN(id)){
            return push("/");
        }
    }
    useEffect(checkId, []);
    let result = null;
    const getData = async () => {
        try{
            ({data: result} = await tvApi.tvDetail(id));
            setState({
                ...state,
                result,
                loading: false
            })
        } catch {
            setState({
                ...state,
                error: "Can't find anything",
                loading: false
            })
        }
    }
    useEffect(getData, []);
    return {state};
}

export default useSeason;