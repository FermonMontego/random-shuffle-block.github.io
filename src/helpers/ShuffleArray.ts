import {IElement} from "../types";

const shuffleArray = (array: IElement[]): IElement[] => {
    let lengthArray = array.length, temp, i;

    while (lengthArray) {
        i = Math.floor(Math.random() * lengthArray--);
        temp = array[lengthArray];
        array[lengthArray] = array[i];
        array[i] = temp;
    }

    return array;
}

export default shuffleArray;
