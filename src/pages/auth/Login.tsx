import {
    IonButton, IonCol,
    IonContent, IonIcon, IonImg, IonInput, IonItem, IonLabel,
    IonPage, IonRouterLink, IonRow,

} from '@ionic/react';

/*Funktionen*/
import React, {useEffect, useState} from "react";
import {RouteComponentProps} from 'react-router-dom';
import {useIonToast} from "@ionic/react";

/*Stylesheets*/
import {getAuth, onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
import {simClick} from "../../components/utility/functions";
import "./Login.css"
import {
    atOutline,
    lockClosed,
} from "ionicons/icons";

import farmactImage from "../../assets/farmact-logo.png"
import Constants from "../../components/utility/constants";

const Login: React.FC<RouteComponentProps> = (props) => {

    const auth = getAuth()
    const [authentication, setAuthenticating] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const history = props.history

    const [present] = useIonToast();

    useEffect(() => {
        const AuthCheck = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("authorized login: "+user.uid)
                history.replace(Constants.HOME.path)
            } else {
                console.log("unauthorized login")
            }
        })
        return () => AuthCheck()
    }, [auth, history])


    const signIn = async () => {
        setAuthenticating(true)

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential.user.uid)
                setAuthenticating(false)
                history.replace(Constants.HOME.path)

            })
            .catch((error) => {
                console.log(error)
                present("Unbekannte Kombination von Email und Passwort", 2000)
                setAuthenticating(false)
            })
    }

    return (
        <IonPage id={Constants.MAIN_CONTAINER_NAME}>
                <IonContent className="container-login">
                        <form onSubmit={event => {
                            event.preventDefault()
                            signIn().catch()
                        }} id={"loginForm"} onKeyPress={(e) => e.key ==="Enter" && simClick("loginButton")}>
                            <div className={"login-icon"}>
                                <IonImg src={farmactImage} />
                            </div>
                            <IonItem>
                                <IonIcon slot={"start"} icon={atOutline}/>
                                <IonInput
                                    data-testid="email"
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    onIonChange={(e: any) => setEmail(e.target.value)}
                                    value={email}
                                    required>
                                </IonInput>
                            </IonItem>
                            <br/>
                            <IonItem>
                                <IonIcon slot={"start"} icon={lockClosed}/>
                                <IonInput
                                    data-testid="password"
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Passwort"
                                    onIonChange={(e: any) => setPassword(e.target.value)}
                                    required>
                                </IonInput>
                            </IonItem>
                            <br/>
                            <IonRow>
                                <IonCol className="ion-no-padding ion-padding-vertical">
                                    <IonButton
                                        data-testid="login"
                                        disabled={authentication}
                                        expand={"full"}
                                        color="primary"
                                        id="loginButton"
                                        type="submit">Login</IonButton>
                                </IonCol>
                            </IonRow>
                            <div className={"login-info"}>
                                <IonLabel data-testid="loginlabel" className="ion-padding" color={"medium"} >Du hast noch keinen Account?
                                    <IonRouterLink routerLink={Constants.REGISTER.path}> Registrieren </IonRouterLink>
                                </IonLabel>
                            </div>

                       </form>

                </IonContent>
        </IonPage>
    );
};

export default Login;
