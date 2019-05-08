import axios from "axios";
import { errorMessages } from '../constants/messages';
import jsonValidator from '../util/validator/validator';
/**
  * Get Produits
  */
export function getProduits(idUser) {
  const jwt = sessionStorage.getItem('jwt');
  if(!idUser)idUser=sessionStorage.getItem("myId");
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

export function deleteProduit(idProduit){
  const jwt = sessionStorage.getItem('jwt');
  const idUser=sessionStorage.getItem("myId");
  return dispatch => new Promise( (resolve, reject) => {
    // Validation rules
      return axios.delete("http://localhost:3001/api/user/"+idUser+"/produit/"+idProduit,{headers:{
        'authorization':jwt
      }})
        .then((retour) => {
          console.log(retour);
          resolve();
        }).catch(reject);
  }).catch((err) => { console.log(err);throw err; });
}

export function addProduit(formData){
  return dispatch => new Promise( (resolve, reject) => {
    // Validation rules
    var validMessage=jsonValidator.validate(formData,"produit");
    console.log(validMessage);
    if(validMessage && validMessage.length>1){
      return reject(validMessage);
    } else{
      return axios({
        method: 'POST',
        url: "http://localhost:3001/api/user/"+sessionStorage.getItem("myId")+"/produit",
        headers: {'authorization':sessionStorage.getItem("jwt")},
        data: formData})
        .then((ret) => {
          console.log(ret);
          resolve()
        }).catch(reject);
    }
  }).catch((err) => { throw err; });
}
