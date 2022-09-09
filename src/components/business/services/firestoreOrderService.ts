import { collection, deleteDoc, doc, getDocs, addDoc, updateDoc } from "firebase/firestore";
import { db, getCurrentUser } from "../../../firebase";
import { Order } from "../../ordermanagement/functions/order";
import { Observable } from "../../utility/observable";
import { firestoreTrackingService } from "./firestoreTrackingService";

class FirestoreOrderService {

    readonly orderListObservable = new Observable<Order[]>([]);

    clearOrders() {
        this.orderListObservable.set([]);
    }

    setTrackingActiveInitial() {
        this.orderListObservable.get().forEach(async (order) => {
            const user = getCurrentUser();
            if (user) {
                const orderToUpdate = doc(db, `user/${user.uid}/orders`, `${order.id}`)
                await updateDoc(orderToUpdate, { isTrackingActive: false });
            }
        });
    }

    async getOrdersFromFirebase() {
        const user = getCurrentUser()
        if (user) {
            const querySnapshot = await getDocs(collection(db, `user/${user.uid}/orders`));
            querySnapshot.forEach((doc) => {
                this.orderListObservable.set([...this.orderListObservable.get(), new Order(doc.id, doc.data().name,
                    doc.data().orderDesc, doc.data().fields, doc.data().deadline, doc.data().isTrackingActive, doc.data().stats)])
            });
        }
    }



    async addNewOrder(newOrder: Order) {
        const user = getCurrentUser()

        if (user) {
            newOrder.id = (await addDoc(collection(db, `user/${user.uid}/orders`),
                newOrder.formatOrderToFirestoreStandard())).id;
        }
        this.orderListObservable.set([...this.orderListObservable.get(), newOrder]);
    }

    async saveOrderProperties(order: Order, name: string, orderDesc: string, fields: String[], deadline: string, isTrackingActive: boolean,
        stats: { field: String | null, id: String | null, distance: number, time: number }[]) {
        await this.saveOrderPropertiesById(order.id ?? "", name, orderDesc, fields, deadline, isTrackingActive, stats);
    }

    async saveOrderPropertiesById(id: string, name: string, orderDesc: string, fields: String[], deadline: string, isTrackingActive: boolean,
        stats: { field: String | null, id: String | null, distance: number, time: number }[]) {
        const user = getCurrentUser()
        if (user) {
            const orderToUpdate = doc(db, `user/${user.uid}/orders`, `${id}`)
            await updateDoc(orderToUpdate, { name: name, orderDesc: orderDesc, fields: fields, deadline: deadline, isTrackingActive: isTrackingActive, stats: stats });
            const tempOrderList = this.orderListObservable.get();
            tempOrderList.forEach((order) => {
                if (order.id === id) {
                    order.name = name;
                    order.orderDesc = orderDesc;
                    order.fields = fields;
                    order.deadline = deadline;
                    order.isTrackingActive = isTrackingActive;
                    order.stats = stats;
                }
            });
            this.orderListObservable.set([...tempOrderList]);
            return;

        }
    }

    async deleteOrder(id: any) {
        const user = getCurrentUser();
        if (user) {
            //Zugehörige Trackings löschen
            firestoreTrackingService.getTrackings().forEach((tracking) => {
                if (tracking.orderid === id) {
                    firestoreTrackingService.deleteTracking(tracking.id);
                }
            })
            const tempOrderList = [...this.orderListObservable.get()];
            tempOrderList.forEach((order) => {
                if (order.id === id) {
                    tempOrderList.splice(tempOrderList.indexOf(order, 0), 1);
                }
            })
            this.orderListObservable.set([...tempOrderList]);

            const orderToDelete = doc(db, `user/${user.uid}/orders`, `${id}`)
            await deleteDoc(orderToDelete);
        }
    }
}

export const firestoreOrderService = new FirestoreOrderService()
