import styled from "styled-components";
import { Link } from "react-router-dom";

const Btn = styled(Link)`
    background-color: transparent;
    border-radius: 5px;
    border: 2px solid #BDFFFD;
    text-decoration: none;
    color: #BDFFFD;
    font-size: 1.2rem;
    padding: .5rem;
    &:hover{color:#6ABEA7; border-color:#6ABEA7;}
`
export default Btn