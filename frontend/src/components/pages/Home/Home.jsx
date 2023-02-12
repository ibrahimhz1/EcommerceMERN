import React, { Fragment } from 'react'

// Custom Product component
import Product from "./Product";

// CSS Imports
import "./home.css";

// React Icons
import {CgMouse} from "react-icons/all";

// Dummy Product Data Object
const product = {
  name: "blue shirt",
  price: "3000",
  _id: "ibrahimhz",
  images: [{url: "https://i.ibb.co/DRST11n/1.webp"}],
}

const Home = () => {
  return (
    <Fragment>
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>Find Amazing Products Below</h1>
        <a href="#container">
          <button>Scroll <CgMouse /> </button>
        </a>
      </div>

      <h2 className='homeHeading'>Featured Products</h2>

      <div className='container' id='container'>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
      </div>
    </Fragment>
  );
}

export default Home;