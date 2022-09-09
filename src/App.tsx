import { Redirect, Route} from 'react-router-dom';
import {
    IonApp,
    IonRouterOutlet,
    setupIonicReact
} from '@ionic/react';
import Register from "./pages/auth/Register";

import Login from './pages/auth/Login';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import "./pages/map/Dashboard.css";
import React from "react";
import Dashboard from "./pages/map/Dashboard";
import AuthRoute from "./components/menu/AuthRoute";
import { IonReactRouter } from "@ionic/react-router";
import About from "./pages/about/About";
import MainMenu from "./components/menu/MainMenu";
import OrderManagement from "./pages/ordermanagement/OrderManagement";
import Constants from "./components/utility/constants";
import OrderDetails  from './pages/ordermanagement/OrderDetails';
setupIonicReact();
export interface IAppProps { }

const App: React.FC<IAppProps> = (props) => {

    return (
        <IonApp >
            <IonReactRouter>
                <MainMenu />
                <IonRouterOutlet id={Constants.MAIN_CONTAINER_NAME}>
                    <Route exact
                        path={Constants.REGISTER.path}
                        component={Register} />
                    <Route exact
                        path={Constants.LOGIN.path}
                        component={Login} />
                    <Route exact
                        path={Constants.MAP.path}
                        render={(props) => {
                            return <AuthRoute><Dashboard {...props} /></AuthRoute>
                        }} />
                    <Route exact
                        path={Constants.ABOUT.path}
                        render={(props) => {
                            return <AuthRoute><About {...props} /></AuthRoute>
                        }} />
                    <Route exact
                        path={Constants.ORDER_MANAGEMENT.path}
                        render={(props) => {
                            return <AuthRoute><OrderManagement {...props} /></AuthRoute>
                        }} />
                    <Route exact
                        path={Constants.ORDER_DETAILS.path}
                        render={(props) => {
                            return <AuthRoute><OrderDetails {...props} /></AuthRoute>
                        }} />
                    <Redirect to={Constants.HOME.path} />
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    )
}

export default App;
