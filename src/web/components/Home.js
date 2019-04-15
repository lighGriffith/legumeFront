import React from 'react';
//import { Row, Col, Jumbotron } from 'reactstrap';
import {DeviceMap} from './Map/Map';
const divStyle = {
  display: 'flex',
  height: '100%',
  minHeight:'400px'
};

const About = () => (
  <div style={divStyle}>
    <DeviceMap />
  </div>
);

export default About;
