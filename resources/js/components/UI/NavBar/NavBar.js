import React, { Component } from 'react';

class NavBar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-light py-md-3 " style={{backgroundColor: "#38dee0"}}>
                    <a className="navbar-brand text-uppercase font-weight-bold" href="#">buyuwant</a>
                    <div>
                        <span className="bi bi-heart-fill mx-2" style={{fontSize:"1.5rem"}} ></span>
                        <span className="bi bi-person-fill mx-2" style={{fontSize:"1.5rem"}}></span>
                        <span className="bi bi-cart-fill mx-2" style={{fontSize:"1.5rem"}}></span>
                    </div>
                </nav>
            </div>
        );
    }
}

export default NavBar;