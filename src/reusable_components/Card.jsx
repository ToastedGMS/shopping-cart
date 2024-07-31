/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Btn from "./Btn";

const Div = styled.div`
    border: 2px solid #BDFFFD;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 1rem;
    height: max-content;
    text-align: center;
`
const Img = styled.img`
    border-radius: 15px;
    max-width: 90%;
`

const Card = ({images, title, description, price, handleCartAdd}) => {

    const [ currentIndex, setNewIndex ] = useState(0)
    const [ hoverState, setHoverState ] = useState(false)

    useEffect(() => {
        let i = setInterval(() => {
            if (hoverState) { 
            setNewIndex((prevIndex) => (prevIndex +1) % images.length)}
        }, 800)
        return () => clearInterval(i)
    }, [hoverState, images.length])

    const handleMouseEnter = () => {
        setHoverState(true);
        handleMouseOver(0);
    };

    const handleMouseLeave = () => {
        setHoverState(false);
    };

    const handleMouseOver = () => {
        setNewIndex(0)
    }

    return (
        <>
        <Div>
            <Img onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} alt={title} src={images[currentIndex]}></Img>
            <h2>{title}</h2>
            <p>{description}</p>
            <h3>${price}</h3>
            <Btn onClick={handleCartAdd}>Add to cart</Btn>
        </Div>
        </>
    )
}

export default Card