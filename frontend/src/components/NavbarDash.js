import React from 'react'
import Dashboard from './Dashboard'
import Cart from './Cart'
import { MdLocalOffer } from "react-icons/md";
import {FiLogOut} from "react-icons/fi";

import { connect } from "react-redux";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import Orderdata from './Orderdata';
import Register from './Register';
import Login from './Login';

function NavbarDash(props) {
  let History = useHistory();
  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    History.push("/")

  }
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#"><img src="images/logo2.png"  height="150px" width="180px"></img></a>
          <br/><br/>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav ms-auto text-uppercase">
              <h6><a class="nav-link active" aria-current="page" ><Link to="/Dash" class="nav-link">Home</Link></a></h6>
              <h6><a class="nav-link"> <Link to="/Dash/cart" class="nav-link">Cart <h5 className="bg-dark text-white text-center" style={{"border-radius": "50px"}}>{props.mycounter}</h5></Link></a></h6>
              <h6><a class="nav-link"> <Link to="/orders" class="nav-link">Orders</Link></a></h6>
              <h6><a class="nav-link" ><Link to="/" class="nav-link">Login</Link></a></h6>
              <h6><a class="nav-link  btn btn-outline-danger " style={{ marginTop: "8px" }} onClick={logout}><h5><FiLogOut className="text-dark"/></h5></a></h6>
            </div>
          </div>
        </div>
      </nav>
      <div className="container-fluid bg-dark text-warning"><marquee><h6 className="text-light">
            <MdLocalOffer className="text-warning" /> &nbsp;&nbsp; Free Home
            Delivery on Order Above 500/- Rupees !!
          </h6></marquee></div>

      {/* <Dashboard/> */}
      <Switch>
        <Route path="/Dash" exact component={Dashboard} />
        <Route path="/Dash/cart" exact component={Cart} />
        <Route path="/orders" exact component={Orderdata} />
        <Route path="/Reg" exact component={Register} />
        <Route path="/" exact component={Login} />
      </Switch>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    mycounter: state.count,
  };
};
export default connect(mapStateToProps)(NavbarDash);
