import classes from './Input.module.css';
import { forwardRef } from 'react';

function Input(props,ref) {
    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id} >{props.label}</label>
            <input ref={ref} {...props.input}></input>
        </div>
    )
}

export default forwardRef(Input);