import React, { useEffect, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import {
    IonCard,
    IonIcon,
    IonContent,
    IonHeader,
    IonPage,
    IonCardContent,
    IonCardHeader,
    IonLabel,
    IonButton,
    IonCol,
    IonGrid,
    IonRow,
    useIonViewDidLeave,
    useIonViewWillEnter,
    useIonAlert,
    useIonModal, IonSegment
} from "@ionic/react";
import Toolbar from "../../components/Toolbar";
import Constants from "../../components/utility/constants";
import { firestoreOrderService } from "../../components/business/services/firestoreOrderService";
import { arrowBack, trashOutline } from "ionicons/icons";
import { orderServiceGlobal } from "../../components/business/services/orderService";
import { firestoreTrackingService } from "../../components/business/services/firestoreTrackingService";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { firestoreFieldService } from "../../components/business/services/firestoreFieldsService";
import { mapServiceGlobal } from "../../components/business/services/mapService";
import { fitBoundsOnOrderMap, fitTrackingsOnOrderMap } from "../../components/ordermanagement/functions/fitBoundsOnOrderMap";
import { RenderStatsContent } from "../../components/ordermanagement/StatsModal";
import CustomModal from "../../components/utility/CustomModal";
import SpeedLegendBar from "../../components/ordermanagement/SpeedLegendBar";

function displayFieldsForOrder(fields: String[]) {
    let tst = "";
    if (fields !== undefined) {
        for (let i = 0; i < fields.length; i++) {
            if (i === fields.length - 1) {
                tst = tst + fields[i];
            } else {
                tst = tst + fields[i] + ", "
            }
        }
    }
    return tst;
}

const containerStyle = {
    width: '99%',
    height: '99%'
};

const startViewOnMap = {
    lat: 48.396814679719306,
    lng: 10.9617247749589
};
const googlemapsLibraries: any = ['drawing'];

const OrderDes: React.FC<RouteComponentProps> = () => {

    useIonViewWillEnter(() => {
        if (orderServiceGlobal.getOrder() === undefined) {
            presentAlert({
                header: 'Fallback',
                message: 'Keine Order mehr ausgewählt!',
                buttons: [
                    { text: 'Ok' }
                ]
            }
            )
            history.push(Constants.ORDER_MANAGEMENT.path)
        } else {
            if (mapServiceGlobal.getOrderMap() !== null) {
                loadFieldsForOrder(mapServiceGlobal.getOrderMap());
                loadTrackingsForOrder()
            }
        }

    });

    const [minMax, setMinMax] = useState<number[]>([0, 50])
    useEffect(() => {
        firestoreTrackingService.setMinMax(minMax);
        loadTrackingsForOrder()
    }, [minMax]);


    useIonViewDidLeave(() => {
        firestoreFieldService.backupFieldList.forEach((field) => {
            field.form?.setMap(mapServiceGlobal.getMap());
            field.nameTag?.setMap(mapServiceGlobal.getMap());
        })
    });


    const [presentAlert] = useIonAlert()

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyAzgN_hxhTPmlbOk_TDzKhJnyljNmqtzyk',
        libraries: googlemapsLibraries
    })
    const history = useHistory();

    const order = orderServiceGlobal.getOrder()

    function loadFieldsForOrder(map: any) {
        if (orderServiceGlobal.getOrder() !== undefined) {
            orderServiceGlobal.getOrder().fields.forEach((fieldname) => {
                firestoreFieldService.backupFieldList.forEach((field) => {
                    if (fieldname === field.name) {
                        field.form.setMap(map);
                        field.nameTag.setMap(map);
                    }
                })
            })
        }
    }

    function loadTrackingsForOrder() {
        if (orderServiceGlobal.getOrder() !== undefined) {
            firestoreTrackingService.clearTrackings()
            firestoreTrackingService.getTrackingsFromFirebase()
        }
    }

    const [present] = useIonAlert()

    function handleDelete() {
        present({
            header: 'Löschen',
            message: 'Soll der Eintrag "' + order.name + '" wirklich gelöscht werden?',
            buttons: [
                { text: 'Abbrechen' },
                {
                    text: 'Löschen', handler: () => {
                        firestoreOrderService.deleteOrder(order.id)
                        history.push(Constants.ORDER_MANAGEMENT.path)
                    }
                }
            ]
        }
        )
    }

    const [presentStatisticModal, dismissStatisticModal] = useIonModal(CustomModal, {
        title: "Statistiken anzeigen",
        children: RenderStatsContent(),
        onDismiss: handleDismiss,
    })


    function handleDismiss() {
        dismissStatisticModal()
    }

    return (
        <IonPage id={Constants.MAIN_CONTAINER_NAME}>
            <IonHeader>
                <Toolbar title={Constants.ORDER_MANAGEMENT.displayName} />
            </IonHeader>
            <IonContent>
                <IonCard>
                    <IonCardHeader>
                        <IonGrid className={"ion-padding"}>
                            <IonRow>
                                <IonCol size={"2"}>
                                    <IonIcon className={"btn-primary detail-header"} icon={arrowBack} color="primary" onClick={() => history.push(Constants.ORDER_MANAGEMENT.path)} />
                                </IonCol>
                                <IonCol size={"8"}>
                                    <IonLabel className={"ion-text-center detail-header"}>{order?.name}</IonLabel>
                                </IonCol>
                                <IonCol size={"2"}>
                                    <IonIcon icon={trashOutline} className={"btn-danger ion-float-end detail-header "} color={"danger"} onClick={() => { handleDelete() }} />
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                        <IonSegment />
                    </IonCardHeader>
                    <IonCardContent>
                        <IonGrid>
                            <IonRow>
                                <IonCol size={"12"} sizeXl={"2"} sizeMd={"3"}>
                                    <IonLabel className={"ion-float-start ion-float-md-right ion-float-xl-right flex-txt-desc"}>Tätigskeitsbeschreibung</IonLabel>
                                </IonCol>
                                <IonCol size={"12"} sizeXl={"10"} sizeMd={"9"}>
                                    <IonLabel className={"flex-txt"} >{order?.orderDesc}</IonLabel>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol size={"12"} sizeXl={"2"} sizeMd={"3"}>
                                    <IonLabel className={"ion-float-start ion-float-md-right ion-float-xl-right flex-txt-desc"}>Zu bearbeitende Felder</IonLabel>
                                </IonCol>
                                <IonCol size={"12"} sizeXl={"10"} sizeMd={"9"}>
                                    <IonLabel className={"flex-txt"} >{displayFieldsForOrder(order?.fields)}</IonLabel>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol size={"12"} sizeXl={"2"} sizeMd={"3"}>
                                    <IonLabel className={"ion-float-start ion-float-md-right ion-float-xl-right flex-txt-desc"}>Geplanter Zeitraum</IonLabel>
                                </IonCol>
                                <IonCol size={"12"} sizeXl={"10"} sizeMd={"9"}>
                                    <IonLabel className={"flex-txt"}> {order?.deadline}</IonLabel>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol className={"ion-align-self-center"} size={"12"} sizeXl={"2"} sizeMd={"3"}>
                                    <IonLabel className={"ion-float-start ion-float-md-right ion-float-xl-right flex-txt-desc"}>GPS-Tracking</IonLabel>
                                </IonCol>
                                <IonCol size={"12"} sizeXl={"10"} sizeMd={"9"}>
                                    <div className={"flex-container"}>
                                        <IonButton className={"flex-button"} onClick={async () => {
                                            await firestoreTrackingService.startTracking(order);
                                            firestoreTrackingService.getCurrentPosition().then((cords) => { fitBoundsOnOrderMap(new google.maps.LatLng(cords.latitude, cords.longitude)); })
                                        }}>Starten</IonButton>
                                        <IonButton className={"flex-button"} color={"warning"} onClick={() => { firestoreTrackingService.stopAndaddTrackingAndSaveToFirebase(order) }}>Beenden</IonButton>
                                    </div>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol className={"ion-align-self-center"} size={"12"} sizeXl={"2"} sizeMd={"3"}>
                                    <IonLabel className={"ion-float-start ion-float-md-right ion-float-xl-right flex-txt-desc"}>Aktionen</IonLabel>
                                </IonCol>
                                <IonCol size={"12"} sizeXl={"10"} sizeMd={"9"}>
                                    <div className={"flex-container"}>
                                        <IonButton className={"flex-button"} color={"tertiary"} onClick={() => { fitTrackingsOnOrderMap(order) }}>Trackings Anzeigen</IonButton>
                                        <IonButton className={"flex-button"} color={"tertiary"} onClick={() => { presentStatisticModal() }}>Statistik anzeigen</IonButton>
                                    </div>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol className="map">
                                    {(isLoaded) ?
                                        <GoogleMap
                                            mapContainerStyle={containerStyle}
                                            center={startViewOnMap}
                                            zoom={10}
                                            onLoad={(map) => {
                                                mapServiceGlobal.setOrderMap(map);
                                            }}
                                        >
                                            <></>
                                        </GoogleMap>
                                        : <h2>Map goes here!</h2>
                                    }
                                </IonCol>
                            </IonRow>
                            <SpeedLegendBar minMax={minMax} setMinMax={setMinMax} />
                        </IonGrid>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    )
}

export default OrderDes
