import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import Loader from 'Components/Loader';
import Section from 'Components/Section';
import Message from 'Components/Message';
import Poster from 'Components/Poster';
import PropTypes from 'prop-types';
import {useEffect ,useState} from 'react';
import { movieApi } from 'api';

const Container = styled.div`
    padding: 20px;
    overflow: scroll;
`;

function Home () {
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

    return (
        <>
            <Helmet>
                <title>Movie | Sflix</title>
            </Helmet>
            {state.loading ? (<Loader />) : (
                <Container>
                    {state.nowPlaying && state.nowPlaying.length > 0 && (
                        <Section title="Now Playing">
                            {state.nowPlaying.map(movie => 
                                <Poster 
                                    key={movie.id} 
                                    id={movie.id} 
                                    imageUrl={movie.poster_path} 
                                    title={movie.original_title} 
                                    rating={movie.vote_average} 
                                    year={movie.release_date && movie.release_date.substring(0,4)} 
                                    isMovie={true} 
                                />
                            )}
                        </Section>
                    )}
                    {state.upcoming && state.upcoming.length > 0 && (
                        <Section title="Popular Movies">
                            {state.upcoming.map(movie => 
                                <Poster 
                                    key={movie.id} 
                                    id={movie.id} 
                                    imageUrl={movie.poster_path} 
                                    title={movie.original_title} 
                                    rating={movie.vote_average} 
                                    year={movie.release_date && movie.release_date.substring(0,4)} 
                                    isMovie={true} 
                                />
                            )}
                        </Section>
                    )}
                    {state.popular && state.popular.length > 0 && (
                        <Section title="Upcoming Movies">
                            {state.popular.map(movie => 
                                <Poster 
                                    key={movie.id} 
                                    id={movie.id} 
                                    imageUrl={movie.poster_path} 
                                    title={movie.original_title} 
                                    rating={movie.vote_average} 
                                    year={movie.release_date && movie.release_date.substring(0,4)} 
                                    isMovie={true} 
                                />
                            )}
                        </Section>
                    )}
                    {state.error && <Message color="#e74c3c" text={state.error} />}
                </Container>
            )}
        </>
    )
}

Home.propTypes = {
    nowPlaying: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            poster_path: PropTypes.string.isRequired,
            original_title: PropTypes.string.isRequired,
            vote_average: PropTypes.number.isRequired,
            release_date: PropTypes.string
        }).isRequired
    ),
    upcoming: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            poster_path: PropTypes.string.isRequired,
            original_title: PropTypes.string.isRequired,
            vote_average: PropTypes.number.isRequired,
            release_date: PropTypes.string
        }).isRequired
    ),
    popular: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            poster_path: PropTypes.string.isRequired,
            original_title: PropTypes.string.isRequired,
            vote_average: PropTypes.number.isRequired,
            release_date: PropTypes.string
        }).isRequired
    ),
    error: PropTypes.string,
    loading: PropTypes.bool
}

export default Home;
