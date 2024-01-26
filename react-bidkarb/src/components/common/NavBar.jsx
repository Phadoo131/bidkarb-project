// // import Button from "react-bootstrap/Button";
// import { NavItem } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
// import Form from "react-bootstrap/Form";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import CustomButton from "./CustomButton";
// import NavbarDropdown from "./NavbarDropdown";
// import Profile from "./profile";
// import SearchBar from "./SearchBar";
// import { useNavigate } from "react-router-dom";


// export default function NavBar(props) {

//   return (
//     <Navbar expand="lg" className="bg-body-tertiary">
//       <Container fluid className="p-3 justify-content-center gap-5">
//         <Navbar.Brand href="#" className="me-0">
//           BidKarb
//         </Navbar.Brand>
//         <SearchBar />

//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse
//           id="basic-navbar-nav"
//           className="justify-content-center flex-grow-0"
//         >
//           <Nav className="me-0 my-2 my-lg-0 gap-1" style={{}} navbarScroll>
//             <NavItem className="">
//               <Nav.Link href="#action1" className="link-opacity-100-hover">
//                 Category
//               </Nav.Link>
//             </NavItem>
//             <NavItem>
//               <Nav.Link
//                 href="#action2"
//                 className="text-nowrap link-opacity-100-hover"
//               >
//                 About Us
//               </Nav.Link>
//             </NavItem>
//             {props.authenticated ? 
//               (
                
//                 <>
//                 <NavbarDropdown handleLogout={props.onLogout}/>
//                 {/* Testing purpose */}
//                 <Button onClick={props.onLogout}>Logout</Button>
//                 </>
//               ): 
                
//               (<>
//               <NavItem>
//                 <Nav.Link href="/login">Login</Nav.Link>
//               </ NavItem>
//               <NavItem>
//               <Nav.Link href="/signup">Signup</Nav.Link>
//             </ NavItem>
//               </>
//               )}
//             {/* write logic that If user are log in show component below */}
//             {/* <NavItem>
//               <NavbarDropdown />
//             </NavItem>
//             <NavItem>
//               <Profile />
//             </NavItem> */}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

import { NavItem } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import CustomButton from "./CustomButton";
import NavbarDropdown from "./NavbarDropdown";
import Profile from "./profile";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import "../../custom.css";
 
export default function NavBar(props) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid className="p-3 justify-content-center gap-5">
        <Navbar.Brand href="/" className="me-0">
          BidKarb
        </Navbar.Brand>
        <SearchBar />
 
        <Nav className="me-0 my-2 my-lg-0 gap-1 " style={{}} navbarScroll>
          {props.authenticated ? (
            <>
              {/* <NavbarDropdown handleLogout={props.onLogout} /> */}
              {/* Testing purpose */}
              <NavItem>
                <Nav.Link className="text-nowrap" href="/auction/new">
                  Open Auction
                </Nav.Link>
              </NavItem>
              <NavItem>
                <Nav.Link className="text-nowrap" href="/history">
                  My History
                </Nav.Link>
              </NavItem>
              <NavItem>
                <Nav.Link href="#">Shipping</Nav.Link>
              </NavItem>
              <Button className="bg-indigo" onClick={props.onLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button className="bg-indigo align-self-center" href="/login">
                Login
              </Button>
 
              <NavItem>
                <Nav.Link href="/signup">Signup</Nav.Link>
              </NavItem>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}