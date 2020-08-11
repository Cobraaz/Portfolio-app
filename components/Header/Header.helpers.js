import Link from "next/link";
import ActiveLink from "components/shared/ActiveLink";

export const BsNavLink = (props) => {
  const { href, title, className = "" } = props;
  return (
    <ActiveLink activeClassName="active" href={href}>
      <a className={`nav-link port-navbar-link ${className}`}>{title}</a>
    </ActiveLink>
  );
};

export const BsNavBrand = () => (
  <Link href="/">
    <a className="navbar-brand port-navbar-brand">Anuj bansal</a>
  </Link>
);

export const LoginLink = () => (
  <a className="nav-link port-navbar-link" href="/api/v1/login">
    Login
  </a>
);

export const LogoutLink = () => (
  <a className="nav-link port-navbar-link" href="/api/v1/logout">
    Logout
  </a>
);
