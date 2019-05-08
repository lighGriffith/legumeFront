import axios from "axios";
import { errorMessages } from '../constants/messages';
import jsonValidator from '../util/validator/validator';
/**
  * Get Produits
  */
export function getCommandes() {
  console.log("getCommandes");
  const jwt = sessionStorage.getItem('jwt');
  const idUser=sessionStorage.getItem('myId');
  return dispatch => new Promise( (resolve, reject) => {
    // Validation rules
      return axios.get("http://localhost:3001/api/user/"+idUser+"/commande",{headers:{
        'authorization':jwt
      }})
        .then((retour) => {
          console.log("caca");
          console.log(retour);
          return resolve(dispatch({ type: 'SHOW_COMMANDES', data:retour.data }));
        }).catch(reject);
  }).catch((err) => { console.log(err);throw err; });
}

export function addCommande(commande) {
  const jwt = sessionStorage.getItem('jwt');
  commande.idAcheteur=sessionStorage.getItem("myId");
  return dispatch => new Promise( (resolve, reject) => {
    // Validation rules
    var validMessage=jsonValidator.validate(commande,"commande");
    console.log(validMessage);
    if(validMessage && validMessage.length>1){
      return reject(validMessage);
    } else{
      return axios({
        method: 'POST',
        url: "http://localhost:3001/api/user/commande",
        headers: {'authorization':jwt},
        data: commande})
        .then((ret) => {
          console.log(ret);
          resolve()
        }).catch(reject);
    }
  }).catch((err) => { throw err; });
}
