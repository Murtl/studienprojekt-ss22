import {firestoreFieldService} from "../../business/services/firestoreFieldsService";

export function getFieldName(currentFieldId: string) : string{
    let name = "";
    firestoreFieldService.backupFieldList.forEach(value => {
        if (value.id === currentFieldId){
            name = value.name
            return;
        }
    })
    return name;
}