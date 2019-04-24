export const generalMessages = {};

export const successMessages = {};

export const errorMessages = {
  // Defaults
  default: 'Hmm, an unknown error occured',
  timeout: 'Server Timed Out. Check your internet connection',
  invalidJson: 'Response returned is not valid JSON',

  // Firebase Related
  invalidFirebase: 'Firebase is not connected correctly',

  // Member
  memberExists: 'Member already exists',
  missingFirstName: 'First name is missing',
  missingLastName: 'Last name is missing',
  missingEmail: 'Email is missing',
  missingPassword: 'Password is missing',
  passwordsDontMatch: 'Passwords do not match',

  // Recipes
  recipe404: 'Recipe not found',
  missingMealId: 'Missing meal definition',
  //Géolocalisation
  notFound:"Nous n'avons pas pu trouver votre adresse.",
  manqueRenseignement:"Veuillez renseigner l'adresse et la ville.",
  problemeAppel:"Un problème inconnu est survenu lors de la localisation. Veuillez-réesayer plus tard."
};
