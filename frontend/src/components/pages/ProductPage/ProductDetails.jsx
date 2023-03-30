import React, { Fragment, useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import ReactStars from "react-rating-stars-component";

// components
import ReviewCard from '../../cards/reviewCard/ReviewCard';
import Loader from "../../../components/Loader/Loader";

import { useAlert } from "react-alert";

import "./productDetails.css";

import { useSelector, useDispatch } from "react-redux";

import { clearErrors, getProductDetails } from "../../../actions/productAction";

import { useParams } from 'react-router-dom';
import MetaData from '../../layouts/MetaData';

import { addItemsToCart } from "../../../actions/cartActions";

const ProductDetails = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const alert = useAlert();

    const { product, loading, error } = useSelector((state) => state.productDetails)

    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        if (product.stock <= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty)
    }

    const decreaseQuantity = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty)
    }

    const addToCartHandler = ()=> {
        dispatch(addItemsToCart(id, quantity));
        alert.success("Items added o Cart")
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProductDetails(id));
    }, [dispatch, id, error, alert]);

    const options = {
        edit: false,
        color: "rgba(20, 20, 20, 0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 23,
        value: product.ratings,
        isHalf: true,
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={`${product.name} --HZStore`} />
                    <div className="ProductDetailsStyle">
                        <div className='middleStyle'>
                            <Carousel className='CarouselStyle'>
                                {product.images &&
                                    product.images.map((item, i) => (
                                        <img
                                            className='CorouselImage'
                                            key={item.url}
                                            src={item.url}
                                            alt={`${i} Slide`}
                                        />
                                    ))
                                }
                            </Carousel>
                        </div>

                        <div>
                            <div className="detailsBlock-1">
                                <h2>{product.name}</h2>
                                <p>Product # {product._id}</p>
                            </div>
                            <div className="detailsBlock-2">
                                <ReactStars {...options} />
                                <span>({product.numOfReviews} Reviews)</span>
                            </div>
                            <div className="detailsBlock-3">
                                <h1>{`${product.price}`}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input readOnly value={quantity} type="number" />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>
                                    <button onClick={addToCartHandler}>Add to Cart</button>
                                </div>
                                <p>
                                    Status:
                                    <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                        {product.Stock < 1 ? "OutOfStock" : "InStock"}
                                    </b>
                                </p>
                            </div>

                            <div className="detailsBlock-4">
                                Description: <p>{product.description}</p>
                            </div>

                            <button className='submitReview'>Submit Review</button>

                        </div>

                    </div>

                    <h3 className='reviewsHeading'>REVIEWS</h3>

                    {product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews.map((review) => <ReviewCard review={review} />)}
                        </div>
                    ) : (
                        <p className='noReviews'>No Reviews Yet</p>
                    )
                    }

                </Fragment>)}

        </Fragment>
    );
}

export default ProductDetails;