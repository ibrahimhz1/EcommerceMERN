import React, { Fragment, useState } from 'react'
import "./shippingPage.css"

import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../../actions/cartActions";

import MetaData from "../../layouts/MetaData";
import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import MdTransferWithinAStation from '@mui/icons-material/TransferWithinAStation';
import { useAlert } from 'react-alert';

// import {Country, State} from "country-state-city";

const ShippingPage = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  return (
    <Fragment>
      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className='shippingHeading'>Shipping Details</h2>

          <form
            className='shippingForm'
            encType='multipart/form-data'
            onSubmit={shippingSubmit}
          >

          </form>

        </div>
      </div>
    </Fragment>
  );
}

export default ShippingPage;