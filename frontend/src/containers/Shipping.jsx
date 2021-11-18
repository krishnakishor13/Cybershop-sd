import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../API";
import { getCarts, getSubtotal } from "../reducks/carts/selectors";
import { fetchCarts } from "../reducks/carts/operations";
import { addOrder } from "../reducks/order/operations";
import { push } from "connected-react-router";
const api = new API();

const Shipping = () => {
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();

  const subtotal = getSubtotal(selector);
  const carts = getCarts(selector);

  const [full_name, setFullName] = useState(""),
    [phone, setPhone] = useState(""),
    [address, setAddress] = useState(""),
    [pincode, setPincode] = useState(""),
    [apt, setApt] = useState(""),
    [city, setCity] = useState(""),
    [state, setState] = useState(""),
    [totalitem, setTotalItem] = useState(0);

  useEffect(() => {
    dispatch(fetchCarts());
  }, []);

  useEffect(() => {
    let arr = [];
    if (carts != undefined && carts.length > 0) {
      for (let key in carts) {
        arr.push(carts[key].quantity);
      }
      let sum = arr.reduce(function (a, b) {
        return a + b;
      }, 0);
      setTotalItem(sum);
    }
  }, [carts]);

  const inputFullname = (e) => {
    setFullName(e.target.value);
  };

  const inputPhoneNumber = (e) => {
    setPhone(e.target.value);
  };

  const inputAddress = (e) => {
    setAddress(e.target.value);
  };

  const inputPin = (e) => {
    setPincode(e.target.value);
  };

  const inputHouse = (e) => {
    setApt(e.target.value);
  };

  const inputCity = (e) => {
    setCity(e.target.value);
  };

  const inputState = (e) => {
    setState(e.target.value);
  };

  const orderButton = (e) => {
    let params = {
      total_price: subtotal,
      full_name: full_name,
      address_line1: address,
      address_line2: apt,
      city: city,
      state: state,
      postal_code: pincode,
      country: "US",
      telephone: phone,
    };
    dispatch(addOrder(params));
    e.preventDefault();
    dispatch(push("order-confirmation"));
  };

  return (
    <>
      <div class="box">
        <p>- Order your items -</p>
      </div>

      <section class="details">
        <div class="product-details">
          <h3>Shipment Details</h3>
          <h4>Please check your items and confirm it</h4>
          <div class="box2">
            <table>
              {carts &&
                carts.map((cart) => (
                  <tr>
                    <td class="td-item">{cart.item.name}</td>
                    <td class="td-quantity">{cart.quantity}</td>
                    <td class="td-price">{cart.item.price}</td>
                  </tr>
                ))}
              <tr class="border">
                <td>Total Price</td>
                <td>{totalitem}</td>
                <td>${subtotal}</td>
              </tr>
            </table>
          </div>
        </div>
        <br />
        <br />
        <div class="dispatch">
          <div class="form">
            <label for="name">Full name</label> <br />
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Enter Recipient's name"
              onChange={inputFullname}
            />
            <br />
            <label for="number">Phone Number</label> <br />
            <input
              type="text"
              id="number"
              name="number"
              required
              placeholder="Enter Phone Number"
              onChange={inputPhoneNumber}
            />
            <br />
            <label for="address">Street address or P.O. Box</label> <br />
            <input
              type="text"
              id="address"
              name="address"
              required
              placeholder="Enter Street address or P.O. Box"
              onChange={inputAddress}
            />
            <br />
            <label for="zip">PIN code</label> <br />
            <input
              type="text"
              id="zip"
              name="zip"
              required
              placeholder="Enter PIN code"
              onChange={inputPin}
            />
            <br />
            <label for="house">Apt, suite, unit, building, floor, etc.</label>
            <br />
            <input
              type="text"
              id="house"
              name="house"
              required
              placeholder="Enter Apt, suite, unit, building, floor, etc."
              onChange={inputHouse}
            />
            <br />
            <label for="city">City</label> <br />
            <input
              type="text"
              id="city"
              name="city"
              required
              placeholder="Enter City"
              onChange={inputCity}
            />
            <br />
            <label for="state">State</label> <br />
            <input
              type="text"
              id="State"
              name="state"
              required
              placeholder="Enter State"
              onChange={inputState}
            />
            <button
              type="submit"
              name="submit"
              value="SUBMIT"
              class="submit"
              onClick={orderButton}
            >Submit</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shipping;
