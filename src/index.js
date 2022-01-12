import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
// import reportWebVitals from "./reportWebVitals";

import dva from "dva";
import createLoading from "dva-loading";
import { RouterConfig } from "./router";
import createBrowserHistory from "history/createBrowserHistory";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/fontello/css/confluencebits.css";

// 1. Initialize
const app = dva({
  ...createLoading({ effects: true }),
  params: "window.location",
  history: createBrowserHistory(),
});
// 2. Plugins
// app.use({});

// 3. Model
app.model(require("./models/app").default);
app.model(require("./models/authentication").default);
app.model(require("./models/auxillary").default);
app.model(require("./models/parcels").default);
app.model(require("./models/entries").default);
app.model(require("./models/archived").default);
// app.model(require("./models/court").default);
// app.model(require("./models/reader").default);

// 4. Router
app.router(RouterConfig);

// 5. Start
app.start("#root");

// ReactDOM.render(
// 	<React.StrictMode>
// 		<App />
// 	</React.StrictMode>,
// 	document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
