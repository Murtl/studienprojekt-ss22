import { Order } from "../../ordermanagement/functions/order";
import { Tracking } from "../../ordermanagement/functions/tracking";
import { Geolocation } from '@capacitor/geolocation';
import { db, getCurrentUser } from "../../../firebase";
import { addDoc, collection, query, where, deleteDoc, doc, getDocs } from "firebase/firestore";
import { firestoreOrderService } from "./firestoreOrderService";
import { mapServiceGlobal } from "./mapService";
import { orderServiceGlobal } from "./orderService";
import { positionInFieldOfCurrentOrder } from "../../ordermanagement/functions/positionInFieldOfCurrentOrder";
import { getFieldName } from "../../ordermanagement/functions/getFieldName";
import { getColorFromSpeed} from "../../ordermanagement/functions/getColorFromSpeed";

class FirestoreTrackingService {

    static coordinatesFromWatcher: { latitude: number | undefined; longitude: number | undefined; timestamp: number | undefined; fieldId: string | null; speed: number | null }[] = [];
    static currentOrder: Order;
    static trackings: Tracking[] = [];
    static polyLines: any[] = [];
    static watcherActive: boolean = false;
    static currentPositionMarker: google.maps.Marker;
    static watcherId: string;
    static currentField: string | null = null;
    static minMax: number[] = [0, 50];

    clearTrackings() {
        FirestoreTrackingService.polyLines.forEach((element) => {
            element.polyline.setMap(null)
        })
        FirestoreTrackingService.reset()
    }

    getWatcher() {
        return FirestoreTrackingService.watcherActive;
    }

    getTrackings() {
        return FirestoreTrackingService.trackings;
    }

    async getCurrentPosition() {
        return (await Geolocation.getCurrentPosition()).coords;
    }

    async getTrackingsFromFirebase() {
        const user = getCurrentUser()
        if (user) {
            const q = query(collection(db, `user/${user.uid}/trackings`), where("orderid", "==", orderServiceGlobal.getOrder().id))
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                FirestoreTrackingService.trackings.push(new Tracking(doc.id, doc.data().orderid, doc.data().coords));
                for (let i = 0; i < doc.data().coords.length - 1; i++) {
                    this.addPolylineOnMap([{
                        lat: parseFloat(doc.data().coords[i].latitude),
                        lng: parseFloat(doc.data().coords[i].longitude)
                    },
                        {
                            lat: parseFloat(doc.data().coords[i + 1].latitude),
                            lng: parseFloat(doc.data().coords[i + 1].longitude)
                        }], doc.data().orderid, doc.data().coords[i + 1].speed);
                }
            });
            if (FirestoreTrackingService.coordinatesFromWatcher.length >= 2 && FirestoreTrackingService.currentOrder.id === orderServiceGlobal.getOrder().id) {
                for (let i = 0; i < FirestoreTrackingService.coordinatesFromWatcher.length - 1; i++) {
                    this.addPolylineOnMap([{
                        lat: FirestoreTrackingService.coordinatesFromWatcher[i].latitude,
                        lng: FirestoreTrackingService.coordinatesFromWatcher[i].longitude
                    }, {
                        lat: FirestoreTrackingService.coordinatesFromWatcher[i + 1].latitude,
                        lng: FirestoreTrackingService.coordinatesFromWatcher[i + 1].longitude
                    }], orderServiceGlobal.getOrder().id, FirestoreTrackingService.coordinatesFromWatcher[i + 1].speed);
                }
            }
        }

    }

    async stopAndaddTrackingAndSaveToFirebase(order: Order) {
        if (!FirestoreTrackingService.watcherActive || !order.isTrackingActive) {
            alert("Es läuft kein Tracking!");
        } else {
            if (FirestoreTrackingService.coordinatesFromWatcher.length < 2) {
                this.clearTrackings()
                this.getTrackingsFromFirebase()
                firestoreOrderService.saveOrderPropertiesById(order.id ?? "", order.name, order.orderDesc, order.fields, order.deadline, false, order.stats);
                alert("Aufzeichnung wurde beendet, aber aufgrund nicht ausreichender Tracking Daten verworfen")
            } else {
                firestoreOrderService.saveOrderPropertiesById(order.id ?? "", order.name, order.orderDesc, order.fields, order.deadline, false, order.stats);
                const newTracking = new Tracking(null, order.id, FirestoreTrackingService.coordinatesFromWatcher);
                const user = getCurrentUser()
                if (user) {
                    newTracking.id = (await addDoc(collection(db, `user/${user.uid}/trackings`),
                        newTracking.formatTrackingToFirestoreStandard())).id;
                    FirestoreTrackingService.trackings.push(newTracking);
                }
            }
            await Geolocation.clearWatch({ id: FirestoreTrackingService.watcherId });
            FirestoreTrackingService.watcherActive = false;
            FirestoreTrackingService.currentPositionMarker.setMap(null);
            FirestoreTrackingService.coordinatesFromWatcher = [];
        }
    }

    async startTracking(order: Order) {
        if (FirestoreTrackingService.watcherActive) {
            alert("Tracking läuft bereits!!!!")
        } else {
            const timeBetweenUpdates = 2500;
            let lastUpdate = 0;
            FirestoreTrackingService.currentOrder = order;

            //Fragt automatisch nach berechtigung um auf standort zuzugreifen
            FirestoreTrackingService.watcherId = await Geolocation.watchPosition({ enableHighAccuracy: true }, (position) => {
                console.log("Watch", position);
                FirestoreTrackingService.watcherActive = true;
                firestoreOrderService.saveOrderPropertiesById(order.id ?? "", order.name, order.orderDesc, order.fields, order.deadline, true, order.stats);
                //ist ne info für den user, wenn er standort nicht freigeben will, dann geht des natürlich nicht!
                if (position === null) {
                    firestoreOrderService.saveOrderPropertiesById(order.id ?? "", order.name, order.orderDesc, order.fields, order.deadline, false, order.stats);
                    alert("Standortzugriff verweigert! Bitte manuell freischalten, wenn doch GPS-Tracking gewünscht wird")
                } else {
                    if (position?.timestamp - lastUpdate >= timeBetweenUpdates) {
                        if (FirestoreTrackingService.coordinatesFromWatcher.length === 0) {
                            this.addPolylineOnMap([{ lat: position.coords.latitude, lng: position.coords.longitude }, {
                                lat: position.coords.latitude, lng: position.coords.longitude
                            }], order.id, (position.coords.speed??0) * 3.6);
                        } else {
                            this.addPolylineOnMap([{
                                lat: FirestoreTrackingService.coordinatesFromWatcher[FirestoreTrackingService.coordinatesFromWatcher.length - 1].latitude,
                                lng: FirestoreTrackingService.coordinatesFromWatcher[FirestoreTrackingService.coordinatesFromWatcher.length - 1].longitude
                            }, {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                            }], order.id, (position.coords.speed??0) * 3.6);
                            order.updateStats(FirestoreTrackingService.coordinatesFromWatcher[FirestoreTrackingService.coordinatesFromWatcher.length - 1].latitude,
                                FirestoreTrackingService.coordinatesFromWatcher[FirestoreTrackingService.coordinatesFromWatcher.length - 1].longitude,
                                FirestoreTrackingService.coordinatesFromWatcher[FirestoreTrackingService.coordinatesFromWatcher.length - 1].timestamp,
                                FirestoreTrackingService.coordinatesFromWatcher[FirestoreTrackingService.coordinatesFromWatcher.length - 1].fieldId,
                                position.coords.latitude, position.coords.longitude, position.timestamp, FirestoreTrackingService.currentField)
                        }

                        this.addCurrentPosMarker({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        }, position.coords.heading);

                        let currentFieldId = positionInFieldOfCurrentOrder({
                            lat: position?.coords.latitude,
                            lng: position?.coords.longitude
                        });

                        if (currentFieldId !== FirestoreTrackingService.currentField) {
                            let fieldname: string;
                            if (currentFieldId) {
                                fieldname = getFieldName(currentFieldId);
                                alert("Sie haben das Feld " + fieldname + " betreten!");
                            } else {
                                fieldname = getFieldName(FirestoreTrackingService.currentField ?? "");
                                alert("Sie haben das Feld " + fieldname + " verlassen!");
                            }
                            FirestoreTrackingService.currentField = currentFieldId;
                        }

                        FirestoreTrackingService.coordinatesFromWatcher.push({
                            latitude: position?.coords.latitude,
                            longitude: position?.coords.longitude,
                            timestamp: position?.timestamp,
                            fieldId: currentFieldId,
                            speed: (position?.coords.speed??0) * 3.6
                        })

                        lastUpdate = position?.timestamp;
                    }

                }

            });
        }
    }


    async deleteTracking(id: any) {
        const user = getCurrentUser();
        if (user) {
            FirestoreTrackingService.trackings.forEach((tracking) => {
                if (tracking.id === id) {
                    FirestoreTrackingService.trackings.splice(FirestoreTrackingService.trackings.indexOf(tracking, 0), 1);
                }
            })
            const trackingoDelete = doc(db, `user/${user.uid}/trackings`, `${id}`)
            await deleteDoc(trackingoDelete);
        }
    }


    addPolylineOnMap(path: any, orderid: String | null | undefined, speed: number | null) {
        const color = getColorFromSpeed(speed??0, FirestoreTrackingService.minMax[0], FirestoreTrackingService.minMax[1])
        const trackedPath = new google.maps.Polyline({
            path: path,
            geodesic: true,
            strokeColor: color
        });
        FirestoreTrackingService.polyLines.push({ polyline: trackedPath, orderid: orderid });
        this.paintRightPolyLineOnMap(orderid);
    }

    paintRightPolyLineOnMap(orderid: String | null | undefined) {
        if (orderid === orderServiceGlobal.getOrder().id) {
            FirestoreTrackingService.polyLines.forEach((element) => {
                element.polyline.setMap(mapServiceGlobal.getOrderMap());
            })
        }
    }
    
    

    addCurrentPosMarker(path: any, heading: number | null) {

        const svgMarker = {
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            fillColor: "black",
            rotation: heading,
            scale: 7,
          };

        FirestoreTrackingService.currentPositionMarker?.setMap(null);
        FirestoreTrackingService.currentPositionMarker = new google.maps.Marker({
            map: mapServiceGlobal.getOrderMap(),
            position: path,
            icon: svgMarker,
        });

        
    }


    private static reset() {
        this.trackings = [];
        this.polyLines = [];
    }

    setMinMax(minMax: number[]) {
        FirestoreTrackingService.minMax = minMax
    }
}

export const firestoreTrackingService = new FirestoreTrackingService()
