const initialState = {
  isModalOn : false
};

const modalReducer = (state = initialState, action : any) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {...state,
        value: true
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        value: false
      };
    default:
      return state;
  }
};

export default modalReducer;
