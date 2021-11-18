import * as Actions from "./actions";
import initialState from "../store/initialState";

export const ItemsReducer = (state = initialState.items, action) => {
  switch (action.type) {
    case Actions.FETCH_ITEM:
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
};
