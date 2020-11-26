import React from 'react'

const ProductList = ({ products, category, brand }) => {

    const updatedProducts = [...products]


    return (
        <>
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
        </>
    )
}

export default ProductList
