import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "../../api";

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname }
    } = props;
    this.state = {
      result: null,
      credit: null,
      recommendation: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie/")
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id }
      },
      history: { push }
    } = this.props;
    const { isMovie } = this.state;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
    let result = null;
    let credit = null;
    let recommendation = null;
    let isMovies = false;
    try {
      if (isMovie) {
        ({ data: result } = await moviesApi.movieDetail(parsedId));
        ({ data: credit } = await moviesApi.credits(parsedId));
        ({ data: recommendation } = await moviesApi.recommendations(parsedId));
        isMovies = true;
      } else {
        ({ data: result } = await tvApi.showDetail(parsedId));
        ({ data: credit } = await tvApi.credits(parsedId));
        ({ data: recommendation } = await tvApi.recommendations(parsedId));
      }
    } catch {
      this.setState({ error: "Can't find anything." });
    } finally {
      this.setState({ loading: false, result, credit, recommendation, isMovies });
      // console.log("ddd")
      // console.log(result);
      // console.log(credit);
      console.log(recommendation);
    }
  }

  render() {
    const { result, error, loading, credit, recommendation, isMovies } = this.state;
    return <DetailPresenter result={result} credit={credit} error={error} loading={loading} recommendation={recommendation} isMovies={isMovies} />;
  }
}
