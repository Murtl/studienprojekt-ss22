import {documentTextOutline, informationCircleOutline, mapOutline} from "ionicons/icons";
import Constants from "../utility/constants";


export interface MenuEntry {
    title: string
    path: string
    icon: string
}

export const menuEntries: MenuEntry[] = [
    {
        title: Constants.MAP.displayName,
        path: Constants.MAP.path,
        icon: mapOutline
    },
    {
        title: Constants.ORDER_MANAGEMENT.displayName,
        path: Constants.ORDER_MANAGEMENT.path,
        icon: documentTextOutline
    },
    {
        title: Constants.ABOUT.displayName,
        path: Constants.ABOUT.path,
        icon: informationCircleOutline
    }

]
