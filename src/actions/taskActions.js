import {
  GET_CONCERTS_REQUEST,
  GET_CONCERTS_SUCCESS,
  GET_CONCERTS_FAILURE,
  SHOW_MORE_REQUEST,
  SHOW_MORE_SUCCESS
} from "../constants/requestsConcertsActions";
import unsplashApi from "../API/API";
import { addLikeAPI, IS_LIKE } from "../API/API_LIKE";

export const requestConcerts = () => ({
  type: "GET_TASK_REQUEST",
  payload: {
    isFetching: true
  }
});

const reciveConcerts = concerts => {
  return {
    type: "GET_TASK_SUCCESS",
    payload: {
      concerts: concerts,
      isFetching: false
    }
  };
};

const errorTask = err => ({
  type: "GET_TASK_FAILURE",
  payload: {
    error: true,
    isFetching: false,
    error_message: new Error(err)
  }
});

export function fetchTask() {
  return async function(dispatch) {
    dispatch(requestConcerts());
    let concertsArrayUnsplash = await fetch(unsplashApi())
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log("----", res.message);
        dispatch(reciveConcerts(res.message));
        return res.message;
      })
      .catch(err => dispatch(errorTask(err)));
    // console.log("---->", concertsArrayUnsplash);

    // let ids = concertsArrayUnsplash.map(el => el.id);

    // let withCheckdLikes = await queryIsLike(ids);
    // if (withCheckdLikes === undefined) withCheckdLikes = [];
    // concertsArrayUnsplash.map(el => {
    //   if (withCheckdLikes.includes(el.id)) {
    //     el.isLiked = true;
    //   } else {
    //     el.isLiked = false;
    //   }
    //   return el;
    // });

    // dispatch(reciveConcerts(concertsArrayUnsplash));
  };
}

function queryIsLike(arr) {
  return fetch(addLikeAPI(IS_LIKE), {
    method: "POST",
    body: JSON.stringify(arr)
  })
    .then(res => res.json())
    .then(res => {
      return res.IS_LIKED;
    })
    .catch(err => console.log(new Error(err)));
}

const reciveMoreConcerts = concerts => {
  return {
    type: SHOW_MORE_SUCCESS,
    payload: {
      concerts: concerts,
      isFetching: false
    }
  };
};

const requestMoreConcerts = str => ({
  type: SHOW_MORE_REQUEST,
  payload: { isFetching: true, searchFor: str }
});

export function showMore(str, page) {
  return async dispatch => {
    dispatch(requestMoreConcerts(str));
    let concertsArrayUnsplash = await fetch(unsplashApi(str, page))
      .then(res => {
        return res.json();
      })
      .then(res => res.results)
      .catch(err => dispatch(errorTask(err)));
    let ids = concertsArrayUnsplash.map(el => el.id);

    let withCheckdLikes = await queryIsLike(ids);
    if (withCheckdLikes === undefined) withCheckdLikes = [];
    concertsArrayUnsplash.map(el => {
      if (withCheckdLikes.includes(el.id)) {
        el.isLiked = true;
      } else {
        el.isLiked = false;
      }
      return el;
    });

    dispatch(reciveMoreConcerts(concertsArrayUnsplash));
  };
}
