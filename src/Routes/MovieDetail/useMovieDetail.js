import {useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {movieApi} from 'api';

const useMovieDetail = () => {
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
    console.log('moviedetail id', id);
    useEffect(checkId, []);
    let result = null;
    const getData = async () => {
        try{
            ({data: result} = await movieApi.movieDetail(id));
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

export default useMovieDetail;