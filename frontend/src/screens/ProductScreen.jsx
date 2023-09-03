import { useState } from 'react';
import React from 'react'
import { Link, useParams , useNavigate} from 'react-router-dom'
import {Form, Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useGetProductDetailsQuery, } from '../slices/productApiSlice';
import Loader from '../components/Loader';
import { addToCart } from '../slices/cartSlice';
import { useDispatch } from 'react-redux';

const ProductScreen = () => {
    const {id} = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [qty,setQty] = useState(1);

    const addToCartHandler = () => {
        dispatch(addToCart({...product,qty}));
        navigate('/cart');
    };

    const {data: product,isLoading,error} = useGetProductDetailsQuery(id);
    return (
    <>
     <Link className='btn btn-light my-3' to='/'>
        Go Back
     </Link>

        {isLoading? (<Loader/>) : error?(
            <div>{error?.data?.message || error.error}</div>
        ):(
     <Row>
        <Col md={5}>
            <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={4}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Rating value={product.rating} text={product.numReviews}>reviews</Rating>
                </ListGroup.Item>
                <ListGroup.Item>
                    Price: ${product.price}
                </ListGroup.Item>
                
            </ListGroup>
        </Col>
        <Col md={3}>
            <Card>
                <ListGroup>
                    <ListGroup.Item>
                        <Row>
                            <Col>Price:</Col>
                            <Col>
                                <strong>${product.price}</strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                   
                    <ListGroup.Item>
                        <Row>
                            <Col>Status:</Col>
                            <Col>
                                <strong>{product.countInStock>0?'In Stock':'Out of Stock'}</strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    {
                        product.countInStock > 0 && (
                            <ListGroup.Item>
                                <Row>
                                    <Col>Qty</Col>
                                    <Col>
                                        <Form.Control as='select'
                                        value={qty}
                                        onChange={(e)=>setQty(Number(e.target.value))}>
                                        {[...Array(product.countInStock).keys()].map((x) =>
                                            (<option key={x+1} value={x+1}>
                                                {x+1}
                                            </option>   
                                    ))}

                                        </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )
                    }
                    <ListGroup.Item>
                        <Button className='btn-block' type='button'
                        disabled={product.countInStock===0}
                        onClick={addToCartHandler}
                        >Add to Cart</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
     </Row>)}

    </>
  )
}

export default ProductScreen
