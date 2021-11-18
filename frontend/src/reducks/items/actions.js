export const FETCH_ITEM = "FETCH_ITEM";
export const fetchItemsAction = (items) => {
  return {
    type: "FETCH_ITEM",
    payload: items,
  };
};
