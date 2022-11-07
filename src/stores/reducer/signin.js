const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  message: "",
};

const signin = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "LOGIN_PENDING": {
      return {
        ...state,
        data: {},
        isLoading: false,
        isError: false,
        message: "",
      };
    }
    case "LOGIN_FULFILLED": {
      return {
        ...state,
        data: action.payload.data.data,
        isLoading: false,
        isError: false,
        message: action.payload.data.message,
      };
    }
    case "LOGIN_REJECTED": {
      return {
        ...state,
        data: {},
        isLoading: false,
        isError: true,
        message: action.payload.response.data.message,
      };
    }
    default: {
      return state;
    }
  }
};

export default signin;
