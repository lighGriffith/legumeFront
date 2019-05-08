let Validator = require("fastest-validator");
let jsonValidator={};

const schema = {
   "user":{
      password:{
         type:"string",
         min:8,
         max:255,
      },
      username:{
         type:"string",
         min:3,
         max:255,

      },
      adresse : {
         type:"string",
         min:2,
         max:100
      },
      ville:{
         type:"string",
         min:1,
         max:100
      },
      email:{
         type:"email"
      },
      lat:{
         type:"number",
         min:-90,
         max:90
      },
      lng:{
         type:"number",
         min:-180,
         max:180
      },
      telephone:{
         type:"string",
         min:10,
         max:10
      },
      isFermier:{
         type:"boolean"
      }
   },
   "produit":{
      nom:{
         type:"string",
         min:2,
         max:20
      },
      quantite:{
         type:"number",
         required:true,
         positive:true
      },
      prix:{
         type:"number",
         required:true,
         positive:true
      },
      idUser:{
         type:"string",
         required:true,
         min:4
      }
   },
   "commande":{
      idAcheteur:{
         type:"string",
         min:20,
         max:30
      },
      idVendeur:{
         type:"string",
         min:20,
         max:30
      },
      idProduit:{
         type:"string",
         min:20,
         max:30
      },
      quantite:{
         type:"number",
         required:true,
         positive:true
      },
      prix:{
         type:"number",
         required:true,
         positive:true
      }
   }
};


jsonValidator.validate=function(userJson,typeShema){
  let validator = new Validator({
    messages: {
       string: "Votre '{field}' n'est pas valide.",
       stringMin: "Votre '{field}' doit comporter au moins {expected} caractères.",
       email:"Votre '{field}' n'est pas valide.",
   }
 });
  var a=validator.validate(userJson, schema[typeShema]);
  return a;
}

export default jsonValidator;
