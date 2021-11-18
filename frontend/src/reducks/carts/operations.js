import API from "../../API";
import {
  addCartAction,
  fetchCartItemsAction,
  increaseCartAction,
  decreaseCartAction,
} from "./actions";
import { push } from "connected-react-router";

const api = new API();
const CARTS_KEY = "CARTS_KEY";

export const fetchCarts = () => {
  return async (dispatch) => {
    return api
      .getCarts()
      .then((carts) => {
        const subtotal = calculateSubtotal(carts);
        dispatch(fetchCartItemsAction(carts, subtotal));
      })
      .catch((error) => {
        alert("Failed to connect API: /carts/");
      });
  };
};

export const addCart = (item) => {
  return async (dispatch, getState) => {
    return api
      .addCarts(item.id)
      .then((addedCart) => {
        let prevCarts = getState().carts.list;
        addedCart["item"] = item;
        prevCarts.push(addedCart);
        const subtotal = calculateSubtotal(prevCarts);
        dispatch(addCartAction(prevCarts, subtotal));
      })
      .catch((error) => {
        alert("Failed to connect API to add cart");
        console.log(error);
      });
  };
};

export const increaseCart = (cart_id) => {
  return async (dispatch, getState) => {
    let prevCarts = getState().carts.list;
    let matchedCarts = prevCarts.filter((cart) => cart.id === cart_id);
    let nextSelectedCount = matchedCarts[0].quantity + 1;
    return api
      .updateCarts(cart_id, nextSelectedCount)
      .then((updatedCart) => {
        prevCarts = prevCarts.filter((cart) => cart.id !== cart_id);
        prevCarts.push(updatedCart);
        const subtotal = calculateSubtotal(prevCarts);
        dispatch(increaseCartAction(prevCarts, subtotal));
      })
      .catch((error) => {
        alert("Failed to connect API to increase cart's quantity");
        console.log(error);
      });
  };
};

export const decreaseCart = (cart_id) => {
  return async (dispatch, getState) => {
    let prevCarts = getState().carts.list;
    let matchedCarts = prevCarts.filter((cart) => cart.id === cart_id);
    let nextSelectedCount = matchedCarts[0].quantity - 1;
    if (nextSelectedCount > 0) {
      // if quantity is more than 0, update
      return api
        .updateCarts(cart_id, nextSelectedCount)
        .then((updatedCart) => {
          prevCarts = prevCarts.filter((cart) => cart.id !== cart_id);
          prevCarts.push(updatedCart);
          const subtotal = calculateSubtotal(prevCarts);
          dispatch(decreaseCartAction(prevCarts, subtotal));
        })
        .catch((error) => {
          alert("Failed to connect API to decrease cart's quantity");
          console.log(error);
        });
    } else {
      // if quantity is 0, delete
      return api
        .deleteCarts(cart_id)
        .then((deletedCarts) => {
          prevCarts = prevCarts.filter((cart) => cart.id !== cart_id);
          const subtotal = calculateSubtotal(prevCarts);
          dispatch(decreaseCartAction(prevCarts, subtotal));
        })
        .catch((error) => {
          alert("Failed to connect API to decrease cart's quantity");
          console.log(error);
        });
    }
  };
};

const calculateSubtotal = (carts) => {
  let subtotal = 0;
  for (let key in carts) {
    subtotal += Number(carts[key].item.price) * carts[key].quantity;
  }
  return subtotal;
};
