import { renderFieldsOnMap } from "../../map/functions/renderFieldsOnMap";
import { firestoreFieldService } from "./firestoreFieldsService";

class LoadBaseData {

    static loaded: boolean;

    private async load() {
        firestoreFieldService.clearFields();
        await firestoreFieldService.getFieldsFromFirebase();
        firestoreFieldService.backupFieldList = [];
        firestoreFieldService.backupFieldList = [...firestoreFieldService.fieldListObservable.get()];
        LoadBaseData.loaded = true;
    }

    checkLoad(){
        if(LoadBaseData.loaded !== true){
            this.load();
        }
    }

    async checkloadAndRender() {
        if (LoadBaseData.loaded !== true) {
            await this.load();
        }
        renderFieldsOnMap(firestoreFieldService.fieldListObservable.get());
    }

    getLoaded(){
        return LoadBaseData.loaded;
    }

}

export const loadBaseData = new LoadBaseData()
