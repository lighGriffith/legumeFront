let Validator = require("fastest-validator");
let jsonValidator={};

const schema = {
   "user":{
      password:{
         type:"string",
         min:8,
         max:255
      },
      username:{
         type:"string",
         min:3,
         max:255
      },
      email:{
         type:"email"
      },
      lat:{
         type:"string",
         min:1,
      },
      lng:{
         type:"string",
         min:1,
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
  let validator = new Validator();
  var a=validator.validate(userJson, schema[typeShema]);
  return a;
}

export default jsonValidator;
