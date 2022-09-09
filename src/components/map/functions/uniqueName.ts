import { Field } from "./field";

function checkUniqueName(name: any, fields: Field[]){
    for (let i = 0; i < fields.length; i++) {
        if (fields[i].name === name) {
            return false
        }
    }
    return true;
}

export {checkUniqueName};

