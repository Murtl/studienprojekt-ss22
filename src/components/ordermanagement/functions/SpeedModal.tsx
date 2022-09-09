import React from "react";
import {
    IonCard,
    IonInput,
    IonItem,
    IonLabel,
} from "@ionic/react";

export function renderSpeedOptions(currentMinMax: number[], setCurrentMinMax: React.Dispatch<React.SetStateAction<number[]>>): JSX.Element {

    return <div>
        <IonCard>
            <IonItem>
                <IonLabel>Minimum (größer als 0)</IonLabel>
                <IonInput type="number" placeholder={currentMinMax[0].toString()} onIonChange={(e) => { setCurrentMinMax([Number.parseInt(e.detail.value??"-1"), currentMinMax[1]]) }}/>
            </IonItem>
        </IonCard>
        <IonCard>
            <IonItem>
                <IonLabel>Maximum (größer als Minimum)</IonLabel>
                <IonInput type="number" placeholder={currentMinMax[1].toString()} onIonChange={(e) => { setCurrentMinMax([currentMinMax[0], Number.parseInt(e.detail.value??"-1")]) }}/>
            </IonItem>
        </IonCard>


    </div>
}