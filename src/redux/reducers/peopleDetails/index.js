import {
  PEOPLE_DETAILS,
  PEOPLE_DETAILS_FAILED,
  PEOPLE_DETAILS_SUCCESS,
} from "./actions";

const initialState = {
  data: null,
  loading: false,
  error: null,
  id: null,
};

export function peopleDetailsReducers(state = initialState, action) {
  switch (action.type) {
    case PEOPLE_DETAILS: {
      const { id } = action.payload;
      return {
        ...state,
        loading: true,
        id,
      };
    }
    case PEOPLE_DETAILS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    }
    case PEOPLE_DETAILS_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
}
