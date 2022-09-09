import React, {useState} from "react";
import {closeOutline} from "ionicons/icons";
import {
    IonButton,
    IonButtons,
    IonContent,
    IonFooter,
    IonHeader, IonIcon, IonLabel,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";

export interface ICustomModal {
    //Titel der im Dialog angezeigt werden soll
    title : string
    //Methode die beim Schließen des Dialogs aufgerufen wird
    onDismiss : () => void
    //Methode die beim Speichern des Dialogs aufgerufen wird
    onFinish?: () => void
    //Optional: Sollte der Dialog eine Validierung benötigen, dann kann hier eine Methode mitgegeben werden.
    onValidate? : () => boolean
    //Fehlermeldung des Dialogs, wird unten links im Dialog angezeigt
    setInvalidMessage : () => string
    //Text des primären Buttons default:"Speichern"
    primaryButtonText? : string
    //Zweiter Button neben dem "Speichern". Wird sichtbar, sobald eine Funktion übergeben wird.
    onSecondaryClick? : () => void
    //Text auf dem zweiten Button
    secondaryButtonText? : string
}

function CustomModal(props: React.PropsWithChildren<ICustomModal>) {

    const { children } = props
    const [invalidMsg, setInvalidMsg] = useState<string>("")

    function handleInvalidMsg (msg : string) {
        setInvalidMsg(msg)
    }

    function handleDismiss() {
        setInvalidMsg("")
        props.onDismiss()
    }

    function handleValidate() : boolean {
        setInvalidMsg("")
        if(props.onValidate){
            if(props.onValidate()){
                return true
            } else {
                handleInvalidMsg(props.setInvalidMessage())
                return false
            }
        } else {
            return true
        }
    }

    function handleFinish() {
        if (handleValidate()){
            if(props.onFinish){
                props.onFinish()
            }
        }
    }

    function handleSecondaryClick () {
        if(props.onSecondaryClick){
            props.onSecondaryClick()
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        {props.title}
                    </IonTitle>
                    <IonButtons slot={"end"}>
                        <IonIcon size={"large"} icon={closeOutline} className={"exitButtonModal"} onClick={handleDismiss}/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {children}
            </IonContent>
            <IonFooter>
                <IonToolbar>
                    <IonButtons slot={"end"}>
                        {(props.onSecondaryClick) ? <IonButton onClick={() => handleSecondaryClick()}>{props.secondaryButtonText??"Abbrechen"}</IonButton> : null}
                        {(props.onFinish) ? <IonButton onClick={() => handleFinish()}>{props.primaryButtonText??"Speichern"}</IonButton> : null }
                    </IonButtons>
                    <IonButtons slot={"start"}>
                        {(invalidMsg !== "") ? <IonLabel color={"danger"}>{invalidMsg}</IonLabel>:null}
                    </IonButtons>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    )
}

export default CustomModal
