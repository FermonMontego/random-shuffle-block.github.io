import React, {FC} from 'react';
import styles from './styles.module.scss'

interface InputProps {
    type: string;
    name?: string;
    disabled?: boolean;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    style?: React.CSSProperties;
    placeholder?: string;
}

const Input: FC<InputProps> = (
    {
        type,
        name,
        disabled,
        value,
        onChange,
        style,
        placeholder
    }
) => {
    return (
        <input
            className={styles.uiInput}
            type={type}
            name={name}
            disabled={disabled}
            value={value}
            onChange={onChange}
            style={style}
            placeholder={placeholder}
        />
    );
};

export default Input;
