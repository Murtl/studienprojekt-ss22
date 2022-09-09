import React, { useEffect, useState} from "react"
import {getAuth, onAuthStateChanged} from "firebase/auth"
import { IonSpinner } from "@ionic/react";
import { useHistory } from "react-router";
import Constants from "../utility/constants";

export interface IAuthRouteProps {}

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = props => {

    const { children }  = props
    const auth = getAuth()
    const history = useHistory()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const AuthCheck = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("authorized: "+user.uid)
                setLoading(false)
            } else {
                console.log("unauthorized")
                history.replace(Constants.LOGIN.path)
            }
        })
        return () => AuthCheck()
    }, [auth, history])

    if (loading) return <IonSpinner/>

    return (<>{children}</>)
}

export default AuthRoute;