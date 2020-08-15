import ReactResizeDetector from "react-resize-detector";

import { Collapse, Navbar, NavbarToggler } from "reactstrap";

import { BsNavBrand } from "components/Header/Header.helpers";
import { NavLinks } from "components/Header/NavLinks";

const Header = ({ user, loading, className, isOpen, toggle }) => {
  return (
    <ReactResizeDetector handleWidth>
      {({ width }) => (
        <Navbar
          className={`port-navbar port-default absolute ${className} ${
            width < 768 && isOpen ? "is-open" : "is-close"
          }`}
          dark
          expand="md"
        >
          <BsNavBrand />
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <NavLinks user={user} loading={loading} />
          </Collapse>
        </Navbar>
      )}
    </ReactResizeDetector>
  );
};

export default Header;
