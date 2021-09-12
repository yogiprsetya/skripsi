import {
  DELETE_PROJECT
} from '../types';

const initialState = {
  showDeleteProject: null,
};

export default function index(state = initialState, action = null) {
  switch (action.type) {
    case DELETE_PROJECT:
      return { ...state, showDeleteProject: action.payload };
    default:
      return state;
  }
}
