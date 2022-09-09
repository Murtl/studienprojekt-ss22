import {orderServiceGlobal} from "../../business/services/orderService";
import {firestoreFieldService} from "../../business/services/firestoreFieldsService";

export function positionInFieldOfCurrentOrder(coords: { lat: number; lng: number }): string | null {
    let fieldID : string | null = null;
    orderServiceGlobal.getOrder().fields.forEach(fieldname => {
        firestoreFieldService.backupFieldList.forEach((field) => {
            if (field.form) {
                if (field.name === fieldname) {
                    if (google.maps.geometry.poly.containsLocation(new google.maps.LatLng(coords), field.form)) {
                        fieldID = field.id;
                        return;
                    }
                }
            }
        })
    })
    return fieldID;
}
