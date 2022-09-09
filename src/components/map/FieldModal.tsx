import React from "react";
import {Field} from "./functions/field";
import {
    IonAccordion,
    IonAccordionGroup,
    IonCard,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
} from "@ionic/react";
import {chevronDownOutline} from "ionicons/icons";
import {CirclePicker, HuePicker} from "react-color";

// Oberfläche des Dialogs zum Bearbeiten der Felder
export function renderFieldModificationContent(currentField: Partial<Field>, setCurrentField: React.Dispatch<React.SetStateAction<Partial<Field>>>): JSX.Element {

      return  <div>
            <IonCard>
                <IonItem>
                    <IonLabel position={"fixed"}>Feldname:</IonLabel>
                    <IonInput value={currentField.name??""} placeholder={"Name"} onIonChange={(e) => {setCurrentField({...currentField, name: e.detail.value??""})}}/>
                </IonItem>
            </IonCard>
            <IonCard>
                <IonItem>
                    <IonLabel position={"fixed"}>Nutzungsart:</IonLabel>
                    <IonInput value={currentField.typeOfUse??""} placeholder={"Nutzungsart"} onIonChange={(e) => {setCurrentField( {...currentField, typeOfUse: e.detail.value??""})}}/>
                </IonItem>
            </IonCard>
            <IonCard>
                <IonAccordionGroup>
                    <IonAccordion value="Feldfarbe" toggleIcon={chevronDownOutline}>
                        <IonItem slot="header">
                            <IonLabel>Feldfarbe</IonLabel>
                        </IonItem>
                        <IonList slot="content">
                            <IonItem>
                                <HuePicker color={(currentField?.color)} width={"100%"} onChangeComplete={(color:{hex:any}) => {setCurrentField({...currentField, color:color.hex??""})}} />
                            </IonItem>
                            <IonItem>
                                <CirclePicker color={(currentField?.color)} width={"100%"} onChangeComplete={(color:{hex:any}) => {setCurrentField({...currentField, color:color.hex??""})}} />
                            </IonItem>
                        </IonList>
                    </IonAccordion>
                </IonAccordionGroup>
            </IonCard>
        </div>
}
