import React from 'react'
import { Col, Row } from 'react-bootstrap'
//import products from '../products'
import { Link, useParams } from 'react-router-dom';
import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';

const HomeScreen = () => {
  const {pageNumber,keyword} = useParams();
  const {data,isLoading,error} = useGetProductsQuery({keyword,pageNumber});
  
  return (
   <>
   {!keyword ? <ProductCarousel/>: ( <Link to='/' className='btn btn-light mb-4'>Go Back</Link>)}
    {isLoading ? (<Loader/>):error?(<Message variant='danger'>
      {
        error?.data?.message || error.error
      }
    </Message>):(
      <>
      <Meta />
      <h1>Latest Products</h1>
       <Row>
        {
            data.products.map((product)=>
            <Col key={product._id} xl={3} lg={4} md={6} sm={6}>
                <Product product={product}/></Col>
            )
        }
       </Row>
       <Paginate
          pages={data.pages}
          page={data.page}
          keyword = {keyword? keyword : ''}></Paginate>
      </>)
    }
      </>
    
  )
}

export default HomeScreen
