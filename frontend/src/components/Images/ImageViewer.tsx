import styled from "styled-components";
import Widget from "../Widget";
import "react-slideshow-image/dist/styles.css";
import { createRef, useEffect, useState } from "react";
import { Slide } from "react-slideshow-image";
import React from "react";
import Header from "../Header";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Socket } from "socket.io-client";

type IProps = {
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined;
};

function ImageViewer(props: IProps) {
  const { socket } = props;
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (socket) {
      socket.on("WorkFromHomeImages", (data: string[]) => {
        setImages(data);
      });
    }
  }, [socket]);

  return (
    <Container>
      <Header>#WorkStation</Header>
      <Slide {...properties}>
        {images.map((each, index) => (
          <EachSlide key={index} className="each-slide">
            <ImageSlide className="lazy" src={each} alt="sample" />
          </EachSlide>
        ))}
      </Slide>
    </Container>
  );
}

const Container = styled(Widget)`
  height: 100%;
  width: 100%;
  padding: 15px;
  grid-row: 6 / 11;
`;

const ImageSlide = styled.img`
  margin-top: 10px;
  max-width: 100%;
  max-height: 330px;
`;

const EachSlide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const properties = {
  duration: 5000,
  autoplay: true,
  transitionDuration: 500,
  arrows: false,
  infinite: true,
  easing: "ease",
};

export default ImageViewer;
