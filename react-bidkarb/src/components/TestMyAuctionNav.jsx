import React, { useRef } from 'react';
import { Button, Container, Dropdown, Navbar, NavDropdown } from 'react-bootstrap';
import { userContext } from '../util/userContext';

export default function MyAuctionNav2({ onLogout }) {
  const userRef = useRef();

  const toggleUserDropdown = () => {
    userRef.current.classList.toggle('dropdown--active');
  };

  return (
    <>
      <NavDropdown.Toggle id="dropdown-basic-button" className="header-right">
        Dropdown button
      </NavDropdown.Toggle>
      <NavDropdown.Menu>
      <NavDropdown.Item eventKey="4.1">Open Auction</NavDropdown.Item>
      <NavDropdown.Item eventKey="4.2">My History</NavDropdown.Item>
      <NavDropdown.Item eventKey="4.3">Shipping</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item>
        <NavDropdown title="User Details" id="basic-nav-dropdown">
          <NavDropdown.Item>
            <userContext.Consumer>
              {({ user }) => (
                <div id="header-avater" className="header-right-menu">
                  <NavDropdown.Button onClick={toggleUserDropdown}>
                    User Details
                  </NavDropdown.Button>
                  <div ref={userRef} id="avatar-dropdown" className="dropdown">
                    <ul className="dropdown__list">
                      <li className="dropdown__list-item">
                        <span className="dropdown__icon">
                          <i className="far fa-user"></i>
                        </span>
                        <span className="dropdown__title">{user.name}</span>
                      </li>
                      <li className="dropdown__list-item">
                        <span className="dropdown__icon">
                          <i className="fas fa-clipboard-list"></i>
                        </span>
                        <span className="dropdown__title">{user.email}</span>
                      </li>
                      <li className="dropdown__list-item">
                        <span className="dropdown__icon">
                          <i className="fas fa-sign-out-alt"></i>
                        </span>
                        <span className="dropdown__title" onClick={onLogout}>
                          Logout
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </userContext.Consumer>
          </NavDropdown.Item>
        </NavDropdown>
      </NavDropdown.Item>
    </NavDropdown.Menu>
    </>
  );
}
