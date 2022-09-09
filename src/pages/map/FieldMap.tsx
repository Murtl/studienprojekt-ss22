import React, {useState} from 'react'
import {DrawingManager, GoogleMap, useLoadScript} from '@react-google-maps/api';
import {
    IonContent,
    IonPage, useIonModal, useIonViewWillEnter
} from "@ionic/react";
import {mapServiceGlobal} from '../../components/business/services/mapService';
import CustomModal from "../../components/utility/CustomModal";
import {renderFieldModificationContent} from "../../components/map/FieldModal";
import {Field} from "../../components/map/functions/field";
import { firestoreFieldService } from '../../components/business/services/firestoreFieldsService';
import { loadBaseData } from '../../components/business/services/loadBaseData';
import { renderFieldsOnMap } from '../../components/map/functions/renderFieldsOnMap';


const containerStyle = {
    width: '99%',
    height: '99%'
};

const startViewOnMap = {
    lat: 48.396814679719306,
    lng: 10.9617247749589
};
const googlemapsLibraries: any = ['drawing'];

const FieldMap: React.FC= () => {

    useIonViewWillEnter(() => {
        renderFieldsOnMap(firestoreFieldService.fieldListObservable.get());
    })

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: 'AIzaSyAzgN_hxhTPmlbOk_TDzKhJnyljNmqtzyk',
        libraries: googlemapsLibraries
    })

    async function onPolygonComplete(polygon: google.maps.Polygon) {
        polygon.setMap(null)
        setNewField({color: "#000000", form: polygon})
        presentModal()
    }

    const [newField, setNewField] = useState<Partial<Field>>({})


    const [presentModal, dismissModal] = useIonModal(CustomModal, {
        title: "Feld anlegen",
        children: renderFieldModificationContent(newField, setNewField),
        onFinish: handleFinish,
        onDismiss: handleDismiss,
        onValidate: handleValidate,
        setInvalidMessage: () => {
            return "Bitte alle Felder ausfüllen"
        }
    })

    function handleValidate(): boolean {
        return !!(newField.name && newField.color && newField.typeOfUse);
    }

    async function handleFinish() {
        if (newField.name && newField.color && newField.typeOfUse && newField.form) {
            await firestoreFieldService.addNewField(new Field(newField.name, newField.form, null, -1, newField.color, newField.typeOfUse))
            dismissModal()
            newField.form.setMap(mapServiceGlobal.getMap())
        }
    }

    function handleDismiss() {
        dismissModal()
    }

    return (
        <IonPage>
            <IonContent>
                {(isLoaded) ?
                    <GoogleMap
                        mapContainerClassName={'div'}
                        mapContainerStyle={containerStyle}
                        center={startViewOnMap}
                        zoom={10}
                        onLoad={async (map) => {
                            mapServiceGlobal.setMap(map);
                            loadBaseData.checkloadAndRender();
                        }
                        }
                    >
                        <DrawingManager
                            drawingMode={null}
                            onPolygonComplete={onPolygonComplete}
                            options={{
                                drawingControlOptions: {
                                    position: google.maps.ControlPosition.TOP_CENTER,
                                    drawingModes: [google.maps.drawing.OverlayType.POLYGON]
                                }
                            }}
                        />
                        <></>
                    </GoogleMap>
                    : <h2>Map goes here!</h2>}

            </IonContent>
        </IonPage>
    )
}

export default FieldMap
