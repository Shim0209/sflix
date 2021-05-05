import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";

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

const ItemContainer = styled.div`
    margin:20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
    margin: 0px 10px;
`;

const Overview = styled.p`
    font-size:12px;
    opacity: 0.7;
    line-height: 1.5;
    width:50%;
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

const DetailPresenter = ({ result, error, loading }) => (
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
                        </ItemContainer>
                        <Overview>{result.overview}</Overview>
                    </Data>
                </Content>
            </Container>
        )}
    </>
);

DetailPresenter.propTypes = {
    result: PropTypes.object,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired
}

export default DetailPresenter;