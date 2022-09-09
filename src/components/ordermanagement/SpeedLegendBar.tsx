import React, {useState} from "react";
import {IonCol, IonRow, useIonModal} from "@ionic/react";
import CustomModal from "../utility/CustomModal";
import {renderSpeedOptions} from "./functions/SpeedModal";

interface speedProps{
    minMax: number[],
    setMinMax: React.Dispatch<React.SetStateAction<number[]>>
}

const SpeedLegendBar: React.FC<speedProps> = (props) => {

    const [newMinMax, setNewMinMax] = useState<number[]>([0,50])

    const [presentSpeedModal, dismissSpeedModal] = useIonModal(CustomModal, {
        title: "MinMax Speed ändern",
        children: renderSpeedOptions(newMinMax, setNewMinMax),
        onDismiss: handleDismiss,
        onvalidate: validateSpeed(newMinMax),
        onFinish: handleFinish
    })
    function handleDismiss() {dismissSpeedModal()}

    function validateSpeed(minMax: number[]){
        return (minMax[0] < minMax[1] && minMax[0] >= 0);
    }

    function handleFinish() {
        props.setMinMax(newMinMax)
        dismissSpeedModal()
    }

    return (
        <IonRow>
            <IonCol>
                <div style={{ background: "linear-gradient(0.25turn, #00FF00FF, #FFFF00FF, #FF0000FF)", color: "black", height: "20px", width:"99%"}} onClick={() => {presentSpeedModal()}}>
                    <span style={{position: "absolute", left: "10px"}}>{props.minMax[0]} km/h</span>
                    <span style={{position: "absolute", right: "20px"}}>{props.minMax[1]} km/h</span>
                </div>
            </IonCol>
        </IonRow>
    );
};

export default SpeedLegendBar;