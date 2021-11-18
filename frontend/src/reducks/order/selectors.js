import { createSelector } from "reselect";

const ordersSelector = (state) => state.order;

export const getOrders = createSelector(
  [ordersSelector],
  (state) => state.list
);
