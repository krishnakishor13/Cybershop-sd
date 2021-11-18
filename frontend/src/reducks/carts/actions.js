export const FETCH_CART = "FETCH_CART";
export const fetchCartItemsAction = (carts, subtotal) => {
  return {
    type: "FETCH_CART",
    list: carts,
    subtotal: subtotal,
  };
};

export const ADD_CART = "ADD_CART";
export const addCartAction = (carts, subtotal) => {
  return {
    type: "ADD_CART",
    list: carts,
    subtotal: subtotal,
  };
};

export const INCREASE_CART = "INCREASE_CART";
export const increaseCartAction = (carts, subtotal) => {
  return {
    type: "INCREASE_CART",
    list: carts,
    subtotal: subtotal,
  };
};

export const DECREASE_CART = "DECREASE_CART";
export const decreaseCartAction = (carts, subtotal) => {
  return {
    type: "DECREASE_CART",
    list: carts,
    subtotal: subtotal,
  };
};
