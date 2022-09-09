import React from "react";
import {RouteComponentProps} from "react-router-dom";
import {
    IonCard, IonCol,
    IonContent, IonGrid,
    IonHeader,
    IonPage, IonRow, useIonModal,
} from "@ionic/react";
import Toolbar from "../../components/Toolbar";
import Constants from "../../components/utility/constants";


const About : React.FC<RouteComponentProps> = (props) => {

    return (
        <IonPage id={Constants.MAIN_CONTAINER_NAME}>
            <IonHeader>
                <Toolbar title={Constants.ABOUT.displayName}/>
            </IonHeader>
            <IonContent>
                    <IonGrid>
                        <IonRow>
                            <IonCol size={"12"} sizeXl={"9"} sizeMd={"8"} sizeSm={"12"} sizeXs={"12"}>
                                <IonCard className={"ion-padding"}>
                                    <h1>GPS Tracking für landwirtschaftliche Betriebe</h1>
                                    <p>Entwicklung einer Cross-Platform App zum Aufzeichnen von GPS-Trackings für landwirtschaftliche Betriebe.</p>
                                    <p>Auch in der Landwirtschaft werden zunehmend neue, digitale Lösungen benötigt. Diese sollen einerseits bisher analog ablaufende Prozesse unterstützen, andererseits aber auch vollständig neue Applikationen ermöglichen.
                                        An dieser Stelle setzt unsere Cross-Platform App an. Sie schafft die Möglichkeit, während der Durchführung eines Auftrags – zum Beispiel dem Pflügen eines Feldes - mit dem eigenen Tablet oder Mobiltelefon die Fahrtstrecke tracken zu lassen.</p>
                                    <h4>Funktionen:</h4>
                                    <p>Die Hauptfunktionalität bildet das GPS-Tracking. Dieses kann vom Benutzer zu einem Auftrag gestartet werden und zeichnet dann die aktuelle Position auf. Nach dem Beenden der Fahrt kann der User die gefahrene Route sowie die dabei angefahrenen Felder einsehen. Zudem wird mittels Geo-Fencing ermittelt, welche Zeit und welche Distanz der Fahrer in den jeweiligen Feldern verbringt.</p>
                                    <p>Die Grundlage hierfür bildet einerseits die in die App integrierte Ackerschlagkartei, in welcher die Benutzer Ihre Felder mit den exakten Koordinaten der Eckpunkte hinterlegen können. Andererseits enthält die Cross-Platform App eine Auftragsverwaltung. In dieser ist es möglich, Auftrage anzulegen, zu welchen die GPS-Trackings aufgezeichnet werden.</p>
                                    <h4>Verwendete Technologien:</h4>
                                    <p>Um leicht eine responsive Website bauen zu können wurde die JavaScript-Softwarebibliothek React verwendet. In Verbindung mit Ionic und Capacitor kann die App einfach auch für iOS und Android verfügbar gemacht werden.
                                        Die Kartendarstellung erfolgte mittels der Google Maps-API. Zuletzt wurde die No-SQL-Datenbank Firestore von Google verwendet, welche nicht nur die Datenspeicherung, sondern auch eine Benutzerverwaltung ermöglicht.</p>

                                </IonCard>
                            </IonCol>
                            <IonCol size={"12"} sizeXl={"3"} sizeMd={"4"} sizeSm={"12"} sizeXs={"12"}>
                                <IonCard className={"ion-padding"}>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol>Jahr:</IonCol>
                                            <IonCol>2022</IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol>Studierende:</IonCol>
                                            <IonCol>Simon Fiedler, Philipp Franke, Michael Hippeli, Maximilian Landenberger, Stefan Lindermeir, Michael Mertl, Gregor Pfister, Jana Schweizer</IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol>Semester:</IonCol>
                                            <IonCol>4. Semester</IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol>Studiengang:</IonCol>
                                            <IonCol>Wirtschaftsinformatik</IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol>Supervision:</IonCol>
                                            <IonCol>Prof. Dr. Arne Mayer</IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol>Technologien:</IonCol>
                                            <IonCol>Cross-Platform, React, Ionic, Firebase, GPS-Tracking, Landwirtschaft, FarmAct</IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default About
