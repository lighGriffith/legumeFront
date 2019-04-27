import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProduits , addProduit} from '../actions/produits';

class Produits extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    produits: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    fetchProduits: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    match: PropTypes.shape({ params: PropTypes.shape({}) }),
  }


  state = {
    error: null,
    loading: false,
    success:null
  }

  componentDidMount = () =>{
    this.fetchData();
  }

  onFormSubmit = (data) => {
    const { onFormSubmit,match } = this.props;
    data.idUser= (match && match.params && match.params.id_user) ? match.params.id_user : null;
    data.quantite=data.quantite?parseFloat(data.quantite):data.quantite;
    data.prix=data.quantite?parseFloat(data.prix):data.prix;
    this.setState({ loading: true });

    return onFormSubmit(data)
      .then((ret) => {
        console.log(data);
        this.setState({
        loading: false,
        success: 'Success - Votre produit a bien été ajouté',
        error: null,
      });
    }).then((ret) => {
      return this.fetchData();
  }).catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
          success: null,
          error: err,
        });
        throw err; // To prevent transition back
      });
  }

  fetchData = (data) => {
    const { fetchProduits , match } = this.props;
    const idUser = (match && match.params && match.params.id_user) ? match.params.id_user : null;

    this.setState({ loading: true });

    return fetchProduits(idUser)
      .then((produits) => {
        console.log(produits);
        this.setState({
          loading: false,
          error: null,
          produits:produits.data
        });
    }).catch(err => this.setState({
        loading: false,
        error: err,
        produits:null
      }));
  }

  render = () => {
    const { Layout, produits ,match } = this.props;
    const { loading, error ,success } = this.state;
    const id = (match && match.params && match.params.id_user) ? match.params.id_user : null;
    return (
      <Layout
        recipeId={id}
        error={error}
        success={success}
        loading={loading}
        produits={produits}
        reFetch={() => this.fetchData()}
        onFormSubmit={this.onFormSubmit}
      />
    );
  }
}

const mapStateToProps = state => ({
  produits: state.produits.produits || {},
});

const mapDispatchToProps = {
  onFormSubmit: addProduit,
  fetchProduits: getProduits,
};

export default connect(mapStateToProps, mapDispatchToProps)(Produits);
