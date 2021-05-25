import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import {Link} from 'react-router-dom';
import Loader from 'Components/Loader';
import PropTypes from 'prop-types';
import useTVDetail from 'Routes/TVDetail/useTVDetail';

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
    height: 90%;
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
const Director = styled.div`
    font-size: 18px;
    display: flex;
    margin-bottom: 10px;
`;
const Homepage = styled.a`
    font-size: 18px;
`;
const DirectorItem = styled.div``;
const BrodcatBlock = styled.div`
    text-align: center;
    font-size: 20px;
    color: tomato;
    margin-top: 15px;
`;
const Brodcast = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    padding: 5px;
    gap: 5px;
    margin-bottom: 15px;
`;
const BrodcastItem = styled.div`
    color: black;
    background-color: rgba(255, 255, 255);
    text-align: center;
    padding: 3px 0;
    border-radius: 10px;
`;
const BrodcastImg = styled.img`
    height: 20px;
`;
const BrodcastName = styled.div``;
const OriginCountry = styled.div`
    font-size: 18px;
    margin-bottom: 10px;
`;
const SeasonBlock = styled.div`
    text-align: center;
    font-size: 20px;
    color: tomato;
`;
const Season = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    padding: 5px;
    gap: 5px;
    margin-bottom: 15px;
`;
const SeasonItem = styled.div`
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
    border-radius: 10px;
`;
const SeasonPoster = styled.img`
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    width: 100%;
`;
const SeasonName = styled.div`
    text-align: center;
    font-size: 15px;
`;
const SeasonInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
const SeasonDate = styled.div`
`;
const SeasonCount = styled.div`
`;

function TVDetail () {
    const {state:{result, error, loading}} = useTVDetail();
    return (
        <Modal>
            <Helmet>
                <title>TV Detail | Sflix</title>
            </Helmet>
            {loading ? (<Loader />) : (
                <Container>
                    <Link to={`/tv/${result.id}`}>
                        <Title>{result.original_name ? result.original_name : "" }</Title>
                        <Director>CreateBy&nbsp;
                        {result.created_by && result.created_by.map(( director, index) => 
                            index === result.created_by.length-1 
                            ? <DirectorItem key={director.id}>{director.name}</DirectorItem> 
                            : <DirectorItem key={director.id}>{`${director.name},`}&nbsp;</DirectorItem>
                        )}
                        {result.created_by.length < 1 ? <DirectorItem>null</DirectorItem> : ""} 
                        </Director>
                        <OriginCountry>OriginCountry :&nbsp;
                        {result.origin_country}
                        </OriginCountry>
                        <Homepage href={result.homepage && result.homepage}>Homepage :&nbsp;
                        {result.homepage ? result.homepage : "null"}
                        </Homepage>
                        <BrodcatBlock>Brodcast Station</BrodcatBlock>
                        <Brodcast>
                        {result.networks ? result.networks.map((company) => 
                            <BrodcastItem key={company.id}>
                                <BrodcastImg src={`https://image.tmdb.org/t/p/original${company.logo_path}`} />
                                <BrodcastName>{company.name}</BrodcastName>
                            </BrodcastItem>
                        ) : "null"}
                        </Brodcast>
                        <SeasonBlock>Season</SeasonBlock>
                        <Season>
                        {result.seasons ? result.seasons.map((season) => 
                            <SeasonItem key={season.id}>
                                <SeasonName>{season.name}</SeasonName>
                                <SeasonInfo>
                                    <SeasonDate>First_air_date:
                                    {season.air_date}</SeasonDate>
                                    <SeasonCount>Episode Count:
                                        {season.episode_count}
                                    </SeasonCount>
                                </SeasonInfo>
                                <SeasonPoster src={
                                    season.poster_path 
                                    ? `https://image.tmdb.org/t/p/original${season.poster_path}`
                                    : require("../../assets/noPosterSmall.png").default
                                    } 
                                />
                            </SeasonItem>
                        ) : "null"}
                        </Season>
                    </Link>  
                </Container>
            )}
        </Modal>
    )
}

TVDetail.prototype = {
    result:PropTypes.arrayOf(
        PropTypes.shape({
            id:PropTypes.string.isRequired,
            original_name: PropTypes.string.isRequired,
            created_by:PropTypes.arrayOf(
                PropTypes.shape({
                    id:PropTypes.string,
                    name:PropTypes.string
                })
            ),
            origin_country:PropTypes.string,
            homepage:PropTypes.string,
            networks:PropTypes.arrayOf(
                PropTypes.shape({
                    id:PropTypes.string,
                    logo_path:PropTypes.string,
                    name:PropTypes.string
                })
            ),
            seasons:PropTypes.arrayOf(
                PropTypes.shape({
                    id:PropTypes.string,
                    name:PropTypes.string,
                    air_date:PropTypes.string,
                    episode_count:PropTypes.string,
                    poster_path:PropTypes.string
                })
            )
        })
    )
}

export default TVDetail;