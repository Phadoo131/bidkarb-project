import { NavDropdown } from "react-bootstrap";

export default function NavbarDropdown({handleLogout}) {
  return (
    <NavDropdown title="My Auction" id="nav-dropdown">
      <NavDropdown.Item href="#">Open Auction</NavDropdown.Item>
      <NavDropdown.Item href="#">My History</NavDropdown.Item>
      <NavDropdown.Item href="#">Shipping</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="#" onClick={handleLogout}>Logout</NavDropdown.Item>
    </NavDropdown>
  );
}
