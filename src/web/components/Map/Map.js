import * as React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Link } from 'react-router-dom';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
const myProp= {
      zoom: 15,
      center:[51.505,-0.09]
    };
    const divStyle = {
      display: 'flex',
      height: '100%',
      minHeight:'400px'
    };
const MapComponent = ({ error, loading, users }) => {

    return (
      <div style={divStyle}>
        <Map center={myProp.center} zoom={myProp.zoom} style={{flex: '1 1 auto'}}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          {users.map((item, idx) =>
            <Marker  key={item._id} position={item.position}  >
            <Popup>
              <span>{item.username} <br/>
                <Link to="/produits" >Voir les produits</Link>
              </span>

            </Popup>
          </Marker>
        )}
        </Map>
      </div>
    )
}


export default MapComponent;
