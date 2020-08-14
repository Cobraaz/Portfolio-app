import Link from "next/link";
import ActiveLink from "components/shared/ActiveLink";
import { Media } from "reactstrap";

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
    <a className="navbar-brand port-navbar-brand">
      <Media className=" admin-intro">
        <Media left>
          <Media
            object
            width={62}
            height={62}
            className="mr-3 port-navbar-brand-image"
            style={{ borderRadius: "50%" }}
            src="/images/AnujImage.jpg"
            alt="Generic placeholder image"
          />
        </Media>

        <Media body style={{ paddingTop: "7px" }}>
          <h5 className="font-weight-bold mb-0">Anuj bansal</h5>
          <p>Full stack developer</p>
        </Media>
      </Media>
    </a>
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
