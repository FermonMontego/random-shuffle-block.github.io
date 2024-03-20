interface IRandomNumber {
    getRandom: () => number
}

class RandomNumber implements IRandomNumber {

    private readonly min: number;
    private readonly max: number;
    constructor(min: number, max: number) {
        this.min = min;
        this.max = max;
    }

    public getRandom() {
        return Math.floor(Math.random() * (this.max - this.min) + this.min)
    }
}

export default RandomNumber;
