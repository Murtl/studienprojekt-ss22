import {Observable} from "./observable";
import {useEffect, useState} from "react";

export function useObservable<T>(observable: Observable<T>) : T {
    const [value, setValue] = useState(observable.get())

    useEffect(() => {
        return observable.subscribe(setValue)
    }, [observable])

    return value
}