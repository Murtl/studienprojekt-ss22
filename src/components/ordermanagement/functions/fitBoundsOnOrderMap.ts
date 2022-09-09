import { firestoreTrackingService } from "../../business/services/firestoreTrackingService";
import { mapServiceGlobal } from "../../business/services/mapService";
import { Order } from "./order";

//Event-Listener für fitBounds
export function fitBoundsOnOrderMap(path: any) {
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(path);
    mapServiceGlobal.getOrderMap()?.fitBounds(bounds);
}

//Um auf Trackings zu fitten
export function fitTrackingsOnOrderMap(order: Order) {
    //Alle trackings zum Auftrag bestimmen
    const trackingsFromOrder: any[] = [];
    firestoreTrackingService.getTrackings().forEach((tracking) => {
        if (tracking.orderid === order.id) {
            trackingsFromOrder.push(tracking);
        }
    })
    if (trackingsFromOrder.length === 0) {
        alert("Keine Trackings vorhanden!");
    } else {
        let path: google.maps.LatLng;
        const bounds = new google.maps.LatLngBounds();
        trackingsFromOrder.forEach((trackings) => {
            trackings.coords.forEach((element: any) => {
                path = new google.maps.LatLng(element.latitude, element.longitude);
                bounds.extend(path);
            })
        })
        mapServiceGlobal.getOrderMap()?.fitBounds(bounds);
    }
}