import React, {useEffect, useState} from 'react';
import {useLocation, useParams, useHistory} from 'react-router-dom';
import { tvApi, movieApi } from '../api';

const useDetail = () => {
    const {pathname} = useLocation();
    const {id} = useParams();
    const {push} = useHistory();    
    const [state, setState] = useState({
        result: null,
        error: null,
        loading: true,
        isMovie: pathname.includes("/movie/")
    })

    let result = null;
    const getData = async () => {
        try{
            if(state.isMovie) {
                ({data: result} = await movieApi.movieDetail(id));
            } else {
                ({data: result} = await tvApi.tvDetail(id));
            }
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
    const checkId = () => {
        if(isNaN(id)){
            return push("/");
        }
    }
    useEffect(checkId, []);
    useEffect(getData, []);
    return {state};
}

export default useDetail;
