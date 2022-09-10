import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { IonCard, IonItem, IonIcon, IonContent, IonHeader, IonPage, IonCardContent, IonCardHeader, IonLabel, useIonModal, useIonViewWillEnter, useIonViewDidEnter } from "@ionic/react";
import Toolbar from "../../components/Toolbar";
import Constants from "../../components/utility/constants";
import { OrderList } from "./OrderList";
import CustomModal from "../../components/utility/CustomModal";
import { Order } from "../../components/ordermanagement/functions/order";
import { RenderOrderModificationContent } from "../../components/ordermanagement/OrderModal";
import { firestoreOrderService } from "../../components/business/services/firestoreOrderService";
import { addOutline } from "ionicons/icons";
import "./OrderManagement.css";
import { loadBaseData } from "../../components/business/services/loadBaseData";
import { useLoadScript } from "@react-google-maps/api";
import { firestoreTrackingService } from "../../components/business/services/firestoreTrackingService";


const googlemapsLibraries: any = ['drawing'];

const OrderManagement: React.FC<RouteComponentProps> = () => {
    
    useIonViewWillEnter(() =>{
        firestoreOrderService.clearOrders();
    } );

    useIonViewDidEnter(async ()=>{
        await firestoreOrderService.getOrdersFromFirebase();
        loadBaseData.checkLoad();
        if(!firestoreTrackingService.getWatcher()){
            firestoreOrderService.setTrackingActiveInitial();
        }
    })

    useLoadScript({
        googleMapsApiKey: 'API-Key',
        libraries: googlemapsLibraries
    })

    const [newOrder, setNewOrder] = useState<Partial<Order>>({})

    const [presentModal, dismissModal] = useIonModal(CustomModal, {
        title: "Auftrag anlegen",
        children: RenderOrderModificationContent(newOrder, setNewOrder),
        onFinish: handleFinish,
        onDismiss: handleDismiss,
        onValidate: handleValidate,
        setInvalidMessage: () => { return "Bitte alle Felder ausfüllen" },
    })
    function handleValidate(): boolean {
        return !!(newOrder.name && newOrder.orderDesc && newOrder.fields && newOrder.deadline);
    }

    async function handleFinish() {
        if (newOrder.name && newOrder.orderDesc && newOrder.fields && newOrder.deadline) {
            await firestoreOrderService.addNewOrder(new Order(null, newOrder.name, newOrder.orderDesc, newOrder.fields, newOrder.deadline, false, null));
            dismissModal()
        }
    }

    function handleDismiss() {
        dismissModal()
    }

    function handleNewOrder(){
        setNewOrder({})
        presentModal()
    }

    return (
        <IonPage id={Constants.MAIN_CONTAINER_NAME}>
            <IonHeader>
                <Toolbar title={Constants.ORDER_MANAGEMENT.displayName} />
            </IonHeader>
            <IonContent>
                <IonCard>
                    <IonCardHeader>
                        <IonItem>
                            <IonLabel>Alle Aufträge</IonLabel>
                            <IonIcon className={"btn-primary"} icon={addOutline} slot="end" color="primary" onClick={() => { handleNewOrder()}}/>
                        </IonItem>
                    </IonCardHeader>
                    <IonCardContent>
                        <OrderList />
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    )
}

export default OrderManagement
