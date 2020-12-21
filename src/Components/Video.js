import React from "react";

const Video = ({url}) => {
  return (
    <iframe
      title="trailer"
      src={`https://youtube.com/embed/${url}`}
      width="450px"
      height="300px"
    />
  )
}

export default Video;
