import { infoWindowGlobal } from "../../business/services/infoWindowService";
import { mapServiceGlobal } from "../../business/services/mapService";

export function showInfoPopUp(newField: any, event: any = null) {
    let contentString = "<p style='color: #0d0d0d'><b>" + newField.name + "</b><br>" +
        newField.hectars + " ha"
        +
        "<br>"
        +
        newField.typeOfUse
        +
        "<br></p>";
    infoWindowGlobal.setInfowWindow(new google.maps.InfoWindow());
    let infoWindow = infoWindowGlobal.getInfoWindow();
    infoWindow.setContent(contentString);
    infoWindow.setPosition((event)?event.latLng:newField.cornerpoints[0])
    infoWindow.open(mapServiceGlobal.getMap());
}
