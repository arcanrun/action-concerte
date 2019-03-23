import {
  GET_CONCERTS_REQUEST,
  GET_CONCERTS_SUCCESS,
  GET_CONCERTS_FAILURE,
  SHOW_MORE_REQUEST,
  SHOW_MORE_SUCCESS
} from "../constants/requestsConcertsActions";

const initailState = {
  isFetching: false,
  isFetchingForMore: false,
  concerts: [],
  error: false,
  error_message: ""
};

export function concerts(state = initailState, action) {
  switch (action.type) {
    case SHOW_MORE_REQUEST:
      return {
        ...state,
        isFetchingForMore: action.payload.isFetching
      };

    case SHOW_MORE_SUCCESS:
      return {
        ...state,
        isFetchingForMore: false,
        concerts: [...state.concerts, ...action.payload.concerts],
        page: ++state.page
      };

    case GET_CONCERTS_REQUEST:
      return {
        ...state,
        isFetching: action.payload.isFetching
      };

    case GET_CONCERTS_SUCCESS:
      return {
        ...state,
        isFetching: action.payload.isFetching,
        concerts: action.payload.concerts
      };
    case GET_CONCERTS_FAILURE:
      return {
        ...state,
        isFetching: action.payload.isFetching,
        error: action.payload.error,
        error_message: action.payload.error_message
      };

    default:
      return state;
  }
}
