import React, {FC} from 'react';
import styles from './styles.module.scss'
interface ButtonProps {
    content: string;
    type: 'button' | 'reset' | 'submit';
    onClick?: () => void;
    style?: React.CSSProperties,
    className?: string
}

const Button: FC<ButtonProps> = ({content, type, onClick, style, className}) => {
    return (
        <button  style={style} className={`${styles.uiButton} ${className}`} type={type} onClick={onClick}>{content}</button>
    );
};

export default Button;
