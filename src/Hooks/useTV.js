import React, {useEffect, useState} from 'react';
import { tvApi } from '../api';

const useTV = () => {
    const [state, setState] = useState({
        popular: null,
        topRated: null,
        airingToday: null,
        error: null,
        loading: true
    });

    const getData = async () => {
        try {
            const { data: { results: popular } } = await tvApi.popular();
            const { data: { results: topRated } } = await tvApi.topRated();
            const { data: { results: airingToday } } = await tvApi.airingToday();
            setState({
                ...state,
                popular,
                topRated,
                airingToday,
                loading:false
            })
        } catch {
            setState({
                ...state,
                error: "Can't find TV information.",
                loading:false
            })
        }
    }

    useEffect(getData, []);

    return {state};
}

export default useTV;
