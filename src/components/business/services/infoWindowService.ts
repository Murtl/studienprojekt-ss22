class infoWindowService {

    static infoWindow: google.maps.InfoWindow;

    setInfowWindow(infoW: google.maps.InfoWindow) {
        if (infoWindowService.infoWindow === undefined) {
            infoWindowService.infoWindow = infoW;
        } else {
            infoWindowService.infoWindow.close();
            infoWindowService.infoWindow = infoW;
        }
    }

    getInfoWindow() {
        return infoWindowService.infoWindow;
    }

}

export const infoWindowGlobal = new infoWindowService()
