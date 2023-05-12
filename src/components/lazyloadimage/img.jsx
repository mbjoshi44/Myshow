/* eslint-disable react/prop-types */
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function Img({ image, className }) {
    return (
        <LazyLoadImage
            className={className || ""}
            alt=""
            effect="blur"
            src={image.src} />
    );
}

export default Img;