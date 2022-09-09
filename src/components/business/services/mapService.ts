class mapService {

    static map: any;
    static orderMap: any;

    setMap(map: any){
        mapService.map = map;
    }
   
    getMap(){
        return mapService.map;
    }

    setOrderMap(orderMap: any){
        mapService.orderMap = orderMap;
    }

    getOrderMap(){
        return mapService.orderMap;
    }

}

export const mapServiceGlobal = new mapService()
