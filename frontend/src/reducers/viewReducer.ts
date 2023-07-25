const initialState = {
  view : "list"
};

const viewReducer = (state = initialState, action : any) => {
  switch (action.type) {
    case 'GRID':
      return {...state,
        value: "grid"
      };
    case 'LIST':
      return {
        ...state,
        value: "list"
      };
    default:
      return state;
  }
};

export default viewReducer;
