import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import {Link} from 'react-router-dom';
import Loader from 'Components/Loader';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {movieApi} from 'api';

const Modal = styled.div`
    width: 100%;
    height: calc(100vh - 50px);
    top: 50px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
`;
const Container = styled.div`
    width: 50%;
    opacity: 1;
    background-color: rgba(1, 1, 1, 0.8);
    color: white;
    border-radius: 20px;
    padding: 20px;
    overflow: scroll;
`;
const Title = styled.div`
    text-align: center;
    font-size: 30px;
    margin-bottom: 10px;
    color: tomato;
`;
const Homepage = styled.a`
    font-size: 18px;
`;
const ProductionBlock = styled.div`
    text-align: center;
    font-size: 20px;
    color: tomato;
    margin-top: 15px;
`;
const Production = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    padding: 5px;
    gap: 5px;
    margin-bottom: 15px;
`;
const ProductionItem = styled.div`
    color: black;
    background-color: rgba(255, 255, 255);
    text-align: center;
    padding: 3px 0;
    border-radius: 10px;
`;
const ProductionImg = styled.img`
    height: 20px;
`;
const ProductionName = styled.div``;
const ProductionCountry = styled.div`
    font-size: 18px;
    margin-bottom: 10px;
`;
const ProductionCompanyCountry = styled.div`
`;

function MovieDetail () {
    const {id} = useParams();
    const {push} = useHistory();    
    const [state, setState] = useState({
        result: null,
        error: null,
        loading: true
    })
    const checkId = () => {
        if(isNaN(id)){
            return push("/");
        }
    }
    useEffect(checkId, []);
    let result = null;
    const getData = async () => {
        try{
            ({data: result} = await movieApi.movieDetail(id));
            setState({
                ...state,
                result,
                loading: false
            })
        } catch {
            setState({
                ...state,
                error: "Can't find anything",
                loading: false
            })
        }
    }
    useEffect(getData, []);

    return (
        
        <Modal>
            <Helmet>
                <title>Movie Detail | Sflix</title>
            </Helmet>
            {state.loading ? (<Loader />) : (
                <Container>
                    <Link to={`/movie/${state.result.id}`}>
                        <Title>{state.result.original_title ? state.result.original_title : "" }</Title>
                        <ProductionCountry>ProductionCountry :&nbsp;
                        {state.result.production_countries && state.result.production_countries.map((country, index) => 
                            index === state.result.production_countries.length -1 ? country.name : `${country.name}, `
                        )}
                        </ProductionCountry>
                        <Homepage href={state.result.homepage && state.result.homepage}>Homepage :&nbsp;
                        {state.result.homepage ? state.result.homepage : "null"}
                        </Homepage>

                        <ProductionBlock>Production Company</ProductionBlock>
                        <Production>
                        {state.result.production_companies ? state.result.production_companies.map((company) => 
                            <ProductionItem key={company.id}>
                                <ProductionImg src={
                                        company.logo_path 
                                        ? `https://image.tmdb.org/t/p/original${company.logo_path}`
                                        : "https://cdn4.vectorstock.com/i/1000x1000/50/73/s-letter-logo-design-letter-s-design-s-logo-vector-28025073.jpg"
                                } />
                                <ProductionName>{company.name}</ProductionName>
                                <ProductionCompanyCountry>{company.origin_country}</ProductionCompanyCountry>
                            </ProductionItem>
                        ) : "null"}
                        </Production>
                    </Link>  
                </Container>
            )}
        </Modal>
          
    )
}

MovieDetail.propTypes = {
    result:PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            original_title: PropTypes.string.isRequired,
            homepage: PropTypes.string,
            production_countries:PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string
                })
            ),
            production_companies:PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string,
                    logo_path: PropTypes.string,
                    name: PropTypes.string,
                    origin_country: PropTypes.string
                })
            ) 
        })
    )
}

export default MovieDetail;