export interface IElement {
    id: string;
    background: string;
    timer: number;
    updateInterval: () => void;
    isInterval: boolean
}
