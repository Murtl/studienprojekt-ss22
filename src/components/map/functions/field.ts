import { mapServiceGlobal } from "../../business/services/mapService";

export class Field {
    id: string | null = null;
    name: string = "";
    cornerpoints?: any[];
    form: google.maps.Polygon;
    hectars: number = 0;
    color: string = "";
    typeOfUse: string = "";
    nameTag: google.maps.Marker;

    constructor(name: string, polygon: google.maps.Polygon, id: string | null = null, hectars: number = -1, color: string = "", typeOfUse: string = "", tstcase?: string) {

        if (id !== null) {
            this.id = id;
        }
        this.name = name;
        if (!(tstcase === "test")) {
            this.cornerpoints = transformPathToCPS(polygon.getPath())
        }
        this.form = polygon;
        if (hectars === -1) {
            this.calculateHectars()
        } else {
            this.hectars = hectars;
        }
        if (color !== "") {
            this.color = color;
        }
        this.form.setOptions({ fillColor: this.color });
        if (typeOfUse !== "") {
            this.typeOfUse = typeOfUse;
        }


        this.nameTag = new google.maps.Marker({
            position: this.getCenter(),
            label: this.name,
            map: mapServiceGlobal.getMap(),
            icon: null
        });

    }




    getCenter() {
        let lat = 0, lng = 0;
        if (this.cornerpoints) {
            this.cornerpoints.forEach(value => {
                lat += value.lat;
                lng += value.lng;
            })
            lat = lat / this.cornerpoints.length;
            lng = lng / this.cornerpoints.length;
        }
        return new google.maps.LatLng(lat, lng);
    }

    formatFieldToFirestoreStandard() {
        return {
            name: this.name,
            cornerpoints: this.cornerpoints,
            hectars: this.hectars,
            color: this.color,
            typeOfUse: this.typeOfUse
        }
    }

    calculateHectars() {
        if (this.form) {
            this.hectars = Number.parseFloat((google.maps.geometry.spherical.computeArea(this.form.getPath()) / 10000).toPrecision(2));
        }
    }

}

//schön isses nicht aber es macht path in firestore speicherbar
function transformPathToCPS(path: google.maps.MVCArray<any>) {
    let coordinates: any[] = [];
    let helpString = path.getArray().toString().replaceAll(' ', '')
    helpString.split("),(").forEach((value, index) => {
        value = value.replaceAll(')', '').replaceAll('(', '') //falls hier jemand weniger unfähig ist als ich, kann er gerne aus den beiden replaceAll eine mit einer regular expression für beide klammern machen
        coordinates[index] = {
            lat: Number.parseFloat(value.split(",")[0]),
            lng: Number.parseFloat(value.split(",")[1])
        }
    })
    return coordinates;




}





