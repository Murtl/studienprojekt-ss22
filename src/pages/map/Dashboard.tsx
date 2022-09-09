import {
    IonHeader,
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonCol
} from '@ionic/react';
import './Dashboard.css';
import Toolbar from "../../components/Toolbar";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import FieldMap from "./FieldMap";
import FieldList from "./FieldList";

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

const Dashboard: React.FC<RouteComponentProps> = (props) => {

    return (
        <IonPage id={"main"}>
            <IonHeader>
                <Toolbar title={"GPS-Tracking"} />
            </IonHeader>
            <IonContent>
                    <IonGrid className={"ion-padding dashboard-container"}>
                        <IonRow className={"dashboard-container"}>
                            <IonCol size={"12"} sizeXl={"9"} sizeMd={"8"} sizeSm={"12"} sizeXs={"12"}>
                                <FieldMap />
                            </IonCol>
                            <IonCol size={"12"} sizeXl={"3"} sizeMd={"4"} sizeSm={"12"} sizeXs={"12"}>
                                <FieldList/>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Dashboard;

