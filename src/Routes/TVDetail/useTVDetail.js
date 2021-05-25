import {useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {tvApi} from 'api';

const useTVDetail = () => {
    const {id} = useParams();
    const {push} = useHistory();    
    const [state, setState] = useState({
        result: null,
        error: null,
        loading: true
    }) 
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

export default useTVDetail;