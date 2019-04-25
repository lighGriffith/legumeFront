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
            console.log(retour.data);
            sessionStorage.setItem('jwt',retour.data.token);
            resolve();
          }else{
            reject(retour.data.error);
          }
        }).catch((err) => {console.log("r1");reject(err)});
      }).catch((err) => {console.log(err);throw err.message});
    }
  }

export function getUsers() {
  const jwt = sessionStorage.getItem('jwt');
  return dispatch => new Promise( (resolve, reject) => {
    // Validation rules
      return axios.get("http://localhost:3001/api/users",{headers:{
        'authorization':jwt
      }})
        .then((users) => {
          users.data.forEach(function(element) { element.position = [element.lat,element.lng]; });
          return resolve(dispatch({ type: 'SHOW_MAP_USER', data:users.data }));
        }).catch(reject);
  }).catch((err) => { console.log(err);throw err; });

}


export function addUser(formData){
  const {
    email, password, password2, username,isFermier,lat,lng
  } = formData;
  console.log(formData);
  return dispatch => new Promise( (resolve, reject) => {
    // Validation rules
    var validMessage=jsonValidator.validate(formData,"user");
    if(password!=password2)validMessage.push({field:"password",message:"Votre password doit être identique dans les deux champs."})
    if(validMessage && validMessage.length>1){
      return reject(validMessage);
    } else{
      return axios.post("http://localhost:3001/api/signup",formData)
        .then(() => {
          resolve()
        }).catch(reject);
    }
  }).catch((err) => { throw err; });
}
