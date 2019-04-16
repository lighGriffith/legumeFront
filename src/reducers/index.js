import member from './member';
import recipes from './recipes';
import produits from './produits';
import users from './users';

const rehydrated = (state = false, action) => {
  switch (action.type) {
    case 'persist/REHYDRATE':
      return true;
    default:
      return state;
  }
};

export default {
  rehydrated,
  member,
  recipes,
  produits,
  users,
};
