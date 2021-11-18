export const ADD_ORDER = "ADD_ORDER";
export const addOrderAction = (order) => {
  return {
    type: "ADD_ORDER",
    list: order,
  };
};
