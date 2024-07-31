import React from "react";
import Header from "./reusable_components/Header";
import HeaderBtn from "./reusable_components/Btn";
import styled from "styled-components";

const Title = styled.h1`
    font-family: Oswald, sans-serif;
    color: #BDFFFD;
    align-self: center;
`

const Home = () => {
    return (
        <>
        <Header>
            <HeaderBtn>Home</HeaderBtn>
            <HeaderBtn style={{marginRight: '2rem'}} to={"/shop"}>Shop</HeaderBtn>
        </Header>
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'90vh'}}>

        <Title>Shop your needs.</Title>
        </div>
        </>
     )
}

export default Home