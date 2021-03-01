import React from "react";
import styles from "./App.module.css";
import HomePage from "./pages/home/HomePage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { SignInPage } from "./pages/signIn/SignInPage";
import { SignUpPage } from "./pages/signUp/SignUpPage";
import { DetailPage } from "./pages/detail/DetailPage";

function App() {
	return (
		<div className={styles.App}>
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/signIn" component={SignInPage} />
					<Route path="/signUp" component={SignUpPage} />
					<Route path="/detail/:touristRouteId" component={DetailPage} />
					<Route render={() => <h1>404 not found 找不到页面</h1>} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
