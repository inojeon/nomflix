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
const Seasons = ({name, img }) => {
  return (
    <Container>
      <ImageContainer>
        <Image
          bgUrl={
            img
              ? `https://image.tmdb.org/t/p/w200${img}`
              : require("../assets/noPosterSmall.png")
          }
        />
      </ImageContainer>
      <Title>
        {name.length > 16 ? `${name.substring(0, 16)}...` : name}
      </Title>
    </Container>
  )
}

export default Seasons;


