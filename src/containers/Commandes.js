import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCommandes } from '../actions/commandes';

class Commandes extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    commandes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    fetchCommandes: PropTypes.func.isRequired,
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

  fetchData = (data) => {
    const { fetchCommandes , match } = this.props;
    const idUser = (match && match.params && match.params.id_user) ? match.params.id_user : null;

    this.setState({ loading: true });

    return fetchCommandes(idUser)
      .then((commandes) => {
        console.log(commandes);
        this.setState({
          loading: false,
          error: null,
          commandes:commandes.data
        });
    }).catch(err => this.setState({
        loading: false,
        error: err,
        commandes:null
      }));
  }

  render = () => {
    const { Layout, commandes ,match } = this.props;
    const { loading, error ,success } = this.state;
    const id = (match && match.params && match.params.id_user) ? match.params.id_user : null;
    return (
      <Layout
        recipeId={id}
        error={error}
        success={success}
        loading={loading}
        commandes={commandes}
        reFetch={() => this.fetchData()}
      />
    );
  }
}

const mapStateToProps = state => ({
  commandes: state.commandes.commandes || {},
});

const mapDispatchToProps = {
  fetchCommandes: getCommandes,
};

export default connect(mapStateToProps, mapDispatchToProps)(Commandes);
