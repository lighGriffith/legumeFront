import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Card,
  CardText,
  CardBody,
  CardHeader,
  CardTitle,
  Form,
  Label,
  Alert,
  Input,
  Button,
  FormGroup,
  CardFooter
} from 'reactstrap';
import Error from '../UI/Error';

class CardAjoutProduit extends React.Component {
  static propTypes = {
    error: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    produits: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    recipeId:PropTypes.string,
    success:PropTypes.string,
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
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { loading, error, success ,recipeId} = this.props;
    const {
      nom, quantite, prix
    } = this.state;

    // Show Listing
    return (
      <Card key="ajout">
        <CardHeader>Ajout d'un produit</CardHeader>
        <Form onSubmit={(evt)=>{this.props.ajoutProduit(evt,this.state)}}>
          <CardBody >
            {!!error && <Alert color="danger">
              {error.map((item, idx) =>
                <Row  key={item.field+idx.toString()} >{item.message}</Row>
            )}
            </Alert>}
            {!!success && <Alert color="success">{success}</Alert>}

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
          </CardBody>
          <CardFooter>
            <Button color="primary" disabled={loading} className="btn btn-primary">
              {loading ? 'Loading' : 'Ajouter un produit'}
            </Button>
          </CardFooter>
        </Form>
      </Card>
    );

  }
}




export default CardAjoutProduit;
