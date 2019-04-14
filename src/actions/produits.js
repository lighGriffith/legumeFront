import { Firebase, FirebaseRef } from '../lib/firebase';

/**
  * Get Produits
  */
export function getProduits() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Promise((resolve, reject) => FirebaseRef.child('meals').once('value')
    .then((snapshot) => {
      const data = [{ id: 4, name: 'melon',prix:3,quantite:10 },
    { id: 4, name: 'melon',prix:3,quantite:10 },
  { id: 4, name: 'melon',prix:3,quantite:10 },
{ id: 4, name: 'melon',prix:3,quantite:10 }];
      return resolve(dispatch({ type: 'SHOW_DEFAULT_PRODUITS', data }));
    }).catch(reject)).catch((err) => { throw err.message; });
}
