import { NavDropdown, Button } from "react-bootstrap";

export default function MyAuctionNav({onLogout}) {
  return (
    <NavDropdown title="My Auction" id="basic-nav-dropdown">
      <NavDropdown.Item eventKey="4.1">Open Auction</NavDropdown.Item>
      <NavDropdown.Item eventKey="4.2">My History</NavDropdown.Item>
      <NavDropdown.Item eventKey="4.3">Shipping</NavDropdown.Item>
      <NavDropdown.Divider />
      <Button onClick={onLogout}>Logout</Button>
    </NavDropdown>
  );
}


// import { Button, Nav, NavDropdown } from "react-bootstrap";
// import { userContext } from "../util/userContext";
// import React, { useRef } from 'react';

// export default function MyAuctionNav({ onLogout }) {
//   const userRef = useRef();

//   const toggleUserDropdown = () => {
//     userRef.current.classList.toggle('dropdown--active');
//   };

//   return (
//     <NavDropdown title="My Auction" className="dropdown-menu-right">
//       <NavDropdown.Item eventKey="4.1">Open Auction</NavDropdown.Item>
//       <NavDropdown.Item eventKey="4.2">My History</NavDropdown.Item>
//       <NavDropdown.Item eventKey="4.3">Shipping</NavDropdown.Item>
//       <NavDropdown.Divider />
//       <NavDropdown.Item eventKey="4.4">
//         <userContext.Consumer>
//           <NavDropdown title="User Details" className="dropdown-menu-right" onClick={toggleUserDropdown}>
//           {({ user }) => (
//                 <> 
//                   <NavDropdown.Item>{user.name}</NavDropdown.Item>
//                   <NavDropdown.Item>{user.email}</NavDropdown.Item>
//                 </>
//               )}
//           </NavDropdown>
//         </userContext.Consumer>
//       </NavDropdown.Item>

//           <NavDropdown.Item eventKey="4.5" onClick={onLogout}>Logout</NavDropdown.Item>
//       </NavDropdown>
//   );
// }