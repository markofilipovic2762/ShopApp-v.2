import axios from 'axios'
import {
    PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_SUCCESS,
    PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_TOP_REQUEST, PRODUCT_TOP_SUCCESS, PRODUCT_TOP_FAIL,
    PRODUCT_BRANDS_REQUEST, PRODUCT_BRANDS_SUCCESS, PRODUCT_BRANDS_FAIL,
    PRODUCT_CATEGORIES_REQUEST, PRODUCT_CATEGORIES_SUCCESS, PRODUCT_CATEGORIES_FAIL
}
    from '../constants/productConstants'

export const listProducts = (keyword = '', pageNumber = '', filters) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })

        let urlProducts = `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`

        if (filters.brand) {
            filters.brand.forEach(element => {
                urlProducts = urlProducts + '&brand=' + element
            });
        }
        if (filters.category) {
            filters.category.forEach(element => {
                urlProducts = urlProducts + '&category=' + element
            });
        }
        if (filters.price) {
            if (filters.price.maxPrice) {
                urlProducts = urlProducts + '&maxPrice=' + Number(filters.price.maxPrice, 10)
            }
            if (filters.price.minPrice) {
                urlProducts = urlProducts + '&minPrice=' + Number(filters.price.minPrice, 10)
            }
        }

        if (filters.sortBy) {
            urlProducts = urlProducts + '&sortBy=' + filters.sortBy
        }

        const { data } = await axios.get(urlProducts)

        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/products/${id}`)

        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_DELETE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/products/${id}`, config)

        dispatch({ type: PRODUCT_DELETE_SUCCESS })
    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/products`, {}, config)

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_UPDATE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/products/${product._id}`, product, config)

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const createProductReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.post(`/api/products/${productId}/reviews`, review, config)

        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const listTopProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_TOP_REQUEST })

        const { data } = await axios.get(`/api/products/top`)

        dispatch({ type: PRODUCT_TOP_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const listBrands = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_BRANDS_REQUEST })

        const { data } = await axios.get(`/api/products/brands`)

        dispatch({ type: PRODUCT_BRANDS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: PRODUCT_BRANDS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const listCategories = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_CATEGORIES_REQUEST })

        const { data } = await axios.get(`/api/products/categories`)

        dispatch({ type: PRODUCT_CATEGORIES_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: PRODUCT_CATEGORIES_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}