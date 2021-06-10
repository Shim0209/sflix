import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Section from "Components/Section";
import Message from "Components/Message";
import Poster from "Components/Poster";
import {useState} from 'react';
import { tvApi, movieApi } from 'api';

const Container = styled.div`
    padding:20px;
`;
const Form = styled.form`
    margin-bottom: 50px;
    width:100%;
`;
const Input = styled.input`
    all: unset;
    font-size: 28px;
    width:100%;
`;

function Search () {
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

    return(
        <>
            <Helmet>
                <title>Search | Sflix</title>
            </Helmet>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Input placeholder="Search Movies or TV Shows..." value={state.searchTerm} onChange={onChange}></Input>
                </Form>
                {state.loading ? (<Loader />) : (
                    <>
                        {state.movieResults && state.movieResults.length > 0 && (
                            <Section title="Movie Results">
                                {state.movieResults.map(movie => (
                                    <Poster 
                                        key={movie.id} 
                                        id={movie.id} 
                                        imageUrl={movie.poster_path} 
                                        title={movie.original_title} 
                                        rating={movie.vote_average} 
                                        year={movie.release_date && movie.release_date.substring(0,4)} 
                                        isMovie={true} 
                                    />
                                ))}
                            </Section>
                        )}
                        {state.tvResults && state.tvResults.length > 0 && (
                            <Section title="TV Results">
                                {state.tvResults.map(tv => (
                                    <Poster 
                                        key={tv.id} 
                                        id={tv.id} 
                                        imageUrl={tv.backdrop_path} 
                                        title={tv.original_name} 
                                        rating={tv.vote_average} 
                                        year={tv.first_air_date && tv.first_air_date.substring(0,4)} 
                                        isMovie={false} 
                                    />
                                ))}
                            </Section>
                        )}
                        {state.error && <Message color="#e74c3c" text={state.error} />}
                        {state.movieResults && state.tvResults && state.tvResults.length < 1 && state.movieResults < 1 && 
                            <Message text="Nothing found" color="#95a5a6" />
                        }
                    </>
                )}
            </Container>
        </>
    )
}

export default Search;