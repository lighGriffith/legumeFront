import axios from "axios";
import { errorMessages } from '../constants/messages';
import jsonValidator from '../util/validator/validator';
/**
  * Get Produits
  */

  export function authentification(auth) {
    console.log(auth);
    return (dispatch) => {
      return new Promise((resolve, reject) => {
        axios.post("http://localhost:3001/api/signin",auth).then( retour => {
          if(retour.data.success){
            dispatch({type: 'UPDATE_USER',data:retour.data});
            console.log("after Reducer");
            resolve();
          }else{
            reject(retour.data.error);
          }
        }).catch((err) => {console.log("r1");reject(err)});
      }).catch((err) => {console.log(err);throw err.message});
    }
  }

export function getUsers() {
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
                  return (dispatch) => {
                    return new Promise((resolve, reject) => {
                          resolve(data);
                    }).catch((err) => {console.log(err);throw err.message});
                  }

}


export function addUser(formData){
  const {
    email, password, password2, username,isFermier,lat,lng
  } = formData;
  console.log(formData);
  return dispatch => new Promise( (resolve, reject) => {
    // Validation rules
    var validMessage=jsonValidator.validate(formData,"user");
    console.log(validMessage);
    if (!username) return reject({ message: errorMessages.missingFirstName });
    if (!email) return reject({ message: errorMessages.missingEmail });
    if (!password) return reject({ message: errorMessages.missingPassword });
    if (!password2) return reject({ message: errorMessages.missingPassword });
    if (password !== password2) return reject({ message: errorMessages.passwordsDontMatch });

    return axios.post("http://localhost:3001/api/signup",formData)
      .then(() => {
        resolve()
      }).catch(reject);
  }).catch((err) => { throw err.message; });
}
