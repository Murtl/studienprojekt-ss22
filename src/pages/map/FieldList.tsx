import React, { useEffect, useState } from "react";
import {
    IonCard, IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonSearchbar,
    IonTitle, useIonAlert, useIonModal
} from "@ionic/react";
import { useObservable } from "../../components/utility/observableHock";
import { firestoreFieldService } from "../../components/business/services/firestoreFieldsService";
import { createOutline ,trashOutline} from "ionicons/icons";
import { fitBoundsOnClick } from "../../components/map/functions/fitBoundsOnClick";
import { Field } from "../../components/map/functions/field";
import CustomModal from "../../components/utility/CustomModal";
import {renderFieldModificationContent} from "../../components/map/FieldModal";


const FieldList: React.FC = () => {

    //Aktuell ausgewähltes Feld
    const [currentField, setCurrentField] = useState<Partial<Field>>({})
    //Felder vom Observer auf die FieldList hört!
    const fields = useObservable(firestoreFieldService.fieldListObservable);

    //Observer der useEffect anwendet bei direkter Filterung von neuen Feldern
    const filterNewField = useObservable(firestoreFieldService.filterNewFieldObservable);

    //Suchleiste mit useState und useEffect zum Filtern bei Änderung!
    const [searchField, setSearchField] = useState("");

    const [presentAlert] = useIonAlert()

    function handleDelete(field : Field) {
        presentAlert({
                header: 'Löschen',
                message: 'Soll der Eintrag "'+ field.name +'" wirklich gelöscht werden?',
                buttons: [
                    {text: 'Abbrechen'  },
                    {text: 'Löschen', handler: (d) => {
                            firestoreFieldService.deleteField(field.id)
                        }}
                ]
            }
        )
    }

    const [presentModal, dismissModal] = useIonModal(CustomModal, {
        title: "Feld bearbeiten",
        children: renderFieldModificationContent(currentField, setCurrentField),
        onFinish : handleFinish,
        onDismiss : handleDismiss,
        onValidate : handleValidate,
        setInvalidMessage: () => {return "Bitte alle Felder ausfüllen"},
    })
    function handleValidate() : boolean {
        return !!(currentField.id && currentField.name && currentField.color && currentField.typeOfUse);
    }

    async function handleFinish() {
        if (currentField.id && currentField.name && currentField.color && currentField.typeOfUse) {
            await firestoreFieldService.saveFieldPropertiesById(currentField.id, currentField.name, currentField.typeOfUse, currentField.color)
            dismissModal()
        }
    }

    function handleDismiss(){
        dismissModal()
    }

    useEffect(() => {
        if (searchField !== '') {
            firestoreFieldService.fieldListObservable.set(
                fields.filter((field: Field) => {
                    return field.name.toLowerCase().indexOf(searchField.toLowerCase()) > -1
                        || field.typeOfUse.toLowerCase().indexOf(searchField.toLowerCase()) > -1
                     })
                );
        }
        else {
            firestoreFieldService.fieldListObservable.set(firestoreFieldService.backupFieldList);
        }
    }, [searchField, filterNewField]);

    function handleDetailView(field: Field) {
        setCurrentField(field)
        presentModal()
    }
    return (
        <IonPage>
            <IonCard className={"ion-no-margin"}>
                <IonTitle className="ion-padding detail-header">Felder</IonTitle>
                <IonSearchbar placeholder='Feld oder Nutzungsart eingeben...' value={searchField} onIonChange={e => setSearchField(e.detail.value!)}> </IonSearchbar>
            </IonCard>
            <IonContent>
                <IonList className={""}>
                    {fields.map((field : Field) => {
                        return (<IonItem key={field.id} className={"fieldListRow"}>

                            <IonLabel onClick={() => fitBoundsOnClick(field.id, fields)}>
                                <h2 className={"h2"}>{field.name}</h2>
                                <h3 className={"h3"}>{field.typeOfUse}</h3>
                            </IonLabel>

                            <IonIcon className={"btn-secondary"} icon={createOutline} onClick={() => {handleDetailView(field)}}/>
                            <IonIcon className={"btn-danger"} icon={trashOutline} color={"danger"} onClick={() => handleDelete(field)}/>
                        </IonItem>)
                    })}
                </IonList>
            </IonContent>
        </IonPage>
    )
}

export default FieldList
