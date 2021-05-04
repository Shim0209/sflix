import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "Components/Section";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster";

const Container = styled.div`
    padding: 0px 20px;
`;

const TVPresenter = ({ popular, topRated, airingToday, error, loading }) => loading ? <Loader /> : 
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
;

TVPresenter.propTypes = {
    popular:PropTypes.array,
    topRated:PropTypes.array,
    airingToday:PropTypes.array,
    error:PropTypes.string,
    loading:PropTypes.bool.isRequired
}

export default TVPresenter;