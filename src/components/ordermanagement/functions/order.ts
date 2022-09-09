import { firestoreFieldService } from "../../business/services/firestoreFieldsService";
import { firestoreTrackingService } from "../../business/services/firestoreTrackingService";

export class Order {
    id?: string | null;
    name: string;
    orderDesc: string;
    fields: String[];
    deadline: string;
    isTrackingActive: boolean;
    stats: { field: String | null, id: String | null, distance: number, time: number }[];


    constructor(id: string | null, name: string, orderDesc: string, fields: String[], deadline: string,
        isTrackingActive: boolean, stats: { field: String | null, id: String | null, distance: number, time: number }[] | null) {
        if (id !== null) {
            this.id = id;
        }
        this.name = name;
        this.orderDesc = orderDesc;
        this.fields = fields;
        this.deadline = deadline;

        if (stats === null) {
            this.stats = [];
            this.stats[0] = { field: null, id: null, distance: 0, time: 0 };

            let counter = 1;

            fields.forEach(element => {
                firestoreFieldService.backupFieldList.forEach((field) => {
                    if(field.name === element){
                        this.stats[counter] = { field: element, id: field.id, distance: 0, time: 0 };
                    }
                })
                counter = counter + 1;
            });
        }
        else {
            this.stats = stats;
        }


        //wenn quasi die Seite neugeladen wird, dann wird der Watcher ja gelöscht und so halten wir die Anzeige richtig!
        //Bei hin und her switchen, ist der watcher ja aktiv und deshalb wird eben wieder so die Anzeige richtig gehalten!
        if (firestoreTrackingService.getWatcher()) {
            this.isTrackingActive = isTrackingActive;
        } else {
            this.isTrackingActive = false;
        }

    }

    formatOrderToFirestoreStandard() {
        return {
            name: this.name,
            orderDesc: this.orderDesc,
            fields: this.fields,
            deadline: this.deadline,
            isTrackingActive: this.isTrackingActive,
            stats: this.stats
        }
    }

    updateStats(lat1: number | undefined, lng1: number | undefined, timeStamp1: number | undefined, field1: string | null,
        lat2: number | undefined, lng2: number | undefined, timeStamp2: number | undefined, field2: string | null) {

        let time: number | undefined;
        let distance: number | undefined;
        let dX: number;
        let dY: number;



        if (timeStamp1 !== undefined && timeStamp2 !== undefined && lat1 !== undefined && lat2 !== undefined && lng1 !== undefined
            && lng2 !== undefined) {
            time = timeStamp2 - timeStamp1

            //kompf.de/gps/distcalc.html
            dX = 111.3 * Math.cos((lat1 + lat2) / 2 * 0.01745) * (lng1 - lng2);
            dY = 111.3 * (lat1 - lat2);
            distance = Math.sqrt(dX * dX + dY * dY);

            for (let i = 0; i < this.stats.length; i++) {

                if (this.stats[i].id === field2) {
                    this.stats[i].time += time;
                    this.stats[i].distance += distance;
                }
            }

        }

    }

    getFormatedStats() {
        let formatedStats = JSON.parse(JSON.stringify(this.stats));
        if (formatedStats !== undefined) {
            formatedStats.forEach((element: { distance: number; time: number; }) => {
                
                element.distance = Math.round(element.distance * 1000);
            
                element.time = element.time / 1000 / 60;
                let m;
                m = Number((Math.abs(element.time) * 100).toPrecision(15));
                element.time = Math.round(m) / 100 * Math.sign(element.time);


            });
        }
        formatedStats[0].field = "kein Feld";
        return formatedStats;
    }
}





