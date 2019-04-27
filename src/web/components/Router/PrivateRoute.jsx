import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import TemplateSidebar from '../Templates/Sidebar';
const PrivateRoute = ({component: Component,pageTitle, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => !!sessionStorage.getItem("jwt")
        ? <TemplateSidebar pageTitle="{pageTitle}">
          <Component />
        </TemplateSidebar>
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />} />
  )
}

export default PrivateRoute;
