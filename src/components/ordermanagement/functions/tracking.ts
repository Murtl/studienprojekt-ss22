export class Tracking {
    id?: string | null;
    orderid: string |null | undefined;
    coords: {
        latitude: number | undefined,
        longitude: number | undefined,
        timestamp: number | undefined
        fieldId: string | null
        speed: number | null
    }[];

    constructor(id: string | null, orderid: string | null | undefined, coords: {
        latitude: number | undefined,
        longitude: number | undefined,
        timestamp: number | undefined
        fieldId: string | null
        speed: number | null
    }[]) {
        if (id !== null) {
            this.id = id;
        }
        this.coords = coords;
        this.orderid = orderid;
    }


    formatTrackingToFirestoreStandard() {
        return {
            orderid: this.orderid,
            coords: this.coords
        }
    }
}