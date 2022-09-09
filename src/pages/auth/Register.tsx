import {
    IonButton, IonCol,
    IonContent,IonIcon, IonImg, IonInput, IonItem, IonLabel,
    IonPage, IonRouterLink, IonRow, useIonToast
} from '@ionic/react';
import React, {useEffect, useState} from "react";
import "./Register.css"
import {RouteComponentProps} from "react-router-dom";
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged} from "firebase/auth";
import {simClick} from "../../components/utility/functions";
import farmactImage from "../../assets/farmact-logo.png";
import {atOutline, lockClosed} from "ionicons/icons";
import Constants from "../../components/utility/constants";
import {doc, setDoc} from "firebase/firestore";
import {db} from "../../firebase";


const Register: React.FC<RouteComponentProps> = (props) => {

    const history = props.history
    const auth = getAuth()

    const [registering, setRegistering] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [cpassword, setCpassword] = useState<string>("")

    const [present, dismiss] = useIonToast();

    useEffect(() => {
        const AuthCheck = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("authorized register: "+user.uid)
                history.replace(Constants.HOME.path)
            } else {
                console.log("unauthorized register")
            }
        })
        return () => AuthCheck()
    }, [auth, history])

    const registerUser = async () => {
        dismiss()
        if (password !== cpassword){
            present("Die Passwörter stimmen nicht überein.", 2000)
            return;
        }
        setRegistering(true)

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential.user.uid)
                setDoc(doc(db, "user", userCredential.user.uid), {
                    email: userCredential.user?.email
                });
                setRegistering(false)
                history.replace(Constants.HOME.path)
            })
            .catch((error) => {
                console.log(error)
                if (error.code.includes('auth/weak-password')) {
                    present("Stärkeres Passwort wählen.", 2000)
                } else if (error.code.includes('auth/email-already-in-use')){
                    present("Email bereits vergeben.", 2000)
                } else {
                    present("Fehler beim Registrieren", 2000)
                }
                setRegistering(false)
            })
    }

    return (
        <IonPage id={Constants.MAIN_CONTAINER_NAME}>
            <IonContent className="container-register">
                <form onSubmit={event => {
                    event.preventDefault();
                    registerUser().catch()
                }} onKeyPress={(e) => e.key === 'Enter' && simClick("registerButton")}>
                    <div className={"register-icon"}>
                        <IonImg src={farmactImage} />
                    </div>
                    <IonItem>
                            <IonIcon slot={"start"} icon={atOutline}/>
                            <IonInput
                                placeholder="Email"
                                type="email"
                                name="email"
                                id="email"
                                onIonChange={(e: any) => setEmail(e.target.value)}
                                required/>
                        </IonItem>
                    <br/>
                        <IonItem>
                            <IonIcon slot={"start"} icon={lockClosed}/>
                            <IonInput
                                type="password"
                                placeholder="Passwort"
                                name="password"
                                id="password"
                                onIonChange={(e: any) => setPassword(e.target.value)}
                                required>
                            </IonInput>
                        </IonItem>
                    <br/>
                        <IonItem>
                            <IonIcon slot={"start"} icon={lockClosed}/>
                            <IonInput
                                type="password"
                                name="cpassword"
                                id="cpassword"
                                onKeyPress={(e) => e.key === 'Enter' && null}
                                placeholder="Passwort wiederholen"
                                onIonChange={(e: any) => setCpassword(e.target.value)}
                                required>
                            </IonInput>
                        </IonItem>
                        <IonRow>
                            <IonCol className="ion-no-padding ion-padding-vertical">
                                <IonButton
                                    disabled={registering}
                                    expand={"full"}
                                    color="primary"
                                    id="registerButton"
                                    type="submit">Account erstellen</IonButton>
                            </IonCol>
                        </IonRow>
                        <div className={"register-info"}>
                            <IonLabel className="ion-padding" color={"medium"} >Du hast schon einen Account?
                                <IonRouterLink routerLink={Constants.LOGIN.path}> Login </IonRouterLink>
                            </IonLabel>
                        </div>
                    </form>

            </IonContent>
        </IonPage>
    );
};

export default Register;
