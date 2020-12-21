import React from "react";
import styled from "styled-components";

const Container = styled.div`
  font-size: 12px;
`;

const Image = styled.div`
  background-image: url(${props => props.bgUrl});
  height: 180px;
  background-size: cover;
  border-radius: 4px;
  background-position: center center;
  transition: opacity 0.1s linear;
`;

const ImageContainer = styled.div`
  margin-bottom: 5px;
  position: relative;
  &:hover {
    ${Image} {
      opacity: 0.3;
    }
  }
`;

const Title = styled.span`
  display: block;
  margin-bottom: 3px;
`;
const Crews = ({name, profile_path, job }) => {
  return (
    <Container>
      <ImageContainer>
        <Image
          bgUrl={
            profile_path
              ? `https://image.tmdb.org/t/p/w200${profile_path}`
              : require("../assets/noPosterSmall.png")
          }
        />
      </ImageContainer>
      <Title>
        {job.length > 16 ? `${job.substring(0, 16)}...` : job}
      </Title>
      <Title>
        {name.length > 16 ? `${name.substring(0, 16)}...` : name}
      </Title>
    </Container>
  )
}

export default Crews;
