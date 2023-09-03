import React from 'react'
import { Col, Row } from 'react-bootstrap'
//import products from '../products'
import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomeScreen = () => {

  const {data:products,isLoading,error} = useGetProductsQuery();

  return (
   <>
    {isLoading ? (<Loader/>):error?(<Message variant='danger'>
      {
        error?.data?.message || error.error
      }
    </Message>):(
      <>
      <h1>Latest Products</h1>
       <Row>
        {
            products.map((product)=>
            <Col key={product._id} xl={3} lg={4} md={6} sm={6}>
                <Product product={product}/></Col>
            )
        }
       </Row>
      </>)
    }
      </>
    
  )
}

export default HomeScreen
