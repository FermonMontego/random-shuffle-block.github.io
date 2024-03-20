import RandomNumber from "../helpers/RandomNumber.ts";

export const useRandomNumber = (min: number = 0, max: number = 2): number => {
    return new RandomNumber(min, max).getRandom();
}
