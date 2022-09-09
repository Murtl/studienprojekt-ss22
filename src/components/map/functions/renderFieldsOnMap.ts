import {mapServiceGlobal} from "../../business/services/mapService";
import {showInfoPopUp} from "./showInfoPopUpOnMap";

export function renderFieldsOnMap(fields: any) {
    fields.forEach((field: any) => {
        field.form.setMap(mapServiceGlobal.getMap());
        field.nameTag.setMap(mapServiceGlobal.getMap());
        field.form.addListener("click", (event: any) => {showInfoPopUp(field, event)}
       );
    })
}

