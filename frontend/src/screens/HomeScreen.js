import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import Product from '../components/Product'
import { listProducts, listBrands, listCategories } from '../actions/productActions'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import CollapseCheckbox from '../components/CollapseCheckbox'
import Button from '@material-ui/core/Button';
import FilterTiltShiftIcon from '@material-ui/icons/FilterTiltShift';
import CollapsePrice from '../components/CollapsePrice'

const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList

    const productBrands = useSelector(state => state.productBrands)
    const { loading: loadingBrands, error: errorBrands, brands } = productBrands

    const productCategories = useSelector(state => state.productCategories)
    const { loading: loadingCategories, error: errorCategories, categories } = productCategories

    //const [updatedProducts, setUpdatedProducts] = useState(productList)
    const [filters, setFilters] = useState({
        brand: [],
        category: [],
        price: { minPrice: '', maxPrice: '' }
    })

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber, filters))
        dispatch(listBrands())
        dispatch(listCategories())

    }, [dispatch])
    // const showFilteredResults = (filters) => {
    //     dispatch(listProducts(keyword, pageNumber, filters))
    // }

    const handleFilters = (filteri, category) => {
        const newFilters = { ...filters }
        newFilters[category] = filteri;

        // if (category === "price") {
        //     let priceValues = handlePrice(filteri);
        //     newFilters[category] = priceValues
        // }

        //showFilteredResults(newFilters);
        setFilters(newFilters)
    }



    return (
        <>
            {console.log(filters)}
            <Meta />
            {!keyword ? <div>
                <h1 className="top-products">Top Products</h1>
                <ProductCarousel />
            </div> : <Link to='/' className='btn btn-light'>Go Back</Link>}
            <h1 className='text-center'>Latest Products</h1>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <>
                            <Row>
                                <Col sm={12} md={3} xl={3}>
                                    {loadingBrands ? <Loader /> : errorBrands ? <Message variant='danger'>{errorBrands}</Message>
                                        :
                                        <CollapseCheckbox
                                            initState={true}
                                            title="Brands"
                                            list={brands}
                                            handleFilters={(filters) => handleFilters(filters, 'brand')}
                                        />
                                    }
                                    {loadingCategories ? <Loader /> : errorCategories ? <Message variant='danger'>{errorCategories}</Message>
                                        :
                                        <CollapseCheckbox
                                            initState={false}
                                            title="Categories"
                                            list={categories}
                                            handleFilters={(filters) => handleFilters(filters, 'category')}
                                        />
                                    }
                                    <CollapsePrice
                                        initState={false}
                                        title="Price"
                                        handleFilters={(filters) => handleFilters(filters, 'price')}
                                    />
                                    <Button
                                        size="large"
                                        variant="contained"
                                        fullWidth
                                        color="primary"
                                        size="small"
                                        startIcon={<FilterTiltShiftIcon />}
                                        onClick={() => dispatch(listProducts(keyword, pageNumber, filters))}
                                    >
                                        Filter
                                    </Button>
                                </Col>
                                <Col lg={9} md={9} sm={12}>
                                    <Row>
                                        {products.map(product => (
                                            <Col lg={3} md={4} sm={6} xs={12} key={product._id}>
                                                <Product product={product} />
                                            </Col>
                                        ))}
                                    </Row>

                                </Col>

                            </Row>
                            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
                        </>
                    )
            }
        </>
    )
}

export default HomeScreen
