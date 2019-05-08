import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter ,
  Button
} from 'reactstrap';
import MapComponent from '../Map/Map';
import { Link } from 'react-router-dom';
import Error from '../UI/Error';
class Commandes extends React.Component {
  static propTypes = {
    error: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    commandes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    success:PropTypes.string,
  }

  static defaultProps = {
    error: null,
    success:null,
  }

  state = {
    modal: false,
    userInfo:[]
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle = (infovendeur)=> {
      if(this.state.modal){
        this.setState(prevState => ({modal: !prevState.modal}));
      }else{
        infovendeur.position= [infovendeur.lat,infovendeur.lng]
        this.setState(prevState => ({modal: !prevState.modal,userInfo:[infovendeur]}));
      }
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

    console.log(this.props);
    const rows = this.props.commandes.map(commande => (
      <tr key={`${commande._id}`}>
        <td>{commande.quantite}</td>
        <td>{commande.prix}</td>
        <td>{commande.infoVendeur.email}</td>
        <td>{commande.infoVendeur.adresse}</td>
        <td>{commande.infoVendeur.ville}</td>
        <td>{commande.infoVendeur.telephone}</td>
        <td ><Button color="secondary" onClick={()=>{this.toggle(commande.infoVendeur)}}>Voir sur la map</Button></td>
      </tr>
    ));

    // Show Listing
    return (
      <div>
        <Table responsive striped dark>
          <thead>
            <tr>
              <th>Quantité (en kg)</th>
              <th>Prix (en €)</th>
              <th>Nom</th>
              <th>Adresse</th>
              <th>Ville</th>
              <th>Numéro téléphone</th>
              <th>Voir sur la map</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </Table>
        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            <MapComponent
              recipeId='mapModal'
              error={error}
              loading={loading}
              users={this.state.userInfo}
              reFetch={() => {}}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );

  }
}
export default Commandes;
