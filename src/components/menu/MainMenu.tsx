import {RouteComponentProps, withRouter} from "react-router-dom";
import {
    IonContent, IonFooter,
    IonHeader, IonIcon, IonItem,
    IonLabel, IonList,
    IonMenu,
    IonMenuToggle,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {useState} from "react";
import LogoutButton from "../../pages/auth/LogoutButton";
import {menuEntries, MenuEntry} from "./menuEntry";
import Constants from "../utility/constants";



type Props = RouteComponentProps<{}>

const MainMenu = ( { history }: Props) => {

    const [activePage, setActivePage] = useState(menuEntries[0].title)

    const renderMenuItems = () : JSX.Element[] => {

        return menuEntries.map((menuEntry: MenuEntry) => (
            <IonMenuToggle key={menuEntry.title} autoHide={false}>
                <IonItem button key={menuEntry.title} routerLink={menuEntry.path} routerDirection={"none"} onClick={() => setActivePage(menuEntry.title)}>
                    <IonIcon slot={"start"} icon={menuEntry.icon}/>
                    <IonLabel color={menuEntry.title === activePage ? 'primary' : ''}>{menuEntry.title}</IonLabel>
                </IonItem>
            </IonMenuToggle>
            )
        )
    }

    return (
            <IonMenu contentId={Constants.MAIN_CONTAINER_NAME} side={"start"}>
                <IonHeader>
                    <IonToolbar color={"primary"}>
                        <IonTitle>
                            Menu
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonList>
                        { renderMenuItems()}

                    </IonList>
                </IonContent>
                <IonFooter>
                    <IonMenuToggle className={"ion-no-padding ion-padding-horizontal"} autoHide={false}>
                        <LogoutButton/>
                    </IonMenuToggle>
                </IonFooter>
            </IonMenu>
    )
}

export default withRouter(
    MainMenu
)