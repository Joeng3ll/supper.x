import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO } from "./actionTypes";

export default (state = [], { type, id, text }) => {
  switch (type) {
    case ADD_TODO: {
      return [
        {
          id,
          text,
          completed: false
        },
        ...state
      ];
    }
    case TOGGLE_TODO: {
    }
  }
};
