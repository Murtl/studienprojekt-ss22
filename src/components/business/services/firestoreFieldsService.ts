import { collection, deleteDoc, doc, getDocs, addDoc, updateDoc } from "firebase/firestore";
import { db, getCurrentUser } from "../../../firebase";
import { Field } from "../../map/functions/field";
import { showInfoPopUp } from "../../map/functions/showInfoPopUpOnMap";
import { Observable } from "../../utility/observable";
import { infoWindowGlobal } from "./infoWindowService";

class FirestoreFieldService {

    readonly fieldListObservable = new Observable<Field[]>([]);
    //nötig für die Searchbar um alten Stand wiederherzustellen
    backupFieldList = new Array<Field>();
    //nötig um neue Felder direkt zu filtern bei vorhandenen Filter!
    readonly filterNewFieldObservable = new Observable<number>(0);

    clearFields() {
        this.fieldListObservable.set([]);
    }

    async getFieldsFromFirebase() {
        const user = getCurrentUser()
        if (user) {
            const querySnapshot = await getDocs(collection(db, `user/${user.uid}/fields`));
            querySnapshot.forEach((doc) => {
                this.fieldListObservable.set([...this.fieldListObservable.get(), new Field(doc.data().name,
                    new google.maps.Polygon({ paths: doc.data().cornerpoints }), doc.id, doc.data().hectars, doc.data().color, doc.data().typeOfUse)])
            });
        }
    }
    
    async addNewField(newField: Field) {
        const user = getCurrentUser()
        if (user) {
            newField.id = (await addDoc(collection(db, `user/${user.uid}/fields`),
                newField.formatFieldToFirestoreStandard())).id;
        }
        newField.form.addListener("click", (event: any) => {
            showInfoPopUp(newField, event);
        });
        this.fieldListObservable.set([...this.fieldListObservable.get(), newField]);
        this.backupFieldList.push(newField);
        this.filterNewFieldObservable.set(this.filterNewFieldObservable.get() + 1);
    }

    async saveFieldProperties(field: Field, name: string, typeOfUse: string, color: string) {
        await this.saveFieldPropertiesById(field.id ?? "", name, typeOfUse, color)
    }

    async saveFieldPropertiesById(id: string, name: string, typeOfUse: string, color: string) {
        const user = getCurrentUser()
        if (user) {
            const fieldToUpdate = doc(db, `user/${user.uid}/fields`, `${id}`)
            await updateDoc(fieldToUpdate, { name: name, typeOfUse: typeOfUse, color: color });
            const tempFieldList = this.fieldListObservable.get();
            tempFieldList.forEach((element) => {
                if (element.id === id) {
                    element.name = name;
                    element.nameTag.setLabel(name)
                    element.typeOfUse = typeOfUse;
                    element.color = color;
                    element.form.setOptions({ fillColor: color })
                }
            });
            this.fieldListObservable.set([...tempFieldList]);
            if (infoWindowGlobal.getInfoWindow() !== undefined) {
                infoWindowGlobal.getInfoWindow().close();
            }
            return;

        }
    }

    async deleteField(id: any) {
        console.log(id);
        const user = getCurrentUser();
        if (user) {
            const tempFieldList = [...this.fieldListObservable.get()];
            tempFieldList.forEach((field) => {
                if (field.id === id) {
                    field.form.setMap(null);
                    field.nameTag.setMap(null);
                    this.backupFieldList.splice(this.backupFieldList.indexOf(field, 0), 1);
                    tempFieldList.splice(tempFieldList.indexOf(field, 0), 1);
                }
            })
            this.fieldListObservable.set([...tempFieldList]);

            const fieldToDelete = doc(db, `user/${user.uid}/fields`, `${id}`)
            await deleteDoc(fieldToDelete);
        }
        if (infoWindowGlobal.getInfoWindow() !== undefined) {
            infoWindowGlobal.getInfoWindow().close();
        }
    }
}

export const firestoreFieldService = new FirestoreFieldService()
