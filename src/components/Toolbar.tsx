import React from "react";
import {IonButtons, IonImg, IonMenuButton, IonTitle, IonToolbar} from "@ionic/react";
import {getAuth} from "firebase/auth";
import farmactImage from "../assets/farmact-logo.png"
import "./Toolbar.css"

export interface IToolbarProps {
    title: String
}

const Toolbar: React.FunctionComponent<IToolbarProps> = (props) => {

    const auth = getAuth()
    const user = auth.currentUser

    return (
        <IonToolbar>
            <IonTitle>{props.title}</IonTitle>
            {(user) ? <IonButtons slot={"start"}>
                            <IonMenuButton autoHide={false} menu={"start"}/>
                      </IonButtons> : <></>}

            <IonButtons slot={"end"}>
                <IonImg className={"img"} src={farmactImage} />
            </IonButtons>
        </IonToolbar>
    );
};

export default Toolbar;