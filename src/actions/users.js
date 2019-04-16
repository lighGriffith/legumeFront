import { Firebase, FirebaseRef } from '../lib/firebase';
/**
  * Get Produits
  */
export function getUsers() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Promise((resolve, reject) => FirebaseRef.child('meals').once('value')
    .then((snapshot) => {
      const data = [{
            "_id":"1",
            "username": "quentin",
            "password": "quentin",
            "email":"quentin@gmail.com",
            "position":[51.505,-0.09],
            "telephone"    : "0990298378",
            "isFermier" :true
          },{
                "_id":"2",
                "username": "quentin",
                "password": "quentin",
                "email":"quentin@gmail.com",
                "position":[51.502,-0.09],
                "telephone"    : "0990298378",
                "isFermier" :true
              },{
                    "_id":"3",
                    "username": "quentin",
                    "password": "quentin",
                    "email":"quentin@gmail.com",
                    "position":[51.505,-0.08],
                    "telephone"    : "0990298378",
                    "isFermier" :false
                  },{
                        "_id":"4",
                        "username": "quentin",
                        "password": "quentin",
                        "email":"quentin@gmail.com",
                        "position":[51.504,-0.07],
                        "telephone"    : "0990298378",
                        "isFermier" :false
                      }];
      return resolve(dispatch({ type: 'SHOW_MAP_USER', data }));
    }).catch(reject)).catch((err) => { throw err.message; });
}
