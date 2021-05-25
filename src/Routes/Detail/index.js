import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import Loader from 'Components/Loader';
import Message from 'Components/Message';
import useDetail from 'Routes/Detail/useDetail';

const Container = styled.div`
    height:calc(100vh - 50px);
    width:100%;
    position:relative;
    padding: 50px;
`;
const Content = styled.div`
    width: 100%;
    height: 100%;
    display:flex;
    z-index: 1;
    position:relative;
    overflow: scroll;
`;
const Cover = styled.div`
    width:30%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    height:100%;
    border-radius:5px;
`;
const Data = styled.div`
    width: 70%;
    margin-left:10px;
`;
const Title = styled.h3`
    font-size: 32px;
    margin-bottom: 10px;
`;
const Country = styled.span`

`;
const ItemContainer = styled.div`
    margin:20px 0;
`;
const Item = styled.span``;
const Divider = styled.span`
    margin: 0px 10px;
`;
const Overview = styled.p`
    font-size:13px;
    opacity: 0.8;
    line-height: 1.5;
    width:90%;
`;
const Network = styled.div`
    margin:20px 0px;
`;
const VideoList = styled.ul`
    margin: 20px 0;
    line-height: 1.5;
`;
const VideoObj = styled.li``;
const Linked = styled.a`
    color: rgba(245, 197, 23, 1);
`;
const IMDB = styled.a`
    background-color: rgba(245, 197, 23, 1);
    border: none;
    border-radius:5px;
    padding:3px;
    color:black;
    font-weight:600;
    :hover {
        box-shadow: 1px 0px 10px tomato;
    }
`;
const Backdrop = styled.div`
    position:absolute;
    top:0;
    left:0px;
    width:100%;
    height:100%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    filter:blur(2px);
    opacity:0.5;
    z-index:0;
`;
const SeasonCount = styled.span`
    color: rgba(245, 197, 23, 1);
    border: none;
    border-radius: 5px;
    padding:2px;
`;
const SeasonsTitle = styled.button`
    font-size:15px;
    font-weight:600;
    margin-bottom:5px;
    display: block;
    outline: none;
    border: none;
    border-radius: 5px;
    background-color: black;
    color: white;
    &:hover{
        box-shadow: 1px 0px 10px tomato;
    }
`;
const SeasonsList = styled.span`
    line-height:2;
`;
const MovieMoreDetail = styled.button`
    font-size:15px;
    font-weight:600;
    margin-bottom:5px;
    display: block;
    outline: none;
    border: none;
    border-radius: 5px;
    background-color: black;
    color: white;
    &:hover{
        box-shadow: 1px 0px 10px tomato;
    }
`;

function Detail () {
    const {state:{result, error, loading, isMovie}} = useDetail();
    return (
        <>
            <Helmet>
                <title>Detail | Sflix</title>
            </Helmet>
            {loading ? (
                <Loader />
            ) : (
                <Container>
                    <Helmet>
                        <title>{result.original_title || result.original_name} | Sflix</title>
                    </Helmet>
                    <Backdrop bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`} />
                    <Content>
                        <Cover bgImage={
                                result.poster_path 
                                    ? `https://image.tmdb.org/t/p/original${result.poster_path}` 
                                    : require("../../assets/noPosterSmall.png").default
                                } 
                        />
                        <Data>
                            <Title>{result.original_title ? result.original_title : result.original_name}</Title>
                            <ItemContainer>
                                <Item>{result.release_date ? result.release_date.substring(0, 4) : result.first_air_date.substring(0, 4)}</Item>
                                <Divider>·</Divider>
                                <Item>
                                    {result.runtime ? "Runtime - "+result.runtime : result.number_of_episodes}
                                    {result.runtime ? " min" : " episodes"}
                                </Item>
                                <Divider>·</Divider>
                                <Item>
                                    {result.genres && result.genres.map((genre, index) => 
                                        index === result.genres.length - 1 ? genre.name : `${genre.name} / `
                                    )}
                                </Item>
                                {result.imdb_id && 
                                    <>
                                        <Divider>·</Divider>
                                        <IMDB href={"https://www.imdb.com/title/"+`${result.imdb_id}`} target="_blank">
                                            IDMB
                                        </IMDB>
                                    </>
                                }
                                {result.origin_country ? (<Divider>·</Divider>) : ""}
                                <Country>
                                   {result.origin_country}
                                </Country>
                            </ItemContainer>
                            <Network>
                                {result.networks ? result.networks.map((company, index) => 
                                    index === result.networks.length - 1 ? company.name : `${company.name} / `
                                ) : result.production_companies.map((company, index) => 
                                    index === result.production_companies.length - 1 ? company.name : `${company.name} / `
                                )}
                            </Network>
                            <Overview>{result.overview}</Overview>
                            <VideoList>
                                    {result.videos.results && result.videos.results.map((video, index) => 
                                        <VideoObj key={video.id}>
                                            <Linked href={"https://www.youtube.com/watch?v="+`${video.key}`} target="_blank">
                                                {video.name}
                                            </Linked>
                                        </VideoObj>
                                    )}
                            </VideoList>
                            {result.seasons && (
                                <Link to={`/tv/${result.id}/detail`}>
                                    <SeasonsTitle>Season ▸</SeasonsTitle>
                                </Link>
                            )}
                            {result.seasons &&
                                result.seasons.map((season, index) =>
                                        <SeasonsList key={index}>
                                            {season.name} {season.episode_count < 1 ? "" : (<SeasonCount>({season.episode_count} episodes)</SeasonCount>)}<br />
                                        </SeasonsList>
                            )}
                            {isMovie && (
                                <Link to={`/movie/${result.id}/detail`}>
                                    <MovieMoreDetail>More Detail</MovieMoreDetail>
                                </Link>
                            )}
                        </Data>
                    </Content>
                    {error && <Message color="#e74c3c" text={error} />}
                </Container>
            )}
        </>
    )
}

Detail.propTypes = {
    result: PropTypes.arrayOf(
        PropTypes.shape({
            backdrop_path: PropTypes.string.isRequired,
            poster_path: PropTypes.string,
            genres: PropTypes.string,
            genres: PropTypes.shape({
                name: PropTypes.string
            }),
            overview: PropTypes.string,
            videos: PropTypes.shape({
                results: PropTypes.arrayOf(
                    PropTypes.shape({
                        id: PropTypes.string,
                        key: PropTypes.string,
                        name: PropTypes.string
                    })
                )
            }),
            original_title: PropTypes.string,
            release_date: PropTypes.string,
            runtime: PropTypes.number,
            imdb_id: PropTypes.string,
            networks: PropTypes.string,
            original_name: PropTypes.string,
            first_air_date: PropTypes.string,
            number_of_episodes: PropTypes.string,
            production_companies: PropTypes.string,
            origin_country: PropTypes.string,
            seasons: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string,
                    episode_count: PropTypes.number
                })
            )
        })
    ),
    error: PropTypes.string,
    loading: PropTypes.bool
}

export default Detail;