import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Card,
  Form,
  Label,
  Alert,
  Input,
  Button,
  CardBody,
  FormGroup,
  CardHeader,
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';

class SignUp extends React.Component {
  static propTypes = {
    error: PropTypes.array,
    success: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    onLatLngSubmit: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }

  static defaultProps = {
    error: null,
    success: null,
  }

  state = {
    username: '',
    email: '',
    password: '',
    password2: '',
    telephone: '',
    isFermier: false,
    adresse:'',
    ville:''
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  handleChangerIsFermier= e => this.setState({ [e.target.name]: e.target.checked });

  handleChangeLocation = e => {
    //attention prop est immutable il faut donc forcément remonter pour mettre à jour.
    const { onLatLngSubmit } = this.props;
    onLatLngSubmit(this.state)
    .then(() => {window.scrollTo(0, 0)})
    .catch(() => {window.scrollTo(0, 0)});
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const { onFormSubmit, history } = this.props;

    onFormSubmit(this.state)
      .then(() => setTimeout(() => {window.scrollTo(0, 0);history.push('/login');}, 1000))
      .catch(() => {window.scrollTo(0, 0)});
  }

  render() {
    const { loading, error, success } = this.props;
    const {
      username, email, password, password2,telephone,isFermier,adresse,ville
    } = this.state;

    return (
      <div>
        <Row>
          <Col lg={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>Sign Up</CardHeader>
              <CardBody>
                {!!error && <Alert color="danger">
                  {error.map((item, idx) =>
                    <Row  key={item.field+idx.toString()} >{item.message}</Row>
                )}
                </Alert>}
                {!!success && <Alert color="success">{success}</Alert>}

                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label for="username">First Name</Label>
                    <Input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="John"
                      disabled={loading}
                      value={username}
                      onChange={this.handleChange}
                    />
                  </FormGroup>

                  <FormGroup >
                    <Label for="email">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="john@doe.corp"
                      disabled={loading}
                      value={email}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      disabled={loading}
                      value={password}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password2">Confirm Password</Label>
                    <Input
                      type="password"
                      name="password2"
                      id="password2"
                      placeholder="••••••••"
                      disabled={loading}
                      value={password2}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="adresse">Adresse</Label>
                    <Input
                      type="adresse"
                      name="adresse"
                      id="adresse"
                      placeholder="boulevard carnot"
                      disabled={loading}
                      value={adresse}
                      onBlur={this.handleChangeLocation}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="ville">Ville</Label>
                    <Input
                      type="ville"
                      name="ville"
                      id="ville"
                      placeholder="Paris"
                      disabled={loading}
                      value={ville}
                      onBlur={this.handleChangeLocation}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="telephone">Téléphone</Label>
                    <Input
                      type="telephone"
                      name="telephone"
                      id="telephone"
                      placeholder="0789098765"
                      disabled={loading}
                      value={telephone}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup >
                    <Label for="isFermier">
                     Fermier/Producteur :
                      <Input type="checkbox"
                      name="isFermier"
                      id="isFermier"
                      disabled={loading}
                      value={isFermier}
                      onChange={this.handleChangerIsFermier}
                      style={{ marginLeft: 20 }}
                      />
                      </Label>
                  </FormGroup>
                  <Button color="primary" disabled={loading}>
                    {loading ? 'Loading' : 'Sign Up'}
                  </Button>
                </Form>

                <hr />

                <Row>
                  <Col sm="12">
                    Already have an account?
                    {' '}
                    <Link to="/login">Login</Link>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(SignUp);
