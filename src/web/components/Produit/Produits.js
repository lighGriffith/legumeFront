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
  CardHeader,
} from 'reactstrap';

import { Link } from 'react-router-dom';
import Error from '../UI/Error';
class Produits extends React.Component {
  static propTypes = {
    error: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    produits: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    success:PropTypes.string,
    loading: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    error: null,
    success:null,
  }

  state = {
    nom: '',
    quantite: '',
    prix: '',
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = (event) => {
    event.preventDefault();
    const { onFormSubmit } = this.props;

    onFormSubmit(this.state)
      .then(() => setTimeout(() => {console.log("ajout OK");}, 1000))
      .catch(() => {console.log("ajout KO")});
  }

  render() {
    const { loading, error, success } = this.props;
    const {
      nom, quantite, prix
    } = this.state;

    // Build Cards for Listing
    const ajoutCard=<Card key="ajout">
      <CardBody>
        <CardTitle>Ajout d'un produit</CardTitle>
        {!!error && <Alert color="danger">
          {error.map((item, idx) =>
            <Row  key={item.field+idx.toString()} >{item.message}</Row>
        )}
        </Alert>}
        {!!success && <Alert color="success">{success}</Alert>}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="nom">Nom</Label>
            <Input
              type="text"
              name="nom"
              id="nom"
              placeholder="Carotte"
              disabled={loading}
              value={nom}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="prix">Prix</Label>
            <Input
              type="text"
              pattern="[0-9]*"
              name="prix"
              id="prix"
              placeholder="120"
              disabled={loading}
              value={prix}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="quantite">Quantite</Label>
            <Input
              type="text"
              pattern="[0-9]*"
              name="quantite"
              id="quantite"
              placeholder="30"
              disabled={loading}
              value={quantite}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button color="primary" disabled={loading} className="btn btn-primary">
            {loading ? 'Loading' : 'Ajouter un produit'}
          </Button>
        </Form>
      </CardBody>
    </Card>
    const cards = this.props.produits.map(item => (
      <Card key={`${item._id}`}>
        <CardBody>
          <CardTitle>{item.nom}</CardTitle>
          <CardText>{item.prix}€/kg {item.quantite} kg disponible</CardText>
          <Link className="btn btn-primary" to={`/produit/${item.id}`}>
            Acheter ce produit
            {' '}
            <i className="icon-arrow-right" />
          </Link>
        </CardBody>
      </Card>
    ));

    // Show Listing
    return (
      <div>
        <Row className="pt-4 pt-sm-0">
          <Col sm="12">
            <h1>produits</h1>
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
