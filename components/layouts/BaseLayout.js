import { useState } from "react";
import Header from "components/Header";
import { ToastContainer } from "react-toastify";
import { useTheme } from "providers/ThemeProvider";

const BaseLayout = (props) => {
  const {
    className,
    user,
    navClass = "with-bg",
    loading,
    children,
    footer,
  } = props;

  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className={`layout-container ${theme.type}`}>
      <Header
        className={navClass}
        user={user}
        loading={loading}
        isOpen={isOpen}
        toggle={toggle}
        theme={theme}
        toggleTheme={toggleTheme}
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
      <style jsx global>
        {`
          html,
          body,
          .base-page {
            background: ${theme.background};
            color: ${theme.fontColor};
            transition: color 0.5s ease-out 0s, background 0.5s ease-out 0s;
          }
        `}
      </style>
    </div>
  );
};

export default BaseLayout;
