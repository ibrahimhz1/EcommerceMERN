import React, { Fragment, useEffect, useState } from 'react'

import "./productsPage.css";
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../../actions/productAction';
import Loader from '../../Loader/Loader';
import ProductCard from '../Home/ProductCard';

import Pagination from "react-js-pagination";

// material ui components
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { useAlert } from "react-alert"

import { useParams } from 'react-router-dom';
import MetaData from '../../layouts/MetaData';

const categories = [
    "Laptop",
    "Footwear",
    "Phone",
    "Camera",
    "Juice",
];

const ProductsPage = ({match}) => {

    const { keyword } = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");

    const [ratings, setRatings] = useState(0);

    const {
        products,
        loading,
        error,
        productsCount,
        resultPerPage,
        filteredProductsCount,
    } = useSelector((state) => state.products);

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    }
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice)
    }

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct(keyword, currentPage, price, category, ratings));
    }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

    let count = filteredProductsCount;

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title="PRODUCTS --HZStore"/>

                    <h2 className='productsHeading'>Products</h2>
                    <div className='products'>
                        {products &&
                            products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))
                        }
                    </div>

                    <div className="filterBox">
                        <Typography>Price</Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay="auto"
                            aria-labelledby='range-slider'
                            color='secondary'
                            size="small"
                            min={0}
                            max={25000}
                        />

                        <Typography>Categories</Typography>
                        <ul className='categoryBox'>
                            {categories.map((category) => (
                                <li
                                    className='category-link'
                                    key={category}
                                    onClick={() => setCategory(category)}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>

                        <fieldset>
                            <Typography component="legend">Ratings Above</Typography>
                            <Slider
                                size="small"
                                value={ratings}
                                onChange={(e, newRating) => {
                                    setRatings(newRating);
                                }}
                                aria-labelledby="continous-slider"
                                valueLabelDisplay='auto'
                                min={0}
                                max={5}
                            />
                        </fieldset>

                    </div>


                    {resultPerPage < count && (
                        <div className='paginationBox'>
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="1st"
                                lastPageText="Last"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"
                            />
                        </div>
                    )}
                </Fragment>
            }
        </Fragment>
    )
}

export default ProductsPage