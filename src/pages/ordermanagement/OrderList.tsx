import {IonIcon, IonItem, IonLabel, IonList, useIonAlert} from "@ionic/react";
import {locationOutline, trashOutline} from "ionicons/icons";
import { firestoreOrderService } from "../../components/business/services/firestoreOrderService";
import { useObservable } from "../../components/utility/observableHock";
import { useHistory } from "react-router";
import Constants from "../../components/utility/constants";
import { orderServiceGlobal } from "../../components/business/services/orderService";
import {Order} from "../../components/ordermanagement/functions/order";
import React from "react";

export const OrderList = () => {

    const orders = useObservable(firestoreOrderService.orderListObservable);

    const history = useHistory()

    const [present] = useIonAlert()

    function handleDelete(order: Order) {
        present({
                header: 'Löschen',
                message: 'Soll der Eintrag "'+ order.name +'" wirklich gelöscht werden?',
                buttons: [
                    {text: 'Abbrechen'  },
                    {text: 'Löschen', handler: () => firestoreOrderService.deleteOrder(order.id)}
                ]
            }
        )
    }

    return (
        <>
            {orders.map((order) => {
                return (
                    <IonList key={`accordion_${order.id}`}>
                        <IonItem className="buttonsOrderList">
                            <IonLabel onClick={() => {
                                history.push(Constants.ORDER_DETAILS.path);
                                orderServiceGlobal.setOrder(order);
                            }}>
                                <h2 className={"h2"}>{order.name}</h2>
                                <h3 className={"h3"}>{order.orderDesc}</h3>
                            </IonLabel>
                            {order.isTrackingActive?<IonIcon icon={locationOutline} color={"primary"} className="toggletst"/>:<></>}
                            <IonIcon className={"btn-danger"} icon={trashOutline} color={"danger"} onClick={() => handleDelete(order)} />
                        </IonItem>
                    </IonList>
                );
            })}
        </>
    );
}

