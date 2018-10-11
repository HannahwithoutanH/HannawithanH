import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => (
  <div className="page-center">
    <h1 style={{ textAlign:'center'}}>
      Login<Link to="/Login">Login</Link>
    <br />
      Signup <Link to="/Signup">Signup</Link>
    </h1>
  </div>
);

export default Main;
