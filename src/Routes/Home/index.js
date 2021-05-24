import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import Loader from 'Components/Loader';
import Section from 'Components/Section';
import Message from 'Components/Message';
import Poster from 'Components/Poster';
import PropTypes from 'prop-types';
import useHome from 'Routes/Home/useHome';

const Container = styled.div`
    padding: 20px;
`;

function Home () {
    const {state:{nowPlaying, upcoming, popular, error, loading}} = useHome();
    return (
        <>
            <Helmet>
                <title>Movie | Sflix</title>
            </Helmet>
            {loading ? (<Loader />) : (
                <Container>
                    {nowPlaying && nowPlaying.length > 0 && (
                        <Section title="Now Playing">
                            {nowPlaying.map(movie => 
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
                    {upcoming && upcoming.length > 0 && (
                        <Section title="Popular Movies">
                            {upcoming.map(movie => 
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
                    {popular && popular.length > 0 && (
                        <Section title="Upcoming Movies">
                            {popular.map(movie => 
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
                    {error && <Message color="#e74c3c" text={error} />}
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
