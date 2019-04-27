import { Firebase, FirebaseRef } from '../lib/firebase';
import axios from "axios";
import { errorMessages } from '../constants/messages';
import jsonValidator from '../util/validator/validator';
/**
  * Get Produits
  */
export function getProduits(idUser) {
  const jwt = sessionStorage.getItem('jwt');
  return dispatch => new Promise( (resolve, reject) => {
    // Validation rules
      return axios.get("http://localhost:3001/api/user/"+idUser+"/produit",{headers:{
        'authorization':jwt
      }})
        .then((retour) => {
          return resolve(dispatch({ type: 'SHOW_DEFAULT_PRODUITS', data:retour.data }));
        }).catch(reject);
  }).catch((err) => { console.log(err);throw err; });
}


export function addProduit(formData){
  const {
    name,prix,quantite
  } = formData;
  console.log(formData);
  return dispatch => new Promise( (resolve, reject) => {
    // Validation rules
    var validMessage=jsonValidator.validate(formData,"produit");
    console.log(validMessage);
    if(validMessage && validMessage.length>1){
      return reject(validMessage);
    } else{
      return axios({
        method: 'POST',
        url: "http://localhost:3001/api/user/"+formData.idUser+"/produit",
        headers: {'authorization':sessionStorage.getItem("jwt")},
        data: formData})
        .then((ret) => {
          console.log(ret);
          resolve()
        }).catch(reject);
    }
  }).catch((err) => { throw err; });
}
