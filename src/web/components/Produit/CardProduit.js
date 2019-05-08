import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  Button,
  CardHeader,
  CardFooter
} from 'reactstrap';
import 'rc-slider/assets/index.css';
import Slider,{ Range }from 'rc-slider';
import Error from '../UI/Error';
class CardProduit extends React.Component {
  static propTypes = {
    error: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    produit: PropTypes.shape().isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    recipeId:PropTypes.string,
    success:PropTypes.string,
  }

  static defaultProps = {
    error: null,
    success:null,
  }

  state = {
    quantite:0,
    prix:0
  }

  constructor(props) {
    super(props);
    this.onSliderChange = this.onSliderChange.bind(this);
    //this.achatProduit = this.achatProduit.bind(this);
  }



  onSliderChange = (value) => {
    this.setState({quantite:value,prix:Math.round(this.props.produit.prix*value*100,2)/100})
  }

  render() {
    const { loading, error, success ,recipeId,produit} = this.props;
    const {prix,quantite}=this.state;
    // Show Listing
    return (
      <Card >
          <CardHeader >{produit.nom}</CardHeader>
          {!recipeId?
            <CardBody >
              <CardText>Prix : {produit.prix}€/kg </CardText>
              <CardText>Quantité : {produit.quantite} kg disponible </CardText>
            </CardBody>
            :
            (produit.quantite>0.1?
            <CardBody >
              <CardTitle>{produit.prix}€/kg {produit.quantite} kg disponible</CardTitle>
              <CardText>Prix : {prix} € </CardText>
              <CardText>Quantité achetée  : {quantite} kg</CardText>
              <Slider style={{marginBottom:20}}
                min={0}
                max={produit.quantite}
                defaultValue={0}
                step={0.1}
                onChange={this.onSliderChange}
                trackStyle={{ backgroundColor: 'blue', height: 10 }}
                handleStyle={{
                  borderColor: 'blue',
                  height: 28,
                  width: 28,
                  marginLeft: -14,
                  marginTop: -9,
                  backgroundColor: 'black',
                }}
                withBars={true}
                railStyle={{ backgroundColor: 'grey', height: 10 }}
              />
            </CardBody>:
            <CardBody >
              <CardTitle>Produit Indisponible </CardTitle>
            </CardBody>
          )
          }
          <CardFooter>
            {!recipeId?
              <Button color="primary"
                onClick={(evt) =>{this.props.supprimerProduit(evt,this.props.produit._id)}}
                disabled={loading}
                className="btn btn-primary">
                {loading ? 'Loading' : 'Supprimer'}
              </Button>:
              (produit.quantite>0.1?<Button color="primary"
                onClick={() =>{this.props.achatProduit({idAcheteur:'',quantite:this.state.quantite,prix: this.state.prix,idVendeur:this.props.produit.idUser,idProduit:this.props.produit._id})}}
                disabled={loading}
                className="btn btn-primary">
                {loading ? 'Loading' : 'Acheter'}
              </Button>:'')
              }
          </CardFooter>

      </Card>
    );

  }
}
export default CardProduit;
