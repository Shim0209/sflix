import React from "react";
import HomePresenter from "./HomePresenter";

export default class extends React.Component {
    state = {
        nowPlaying : null,
        upcoming: null,
        popular: null,
        error: null,
        loading: true
    };

    // logic 추가
    // api 가져오기, error 처리

    render() {
        const { nowPlaying, upcoming, popular, error, loading } = this.state;
        return (
            <HomePresenter 
                nowPlaying={nowPlaying} 
                upcoming={upcoming} 
                popular={popular}
                error={error}
                loading={loading}
            />
        )
    }
}