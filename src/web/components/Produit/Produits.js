import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Card,
  CardText,
  CardBody,
  CardTitle,
  Form,
  Label,
  Alert,
  Input,
  Button,
  FormGroup,
} from 'reactstrap';
import CardProduit from './CardProduit';
import CardAjoutProduit from './CardAjoutProduit';

import Error from '../UI/Error';

class Produits extends React.Component {
  static propTypes = {
    error: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    produits: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    recipeId:PropTypes.string,
    success:PropTypes.string,
    onProduitSuppression:PropTypes.func.isRequired,
    onProduitAchat:PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
    success:null,
  }

  state = {
      nom: '',
      quantite: '',
      prix: '',
      progressValue: 0
  }

  constructor(props) {
    super(props);
    this.ajoutProduit = this.ajoutProduit.bind(this);
    this.achatProduit = this.achatProduit.bind(this);
    this.supprimerProduit=this.supprimerProduit.bind(this);
  }

  ajoutProduit = (evt,produit) => {
    evt.preventDefault();
    const { onFormSubmit } = this.props;

    onFormSubmit(produit)
      .then(() => setTimeout(() => {console.log("ajout OK");}, 1000))
      .catch(() => {console.log("ajout KO")});
  }

  supprimerProduit= (evt,idProduit) => {
    evt.preventDefault();
    const { onProduitSuppression } = this.props;

    onProduitSuppression(idProduit)
      .then(() => setTimeout(() => {console.log("ajout OK");}, 1000))
      .catch(() => {console.log("ajout KO")});
  }

  achatProduit = (commande) => {
    const { onProduitAchat } = this.props;
    onProduitAchat(commande)
      .then(() => setTimeout(() => {console.log("ajout OK");}, 1000))
      .catch(() => {console.log("ajout KO")});
  }

  render() {
    const { loading, error, success ,recipeId} = this.props;

    // Build Cards for Listing

    const ajoutCard=!!recipeId?'':<CardAjoutProduit ajoutProduit={this.ajoutProduit} key="ajout" {...this.props}/>;
    const cards = this.props.produits.map(produit => (
      <CardProduit supprimerProduit={this.supprimerProduit} achatProduit={this.achatProduit} key={`${produit._id}`} produit={produit} {...this.props} />
    ));

    // Show Listing
    return (
      <div>
        <Row className="pt-4 pt-sm-0">
          <Col sm="12">
            <h1>{!recipeId ?'Mes Produits':'Produits'}</h1>
          </Col>
        </Row>
        <Row className={loading ? 'content-loading' : ''}>
          <Col sm="12" className="card-columns">{ajoutCard}{cards}</Col>
        </Row>
      </div>
    );

  }
}




export default Produits;
