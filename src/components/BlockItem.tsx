import {FC, useEffect, useState} from 'react';
import styles from './styles.module.css'
import {IElement} from "../types";

interface BlockItemProps {
    height: number;
    element: IElement;
    removeElement: (id: string) => void;
    elementTimerUpdate: (time: number) => void;
    updateIsInterval?: () => void;
}

const BlockItem: FC<BlockItemProps> = ({height, element, removeElement, elementTimerUpdate, updateIsInterval}) => {
    const [timeToDeath, setTimeToDeath] = useState(element.timer);

    useEffect(() => {
        const interval = setInterval(() => {
            if(!element.isInterval) return;
            const result = decrement();
            setTimeToDeath(result);
            if (result <= 0) {
                removeElement(element.id);
                clearInterval(interval)
                if(updateIsInterval)
                    updateIsInterval();
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [element.timer, element.isInterval]);

    function decrement() {
        return element.timer -= 1;
    }

    function updateTimeToDeath() {
        setTimeToDeath(20);
        elementTimerUpdate(20);
    }

    return (
        <div
            className={`${styles.fadeIn} ${styles.blockItem}`}
            style={{width: '100%', height: `${height}px`, background: element.background}}
            onClick={updateTimeToDeath}
        >
            {timeToDeath ? timeToDeath : ''}
            <p>Нажмите чтобы обновить таймер</p>
        </div>
    );
};

export default BlockItem;
