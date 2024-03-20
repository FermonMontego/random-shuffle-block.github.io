import RandomNumber from "./RandomNumber.ts";

class RandomColor {
    private static readonly literal = '0123456789ABCDEF'

    public getColor() {
        return this.randomizeColor();
    }

    private randomizeColor() {
        let color = '#';
        for (let i: number = 0; i < 6; i++) {
            color += RandomColor.literal[new RandomNumber(1, 16).getRandom()]
        }

        return color;
    }

}

export default RandomColor;
