import React, { useEffect, useState } from "react";
import Header from "./reusable_components/Header";
import HeaderBtn from "./reusable_components/Btn";
import Card from "./reusable_components/Card";
import styled from "styled-components";
import Btn from "./reusable_components/Btn";
import Modal from "./Modal";

const Div = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2.5em;
    padding: 5rem;

`

const Shop = () => {
    const [ state, setState ] = useState(null)
    const [ cartState, setCartState ] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () =>{
            const res = await fetch('https://api.escuelajs.co/api/v1/products');
            const data = await res.json()
            setState(data)
        }
        fetchData()
    }, [])

    const handleCartAdd = (product) => {
        setCartState(prevState => {
            const foundIndex = prevState.findIndex(item => item.id === product.id);
    
            if (foundIndex !== -1) {
                const updatedCart = prevState.map((item, index) => {
                    if (index === foundIndex) {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        };
                    }
                    return item;
                });
                return updatedCart;
            } else {
                return [...prevState, { ...product, quantity: 1 }];
            }
        });
    };
    
    const decreaseItemQuantity = (product) => {
        setCartState(prevState => {
            const foundIndex = prevState.findIndex(item => item.id === product.id);
    
            if (foundIndex !== -1) {
                const currentQuantity = prevState[foundIndex].quantity;
                
                if (currentQuantity > 1) {
                    const updatedCart = prevState.map((item, index) => {
                        if (index === foundIndex) {
                            return {
                                ...item,
                                quantity: item.quantity - 1
                            };
                        }
                        return item;
                    });
                    return updatedCart;
                }
            }
            
            return prevState;
        });
    }
    

    const handleCartRemove = (name) => {
        setCartState((state) => state.filter((item) => item.title != name))
    };

    useEffect(() => {
    }, [cartState]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return ( 
        <>
        <Header>
            <HeaderBtn to={"/"}>Home</HeaderBtn>
            <HeaderBtn style={{marginRight: '2rem'}}>Shop</HeaderBtn>
        </Header>

        <Div>
            { state ?
            (state && state.map((element) => (<Card handleCartAdd={() => handleCartAdd(element)} key={element.id} price={element.price} description={element.description} images={element.images} title={element.title}></Card>)))
            : ( <h1>Loading...</h1>)}
        </Div>

        <Btn onClick={openModal} style={{borderRadius: '50%', fontSize:'1.5rem', padding:'1rem', position:'fixed', bottom:'10px' ,right:'12px'}}><i className="fa fa-shopping-cart" aria-hidden="true"></i>
        </Btn>

        {isModalOpen && <Modal decreaseItemQuantity={decreaseItemQuantity} handleCartAdd={handleCartAdd} cartState={cartState} handleCartRemove={handleCartRemove} onClose={closeModal} />}
        </>
    )
}

export default Shop