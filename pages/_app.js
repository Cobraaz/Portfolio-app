import { library, config } from "@fortawesome/fontawesome-svg-core";
import {
  faSun,
  faMoon,
  faBorderAll,
  faList,
  faSortNumericDown,
  faSortNumericUp,
} from "@fortawesome/free-solid-svg-icons";

config.autoAddCss = false;
library.add(
  faSun,
  faMoon,
  faList,
  faBorderAll,
  faSortNumericDown,
  faSortNumericUp
);

import "@fortawesome/fontawesome-svg-core/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "highlight.js/styles/darcula.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import "slate-simple-editor/dist/index.css";
import "react-slideshow-image/dist/styles.css";
import "remixicon/fonts/remixicon.css";
import "styles/main.scss";

const App = ({ Component, pageProps }) => <Component {...pageProps} />;

export default App;
