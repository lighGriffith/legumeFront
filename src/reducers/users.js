import Store from '../store/users';

export const initialState = Store;

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_MAP_USER': {
      return {
        ...state,
        users: action.data,
      };
    }
    default:
      return state;
  }
}
