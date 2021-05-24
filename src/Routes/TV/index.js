import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import Loader from 'Components/Loader';
import Section from 'Components/Section';
import Message from 'Components/Message';
import Poster from 'Components/Poster';
import PropTypes from 'prop-types';
import useTV from 'Routes/TV/useTV';

const Container = styled.div`
    padding: 20px;
`; 

function TV () {
    const {state:{popular, topRated, airingToday, error, loading}} = useTV();
    return (
        <>
            <Helmet>
                <title>TV | Sflix</title>
            </Helmet>
            {loading ? <Loader /> : 
                <Container>
                    {topRated && topRated.length > 0 && (
                        <Section title="TopRated TV">
                            {topRated.map(tv => 
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
                    {airingToday && airingToday.length > 0 && (
                        <Section title="AiringToday TV">
                            {topRated.map(tv => 
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
                    {popular && popular.length > 0 && (
                        <Section title="Popular TV">
                            {topRated.map(tv => 
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
                    {error && <Message color="#e74c3c" text={error} />}
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