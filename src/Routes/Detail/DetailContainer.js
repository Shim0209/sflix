import React from "react";
import DetailPresenter from "./DetailPresenter";

export default class extends React.Component {
    state = {
        result: null,
        error: null,
        loading: true
    };

    // logic 추가
    // api 가져오기, error 처리

    render() {
        const { result, error, loading } = this.state;
        return (
            <DetailPresenter 
                result={result}
                error={error}
                loading={loading}
            />
        )
    }
}