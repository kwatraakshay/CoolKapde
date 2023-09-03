import React from 'react'

import { Col, Container, Row } from 'react-bootstrap'

const Footer = () => {

    const currentYear = new Date().getFullYear();

  return (
    <>
    <Container>
        <Row>
            <Col className='text-center py-3'>
                <p> ProShop &copy; {currentYear}</p>
            </Col>
        </Row>
    </Container>
    </>
  )
}

export default Footer
