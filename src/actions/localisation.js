import axios from "axios";
import { errorMessages } from '../constants/messages';
/**
  * Get Produits
  */
export function getLatLngFromAdresse(state) {
  const {
    adresse,ville
  } = state;

  return () => new Promise((resolve, reject) => {
      if(adresse && ville ){
        let adresseComplete=encodeURIComponent(adresse+" "+ville);
        return axios.get("https://nominatim.openstreetmap.org/search/"+adresseComplete+"?format=json")
        .then( streetMapData => {
          if(streetMapData && (streetMapData.error|| streetMapData.data.length<1)){
            return reject([{name:"notFound", message: errorMessages.notFound }]);
          }else{
            return resolve( {lat:streetMapData.data[0].lat,lng:streetMapData.data[0].lon});
          }
        }).catch((err) => { return reject([{name:"problemeAppel",message: errorMessages.problemeAppel }])});
      }else{
        return reject([{name:"manqueRenseignement",message : errorMessages.manqueRenseignement}]);
      }
    }).catch((err) => { throw err; })
}
