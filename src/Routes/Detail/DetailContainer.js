import { movieApi, tvApi } from "api";
import React from "react";
import DetailPresenter from "./DetailPresenter";

export default class extends React.Component {
    constructor(props) {
        super(props);
        const { location: { pathname } } = props;
        this.state = {
            result: null,
            error: null,
            loading: true,
            isMovie: pathname.includes("/movie/")
        };
    }
    
    // logic 추가
    // api 가져오기, error 처리
    async componentDidMount() {
        const { match: { params: { id } }, history: { push } } = this.props;
        const { isMovie } = this.state;
        const parsedId = parseInt(id);
        if(isNaN(parsedId)) {
            return push("/");
        }
        let result = null;

        try{
            if(isMovie) {
                ({data: result} = await movieApi.movieDetail(parsedId));
            } else {
                ({data: result} = await tvApi.tvDetail(parsedId));
            }
            
        } catch {
            this.setState({
                error: "Can's find anything."
            });

        } finally {
            this.setState({
                loading: false, result
            });

        }
    }

    render() {
        const { result, error, loading } = this.state;
        console.log(this.state);
        return (
            <DetailPresenter 
                result={result}
                error={error}
                loading={loading}
            />
        )
    }
}