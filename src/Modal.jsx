/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Btn from './reusable_components/Btn';
import CartDiv from './reusable_components/CartDiv';

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    cursor: pointer; 
`;

const ModalContent = styled.div`
    border: 2px solid #BDFFFD;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    max-height: 60%;
    padding: 2rem;
    position: relative;
    width: 80%;
    max-width: 500px;
    cursor: auto; 
    background-color: #282A2C;
    overflow: auto;
`;

const Modal = ({ onClose, cartState, handleCartRemove, handleCartAdd, decreaseItemQuantity }) => {

    const [ totalPrice, setTotalPrice ] = useState(0)

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    useEffect(() => {
        const calculateTotalPrice = () => {
            let sum = 0;
            cartState.forEach((element) => {
                sum += element.price * element.quantity; // Assuming each product has a 'price' and 'quantity' property
            });
            setTotalPrice(sum);
        };

        calculateTotalPrice();

    }, [cartState]);


    return (
        <ModalOverlay onClick={handleOverlayClick}>
            <ModalContent>
                <Btn style={{borderRadius:'50%', border:'none', alignSelf:'flex-end'}} onClick={onClose}><i className="fa fa-times" aria-hidden="true"></i>
                </Btn>
                <div>
                    {cartState[0] ? (cartState.map((element) => (
                        <CartDiv key={crypto.randomUUID()}>
                            <img style={{height:'5rem', borderRadius:'15px'}} src={element.images[0]} alt={element.title} />
                            <div style={{display:'flex', flexDirection:'column', gap:'.5rem', justifyContent:'center'}}>
                                <h3 style={{marginBlock:'0px'}}>{element.title}</h3>
                                <p style={{marginBlock:'0px'}}>${element.price}</p>
                                <div >
                                    <button onClick={()=> decreaseItemQuantity(element)} >-</button>
                                    <input name="quantity" id="quantity"  defaultValue={element.quantity} min={1} style={{width:'40px', backgroundColor:'transparent'}} />
                                    <button style={{marginRight:'.5rem'}} onClick={() => handleCartAdd(element)} >+</button>
                                    <Btn onClick={(e) => handleCartRemove(e.target.parentNode.parentNode.firstChild.innerHTML)} style={{width:'fit-content',padding:'.2rem', fontSize:'.8rem'}}>Remove</Btn>
                                </div>
                            </div>
                        </CartDiv>
                    ))) : (<h2>Your cart is empty...</h2>)}
                </div>
                <h2 style={{width:'fit-content'}}>Total: ${totalPrice}</h2> 
                <Btn style={{width:'fit-content', alignSelf:'end'}}>Checkout</Btn>
            </ModalContent>
        </ModalOverlay>
    );
};

export default Modal;
