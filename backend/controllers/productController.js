import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const getProducts = asyncHandler(async (req, res) => {
    const match = {}
    const sortBy = {}
    const pageSize = Number(process.env.PAGINATION_LIMIT);
    const page = Number(req.query.pageNumber) || 1

    match.name = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    }
        : {}

    match.category = req.query.category ? {
        category: req.query.category
    } : {}
    match.brand = req.query.brand ? {
        brand: req.query.brand
    } : {}

    if (req.query.minPrice && req.query.maxPrice) {
        match.price = {
            price: { $gte: Number(req.query.minPrice), $lte: Number(req.query.maxPrice) }
        }
    } else if (req.query.maxPrice) {
        match.price = {
            price: { $lte: Number(req.query.maxPrice) }
        }
    } else if (req.query.minPrice) {
        match.price = {
            price: { $gte: Number(req.query.minPrice) }
        }
    } else { }

    if (req.query.sortBy) {
        const str = req.query.sortBy.split(':')
        sortBy[str[0]] = str[1] === 'desc' ? -1 : 1
    }

    const count = await Product.countDocuments({ ...match.name, ...match.category, ...match.brand, ...match.price })
    const products = await Product.find({ ...match.name, ...match.category, ...match.brand, ...match.price }).limit(pageSize)
        .skip(pageSize * (page - 1)).sort(sortBy)

    console.log({ ...match })

    res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

const getBrandList = asyncHandler(async (req, res) => {
    const brands = await Product.distinct("brand")

    if (brands) {
        res.json(brands)
    } else {
        res.status(404)
        throw new Error('Brands not found')
    }
})

const getCategoryList = asyncHandler(async (req, res) => {
    const categories = await Product.distinct("category")

    if (categories) {
        res.json(categories)
    } else {
        res.status(404)
        throw new Error('categories not found')
    }
})

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        await product.remove()
        res.json({ message: "producte removed" })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user.id,
        image: '/images/sample.jpg',
        brand: 'sample brand',
        category: 'sample category',
        sizes: [],
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, sizes, countInStock } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.sizes = sizes
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        const alreadyReviewed = product.reviews
            .find(r => r.user.toString() === req.user._id.toString())

        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Product already reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

        await product.save()
        res.status(201).json({ message: 'Review added' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3)

    res.json(products)
})

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getTopProducts,
    getBrandList,
    getCategoryList

}