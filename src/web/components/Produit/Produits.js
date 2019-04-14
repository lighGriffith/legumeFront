import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Card,
  CardText,
  CardBody,
  CardTitle,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Error from '../UI/Error';

const Produits = ({ error, loading, produits }) => {
  // Error
  if (error) return <Error content={error} />;

  // Build Cards for Listing
  const cards = produits.map(item => (
    <Card key={`${item.id}`}>
      <CardBody>
        <CardTitle>{item.name}</CardTitle>
        <CardText>{item.prix}{item.quantite}</CardText>
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
        <Col sm="12" className="card-columns">{cards}</Col>
      </Row>
    </div>
  );
};

Produits.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  produits: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

Produits.defaultProps = {
  error: null,
};

export default Produits;
