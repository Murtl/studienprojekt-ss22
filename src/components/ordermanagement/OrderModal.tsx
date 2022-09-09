import {
    IonCard,
    IonInput,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonCol,
    IonDatetime,
    IonIcon, IonPopover,
} from "@ionic/react";
import { Order } from "./functions/order";
import { firestoreFieldService } from "../business/services/firestoreFieldsService";
import { calendar } from 'ionicons/icons';
import { format, parseISO } from 'date-fns';


export function RenderOrderModificationContent(currentOrder: Partial<Order>, setCurrentOrder: React.Dispatch<React.SetStateAction<Partial<Order>>>): JSX.Element {
    const formatDate = (value: string) => {
        return format(parseISO(value), 'dd.MM.yyyy HH:mm');
    };

    return <div>
        <IonCard>
            <IonItem>
                <IonLabel color="primary">Kurzbeschreibung:</IonLabel>
                <IonInput placeholder={(currentOrder.name) ? currentOrder.name : "Kurzbeschreibung..."} onIonChange={(e) => { setCurrentOrder({ ...currentOrder, name: e.detail.value ?? "" }) }} />
            </IonItem>
        </IonCard>
        <IonCard>
            <IonItem>
                <IonLabel color="primary">Tätigskeitsbeschreibung:</IonLabel>
                <IonInput placeholder={(currentOrder.orderDesc) ? currentOrder.orderDesc : "Tätigskeitsbeschreibung..."} onIonChange={(e) => { setCurrentOrder({ ...currentOrder, orderDesc: e.detail.value ?? "" }) }} />
            </IonItem>
        </IonCard>
        <IonCard>
            <IonItem>
                <IonLabel color="primary">Zu bearbeitende Felder: </IonLabel>
                <IonSelect placeholder={(currentOrder.fields) ? currentOrder.fields[0].toString() : "Felder..."} multiple={true} onIonChange={(e) => setCurrentOrder({ ...currentOrder, fields: e.detail.value ?? "" })}>
                    {firestoreFieldService.backupFieldList.map((field) => {
                        return (
                            <IonSelectOption key={field.id} value={field.name}>
                                <IonLabel>{field.name}</IonLabel>
                            </IonSelectOption>
                        )
                    })}
                </IonSelect>
            </IonItem>
        </IonCard>
        <IonCard>
            <IonItem>
                <IonLabel color="primary"> Geplanter Zeitraum:</IonLabel>
                <IonCol text-center>
                    <IonLabel className="Zeitraum"> {(currentOrder.deadline) ? currentOrder.deadline : " "}</IonLabel>
                </IonCol>
                <IonButton fill="clear" id="open-date-input-2" slot="end">
                    <IonIcon icon={calendar} />
                </IonButton>
                <IonPopover trigger="open-date-input-2" showBackdrop={false}>
                    <IonDatetime
                        minuteValues={"0,5,10,15,20,25,30,35,40,45,50,55"}
                        presentation="date-time"
                        onIonChange={(e) => {
                            setCurrentOrder({ ...currentOrder, deadline: formatDate(e.detail.value!) ?? "" })
                        }}/>
                </IonPopover>
            </IonItem>
        </IonCard>
    </div>
}
