import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import Loader from 'Components/Loader';
import Section from 'Components/Section';
import Message from 'Components/Message';
import Poster from 'Components/Poster';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import { tvApi } from 'api';

const Container = styled.div`
    padding: 20px;
`; 

function TV () {
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

    return (
        <>
            <Helmet>
                <title>TV | Sflix</title>
            </Helmet>
            {state.loading ? <Loader /> : 
                <Container>
                    {state.topRated && state.topRated.length > 0 && (
                        <Section title="TopRated TV">
                            {state.topRated.map(tv => 
                                <Poster 
                                    key={tv.id} 
                                    id={tv.id} 
                                    imageUrl={tv.poster_path} 
                                    title={tv.original_name} 
                                    rating={tv.vote_average} 
                                    year={tv.first_air_date && tv.first_air_date.substring(0,4)} 
                                    isMovie={false} 
                                />
                            )}
                        </Section>
                    )}
                    {state.airingToday && state.airingToday.length > 0 && (
                        <Section title="AiringToday TV">
                            {state.topRated.map(tv => 
                                <Poster 
                                    key={tv.id} 
                                    id={tv.id} 
                                    imageUrl={tv.poster_path} 
                                    title={tv.original_name} 
                                    rating={tv.vote_average} 
                                    year={tv.first_air_date && tv.first_air_date.substring(0,4)} 
                                    isMovie={false} 
                                />
                            )}
                        </Section>
                    )}
                    {state.popular && state.popular.length > 0 && (
                        <Section title="Popular TV">
                            {state.topRated.map(tv => 
                                <Poster 
                                    key={tv.id} 
                                    id={tv.id} 
                                    imageUrl={tv.poster_path} 
                                    title={tv.original_name} 
                                    rating={tv.vote_average} 
                                    year={tv.first_air_date && tv.first_air_date.substring(0,4)} 
                                    isMovie={false} 
                                />
                            )}
                        </Section>
                    )}
                    {state.error && <Message color="#e74c3c" text={state.error} />}
                </Container>
            };
        </>
    )
}

TV.propTypes = {
    popular:PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            poster_path: PropTypes.string.isRequired,
            original_name: PropTypes.string.isRequired,
            vote_average: PropTypes.number.isRequired,
            first_air_date: PropTypes.string 
        }).isRequired
    ),
    topRated:PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            poster_path: PropTypes.string.isRequired,
            original_name: PropTypes.string.isRequired,
            vote_average: PropTypes.number.isRequired,
            first_air_date: PropTypes.string 
        }).isRequired
    ),
    airingToday:PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            poster_path: PropTypes.string.isRequired,
            original_name: PropTypes.string.isRequired,
            vote_average: PropTypes.number.isRequired,
            first_air_date: PropTypes.string 
        }).isRequired
    ),
    error:PropTypes.string,
    loading:PropTypes.bool
}

export default TV;