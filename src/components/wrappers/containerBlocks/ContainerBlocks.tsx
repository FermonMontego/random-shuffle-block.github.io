import React from "react";
import styles from './styles.module.css'

interface ContainerProps<T> {
    elements: T[];
    renderElement: (element: T) => React.ReactNode;
}

export default function Container<T>(props: ContainerProps<T>) {
    return (
        <div className={`${styles.containerBlock}`}>
            {props.elements.map(props.renderElement)}
        </div>
    )
}


