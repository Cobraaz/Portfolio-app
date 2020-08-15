import { useState } from "react";
import Header from "components/Header";
import { ToastContainer } from "react-toastify";

const BaseLayout = (props) => {
  const {
    className,
    user,
    navClass = "with-bg",
    loading,
    children,
    footer,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className="layout-container">
      <Header
        className={navClass}
        user={user}
        loading={loading}
        isOpen={isOpen}
        toggle={toggle}
      />

      <main className={`cover ${className}`} onClick={() => isOpen && toggle()}>
        <div className="wrapper">{children}</div>
      </main>
      <ToastContainer />

      {!footer && (
        <footer className="page-footer" onClick={() => isOpen && toggle()}>
          <div>
            <a
              href="https://www.facebook.com/anuj.bansal.739"
              target="_"
              className="nounderline"
            >
              <i className={`ri-facebook-fill mr-2 clickable icons`}></i>
            </a>
            <a
              href="https://github.com/Cobraaz"
              target="_"
              className="nounderline"
            >
              <i className={`ri-github-fill clickable icons `}></i>
            </a>
          </div>
        </footer>
      )}
    </div>
  );
};

export default BaseLayout;
