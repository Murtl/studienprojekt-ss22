type Listener<T> = (value: T) => void
type Unsubscriber = () => void

export class Observable<T> {

    private listeners : Listener<T>[] = []
    private value : T

    constructor(value : T) {
        this.value = value
    }

    get() : T {
        return this.value
    }

    set(newValue: T) {
        if (this.value !== newValue){
            this.value = newValue
            this.publish(newValue)
        }
    }

    private publish(value: T) {
        this.listeners.forEach(listener => listener(value))
    }

    subscribe(newListener: Listener<T>) : Unsubscriber {
        this.listeners.push(newListener)
        return () => {
            this.listeners = this.listeners.filter(listener => listener === newListener)
        }
    }

}