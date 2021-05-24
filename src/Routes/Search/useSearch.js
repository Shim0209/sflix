import React, {useEffect, useState, useRef} from 'react';
import { tvApi, movieApi } from 'api';

const useSearch = () => {
    const [state, setState] = useState({
        movieResults: null,
        tvResults: null,
        searchTerm: "",
        error: null,
        loading: false
    });

    const handleSubmit = event => {
        event.preventDefault();
        if(state.searchTerm !== "") {
            searchByTerm();
        }
    }

    const onChange = (event) => {
        setState({
            ...state,
            searchTerm: event.target.value
        })
        console.log('searchTerm', state.searchTerm);
    }

    const searchByTerm = async() => {
        try {
            const { data : { results: movieResults } } = await movieApi.search(state.searchTerm);
            const { data : { results: tvResults } } = await tvApi.search(state.searchTerm);
            setState({
                ...state,
                movieResults,
                tvResults,
                location: false
            })
        } catch {
            setState({
                ...state,
                error: "Can't find results.",
                location: false
            })
        }   
    }
    return {state, handleSubmit, onChange};
}

export default useSearch;
