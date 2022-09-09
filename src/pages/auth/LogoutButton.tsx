import React from "react";
import { IonButton, IonIcon, IonLabel } from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
import { getAuth, signOut } from "firebase/auth";
import "./LogoutButton.css"
import Constants from "../../components/utility/constants";

const LogoutButton: React.FC = () => {

    const auth = getAuth()

    return (
        <IonButton data-testid="logout"
            className="btn-logout"
            color={"primary"}
            expand={"full"}
            onClick={async () => {
                await signOut(auth);
                window.location.reload();
            }
            }>
            <IonIcon slot="start" icon={logOutOutline} />
            <IonLabel> {Constants.LOGOUT.displayName} </IonLabel>
        </IonButton>
    )
}

export default LogoutButton