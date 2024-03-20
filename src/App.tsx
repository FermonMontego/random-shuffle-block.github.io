import {FC, useEffect, useState} from 'react';
import ContainerBlocks from "./components/wrappers/containerBlocks/ContainerBlocks.tsx";
import BlockItem from "./components/BlockItem.tsx";
import {IElement} from "./types";
import {v4 as randomId} from 'uuid';
import RandomColor from "./helpers/RandomColor.ts";
import RandomNumber from "./helpers/RandomNumber.ts";
import Button from "./components/UI/Button/Button.tsx";
import Container from "./components/wrappers/container/Container.tsx";
import Input from "./components/UI/Input/Input.tsx";
import shuffleArray from "./helpers/ShuffleArray.ts";
import hexValidator from "./helpers/HexValidator.ts";

enum enumStateSort {
    FinishedTimer = 'finish',
    UpdateTimer = 'update',
    Default = 'default'
}

const App: FC = () => {
    const [elements, setElements] = useState<IElement[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [stateSort, setStateSort] = useState<string>('default');

    const random = new RandomNumber(5, 10).getRandom();
    useEffect(() => {
        fillingArray();

    }, []);

    const fillingArray = () => {
        const newElements: IElement[] = [];
        for (let i = 0; i < random; i++) {
            newElements.push({
                id: randomId(),
                timer: 20,
                background: new RandomColor().getColor(),
                updateInterval: function () {
                    if (this.timer > 0) {
                        this.timer -= 1;
                    }
                },
                isInterval: false
            });
        }

        setElements(randomIssuanceIsInterval(newElements));
    };

    function randomIssuanceIsInterval(array: IElement[]) {
        const copy = [...array];
        const currentCopyElement = copy[new RandomNumber(0, copy.length).getRandom()];
        if (currentCopyElement) {
            currentCopyElement.isInterval = true;
        }

        return copy;
    }

    const shuffleArrayBlock = () => {
        const copy = shuffleArray([...elements]);
        setElements([...copy]);
    }

    const createNewBlock = (value: string) => {
        try {
            hexValidator(value);

            setElements(prevState => [...prevState, {
                id: randomId(),
                timer: 20,
                background: value,
                updateInterval: function () {
                    if (this.timer > 0)
                        this.timer -= 1
                },
                isInterval: false
            }])

            setInputValue('')
        } catch (e) {
            setInputValue('')
            alert(e);
        }
    }

    const removeElement = (id: string) => {
        if (stateSort === enumStateSort.FinishedTimer) {
            shuffleArrayBlock();
        }
        const timer = setTimeout(() => {
            const copyElements = [...elements];
            const copyWithoutRemove = copyElements.filter((element) => element.id !== id);

            setElements(randomIssuanceIsInterval(copyWithoutRemove));
            clearTimeout(timer)
        }, 100)
    }

    function elementTimerUpdate(id: string, time: number) {
        const copy = [...elements];
        const currentElement = copy.find((element) => element.id == id);
        if (currentElement)
            currentElement.timer = time;

        setElements(copy);

        if (stateSort === enumStateSort.UpdateTimer) {
            shuffleArrayBlock();
        }
    }

    function changeStateSort() {
        switch (stateSort) {
            case enumStateSort.Default:
                setStateSort(enumStateSort.FinishedTimer)
                break;
            case enumStateSort.FinishedTimer:
                setStateSort(enumStateSort.UpdateTimer)
                break;
            case enumStateSort.UpdateTimer:
                setStateSort(enumStateSort.Default)
                break;
            default: {
                setStateSort(enumStateSort.Default)
                break;
            }
        }
    }

    return (
        <Container>

            <div style={{display: 'flex', gap: 12}}>
                <Button content={'Перемешать все блоки'} type={'button'} onClick={() => shuffleArrayBlock()}/>
                <div>
                    <Input
                        type={'text'}
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}
                        style={{borderRadius: '8px 0 0px 8px', borderRight: 'none'}}
                        placeholder="Введите hex (#ffffff)"
                    />
                    <Button
                        style={{borderRadius: '0 8px 8px 0'}}
                        content={'Добавить'}
                        type={'button'}
                        onClick={() => createNewBlock(inputValue)}
                    />
                </div>
                <Button className={`button-state-${stateSort}`} content={'Сортировка'} type={'button'}
                        onClick={() => changeStateSort()}/>
            </div>

            <ContainerBlocks
                elements={elements}
                renderElement=
                    {
                        (element) =>
                            <BlockItem
                                elementTimerUpdate={(time) => elementTimerUpdate(element.id, time)}
                                key={element.id}
                                height={150}
                                element={element}
                                removeElement={(id: string) => removeElement(id)}
                            />
                    }
            />
        </Container>
    );
};

export default App;
