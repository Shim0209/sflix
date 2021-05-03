import React from "react";
import TVPresenter from "./TVPresenter";

export default class extends React.Component {
    state = {
        popular: null,
        topRated: null,
        airingToday: null,
        error: null,
        loading: true
    };

    // logic 추가
    // api 가져오기, error 처리

    render() {
        const { popular, topRated, airingToday, error, loading } = this.state;
        return (
            <TVPresenter 
                popular={popular}
                topRated={topRated}
                airingToday={airingToday}
                error={error}
                loading={loading}
            />
        )
    }
}