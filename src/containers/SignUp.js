import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {addUser} from '../actions/users';
import {getLatLngFromAdresse} from '../actions/localisation';

class SignUp extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    user: PropTypes.shape({}).isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    onLatLngSubmit :  PropTypes.func.isRequired,
  }

  state = {
    error: null,
    success: null,
    loading: false,
    lat : '',
    lng : ''
  }

  onLatLngSubmit = (data) => {
    const { onLatLngSubmit } = this.props;
    return onLatLngSubmit(data)
      .then((openStreetMapData) => {
        if(openStreetMapData){
          this.setState({
            loading: false,
            success: 'Nous avons bien trouvé votre localisation',
            error: null,
            lat:openStreetMapData.lat,
            lng:openStreetMapData.lng
          })
          console.log(this.state);
        }
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
  onFormSubmit = (data) => {
    const { onFormSubmit } = this.props;

    this.setState({ loading: true });
    console.log(this.state);
    data.lat=parseFloat(this.state.lat);
    data.lng=parseFloat(this.state.lng);
    console.log(data);
    return onFormSubmit(data)
      .then(() => this.setState({
        loading: false,
        success: 'Success - You are now a user',
        error: null,
      })).catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
          success: null,
          error: err,
        });
        throw err; // To prevent transition back
      });
  }

  render = () => {
    const { user, Layout } = this.props;
    const { error, loading, success } = this.state;

    return (
      <Layout
        error={error}
        user={user}
        loading={loading}
        success={success}
        onFormSubmit={this.onFormSubmit}
        onLatLngSubmit={this.onLatLngSubmit}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.user || {},
});

const mapDispatchToProps = {
  onFormSubmit: addUser,
  onLatLngSubmit: getLatLngFromAdresse
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
