import React from "react";
import {
  Navbar,
  NavbarBrand,
} from "reactstrap";
const Header = () => {
  return (
    <Navbar color="info" light expand="md" className="fixed-top p-1">
      <NavbarBrand className="text-white">GIT APP</NavbarBrand>
    </Navbar>
  );
};
export default Header;
