const initialState = {
  isSidebarOn : false
};

const sidebarReducer = (state = initialState, action : any) => {
  switch (action.type) {
    case 'OPEN_SIDEBAR':
      return {...state,
        value: true
      };
    case 'CLOSE_SIDEBAR':
      return {
        ...state,
        value: false
      };
    default:
      return state;
  }
};

export default sidebarReducer;
