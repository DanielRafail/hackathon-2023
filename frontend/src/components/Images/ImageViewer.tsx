import styled from "styled-components";
import Widget from "../Widget";
import "react-slideshow-image/dist/styles.css";
import { createRef, useState } from "react";
import { Slide } from "react-slideshow-image";
import React from "react";
import Header from "../Header";

type IProps = {

}

function ImageViewer(props: IProps) {
    const {  } = props;
    const [epics, setEpics] = useState();

    return (
        <Container>
            <Header>#WorkStation</Header>
            <Slide {...properties}>
                {slideImages.map((each, index) => (
                <div key={index} className="each-slide">
                    <ImageSlide className="lazy" src={each} alt="sample" />
                </div>
                ))}
            </Slide>
        </Container>
    );
}

const Container = styled(Widget)`
    height: 100%;
    width: 100%;  
    padding: 15px;
    /* grid-row: 1 / 3; */
`

const ImageSlide = styled.img`
    margin-top: 10px;
    width: 100%;
`


const slideImages = [
    "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1444525873963-75d329ef9e1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
];

const properties = {
    duration: 5000,
    autoplay: true,
    transitionDuration: 500,
    arrows: false,
    infinite: true,
    easing: "ease"
  };

export default ImageViewer;