import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "Components/Section";
import Loader from "Components/Loader";

const Container = styled.div`
    padding: 0px 10px;
`;

const TVPresenter = ({ popular, topRated, airingToday, error, loading }) => loading ? <Loader /> : 
    <Container>
        {topRated && topRated.length > 0 && (
            <Section title="TopRated TV">
                {topRated.map(tv => <span key={tv.id}>{tv.name}</span>)}
            </Section>
        )}
        {airingToday && airingToday.length > 0 && (
            <Section title="AiringToday TV">
                {airingToday.map(tv => <span key={tv.id}>{tv.name}</span>)}
            </Section>
        )}
        {popular && popular.length > 0 && (
            <Section title="Popular TV">
                {popular.map(tv => <span key={tv.id}>{tv.name}</span>)}
            </Section>
        )}
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