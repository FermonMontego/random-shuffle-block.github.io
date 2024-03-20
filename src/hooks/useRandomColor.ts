import RandomColor from "../helpers/RandomColor.ts";

export const useRandomColor = (): string => {
    return new RandomColor().getColor();
}
