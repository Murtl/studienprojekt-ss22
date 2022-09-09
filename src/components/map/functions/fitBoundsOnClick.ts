import { mapServiceGlobal } from "../../business/services/mapService";
import {showInfoPopUp} from "./showInfoPopUpOnMap";

//Event-Listener für fitBounds
export function fitBoundsOnClick(id: any, fields: any) {
    const bounds = new google.maps.LatLngBounds();

    fields.forEach((field: any) => {
        if (field.id === id) {
            field.cornerpoints.forEach((cornerpoint: any) => {
                bounds.extend(cornerpoint);
            })
            mapServiceGlobal.getMap()?.fitBounds(bounds);
            showInfoPopUp(field)
        }
    }
    )
}