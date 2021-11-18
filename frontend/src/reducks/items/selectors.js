import { createSelector } from "reselect";

const ItemsSelector = (state) => state.items;

export const getItems = createSelector([ItemsSelector], (state) => state.list);
