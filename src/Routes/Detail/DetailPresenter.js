import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Video from "Components/Video";
import ProductionCompanies from "Components/ProductionCompanies"
import Casts from "Components/Casts"
import Crews from "Components/Crews"
import Seasons from "Components/Seasons"
import Recommendation from "Components/Recommendation"

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 70%;
  margin-bottom: 20px;
`;
const IMDB = styled.a`
  color:red;
  font-weight:600;
`;

const ScrollList = styled.div`
  display:flex;
  flex-wrap: no-wrap;
  overflow-x: scroll;
  overflow-y: hidden;
  margin: 20px 0;
  width: 80%;
`;

const VideoCard = styled.div`
  width: 450px;
  height: 300px;
  flex: 0 0 auto;
  margin: 0 20px;
`;

const CompanyCard = styled.div`
  width: 120px;
  height: 200px;
  flex: 0 0 auto;
  margin: 0 20px;
`;

const CastsCard = styled.div`
  width: 120px;
  height: 215px;
  flex: 0 0 auto;
  margin: 0 20px;
`;


const DetailPresenter = ({ result, loading, credit, recommendation, isMovies, error }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Nomflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]} min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            <Divider>•</Divider>
            <Item>
              <IMDB
                href={`https://www.imdb.com/title/${result.imdb_id}`}
                target="_blank"
              >IMDB</IMDB>
            </Item>
          </ItemContainer>
          <Overview>{result.overview}</Overview>

          {result.videos && result.videos.results.length ?
          <>
            <Title>Video ({result.videos.results.length})</Title>
            <ScrollList>
                {result.videos.results.map((v) => (
                  <VideoCard key={v.key}>
                    <Video key={v.key} url={v.key} />
                  </VideoCard>
                ))}
            </ScrollList>
          </>
          : null }
          
          {credit.cast && credit.cast.length ?
          <>
            <Title>Casts ({credit.cast.length})</Title>
            <ScrollList>
                { credit.cast.map((cast) => (
                  <CastsCard key={cast.credit_id}>
                    <Casts name={cast.name} profile_path={cast.profile_path}/>
                  </CastsCard>
                )) }
            </ScrollList>
          </>
          : null }

          {credit.crew && credit.crew.length ?
          <>
            <Title>Crews ({credit.crew.length})</Title>
            <ScrollList>
                {credit.crew.map((crew) => (
                  <CastsCard key={crew.credit_id}>
                    <Crews name={crew.name} profile_path={crew.profile_path} job={crew.job} />
                  </CastsCard>
                )) }
            </ScrollList>
          </>
          : null }

          { result.production_companies.length ? 
            <>
              <Title>Production Companies ({result.production_companies.length})</Title>
              <ScrollList>
                  {result.production_companies.map((com) => (
                    <CompanyCard key={com.id}>
                      <ProductionCompanies name={com.name} img={com.logo_path} />
                    </CompanyCard>
                  ))}
              </ScrollList>
            </>
          : null }


          { result.seasons && result.seasons.length ? 
            <>
              <Title>Seasons ({result.seasons.length})</Title>
              <ScrollList>
                  {result.seasons.map((season) => (
                    <CompanyCard key={season.id}>
                      <Seasons name={season.name} img={season.poster_path} />
                    </CompanyCard>
                  ))}
              </ScrollList>
            </>
          : null }

          {
            recommendation.results.length ? 
            <>
              <Title>Recommendation</Title>
              <ScrollList>
                  {recommendation.results.map((recommed) => (
                    <CompanyCard key={recommed.id}>
                      <>
                        { 
                          isMovies ? <Recommendation name={recommed.original_title} img={recommed.backdrop_path} id={recommed.id}/>
                          : <Recommendation name={recommed.name} img={recommed.backdrop_path} id={recommed.id}/>
                        }
                      </>
                    </CompanyCard>
                  ))}
              </ScrollList>
            </>
          : null }
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  credit: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  isMovies: PropTypes.bool
};

export default DetailPresenter;
