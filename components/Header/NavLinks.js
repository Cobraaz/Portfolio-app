import { Nav, NavItem } from "reactstrap";
import { AdminMenu } from "./AdminMenu";
import { isAuthorized } from "utils/auth0";
import ThemeToggle from "components/shared/ThemeToggle";
// import { useTheme } from "providers/ThemeProvider";
import {
  BsNavLink,
  LoginLink,
  LogoutLink,
} from "components/Header/Header.helpers";

export const NavLinks = ({ user, loading, theme, toggleTheme, indexPage }) => {
  // const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Nav className="mr-auto ml-auto" navbar>
        <NavItem className="port-navbar-item">
          <BsNavLink href="/" title="Home" />
        </NavItem>
        <NavItem className="port-navbar-item">
          <BsNavLink href="/about" title="About" />
        </NavItem>
        <NavItem className="port-navbar-item">
          <BsNavLink href="/portfolios" title="Portfolios" />
        </NavItem>
        <NavItem className="port-navbar-item">
          <BsNavLink href="/blogs" title="Blogs" />
        </NavItem>
        <NavItem className="port-navbar-item">
          <BsNavLink href="/projects" title="Projects" />
        </NavItem>
        <NavItem className="port-navbar-item">
          <BsNavLink href="/cv" title="Cv" />
        </NavItem>
      </Nav>
      <Nav navbar>
        {!loading && (
          <>
            {user && (
              <>
                {isAuthorized(user, "admin") && <AdminMenu />}
                <NavItem className="port-navbar-item">
                  <LogoutLink />
                </NavItem>
              </>
            )}
            {!user && (
              <NavItem className="port-navbar-item">
                <LoginLink />
              </NavItem>
            )}
            <NavItem className="port-navbar-item">
              <BsNavLink href="/contact" title="Contact" />
            </NavItem>
          </>
        )}
        {!indexPage && <ThemeToggle onChange={toggleTheme} />}
      </Nav>
    </>
  );
};
