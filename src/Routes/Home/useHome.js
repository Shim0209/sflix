import {useEffect ,useState} from 'react';
import { movieApi } from 'api';

const useHome = () => {
    const [state, setState] = useState({
        nowPlaying : null,
        upcoming: null,
        popular: null,
        error: null,
        loading: true
    });

    const getData = async () => {
        try {
            const { data: { results: nowPlaying } } = await movieApi.nowPlaying();
            const { data: { results: upcoming } } = await movieApi.upcoming();
            const { data: { results: popular } } = await movieApi.popular();
            setState({
                ...state,
                nowPlaying,
                upcoming,
                popular,
                loading:false
            })

        } catch(e) {
            setState({
                ...state,
                error: "Can't find movies information",
                loading: false
            })
        }
    }

    useEffect(getData, []);
    return {state};
}

export default useHome;
