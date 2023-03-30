import React, { Fragment, useEffect } from 'react';

// Custom Product component
import ProductCard from "./ProductCard";
import Loader from "../../../components/Loader/Loader";

// CSS Imports
import "./home.css";

import MetaData from "../../layouts/MetaData";

// React Icons
import { CgMouse } from "react-icons/all";

// Redux essentials
import { clearErrors, getProduct } from '../../../actions/productAction';
import { useSelector, useDispatch } from "react-redux";

import { useAlert } from 'react-alert';

// Dummy Product Data Object
// const product = {
//   name: "blue shirt",
//   price: "3000",
//   _id: "ibrahimhz",
//   images: [{url: "https://i.ibb.co/DRST11n/1.webp"}],
// }


const Home = () => {
  const alert = useAlert();

  const dispatch = useDispatch();

  const { loading, error, products } = useSelector(state => state.products)

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
      // return alert.error(error);
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);


  return (
    <Fragment>
      <MetaData title="HZ Ecommerce" />
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>Find Amazing Products Below</h1>
        <a href="#container">
          <button>Scroll <CgMouse /> </button>
        </a>
      </div>

      <h2 className='homeHeading'>Featured Products</h2>

      <div className='container' id='container'>

        {loading ? (<Loader />) : (

          products && products.map(product => (
            <ProductCard product={product} />
          ))

        )}

      </div>
    </Fragment>
  );
}

export default Home;