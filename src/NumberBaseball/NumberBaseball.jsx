import React, {useState, useRef} from "react";
import './numberbaseball.css';

const getNumber = () => {
    let nums = []
    for(let i = 0; i < 4; i++){
        nums.push(Math.floor(Math.random() % 10))
    }
    return nums;
}

const NumberBaseball = () => {
    const inputRef = useRef(null);
    const [state, setState] = useState({
        result : '',
        value : '',
        answer : getNumber(),
        tries:[]
    });

    const onSubmitForm = () => {
        e.preventDefault();
        
        inputRef.current.focus();
    }

    const onChangeInput = (e) => {
        setState({
            ...state,
            value : e.currentTarget.value
        });
    }

    return(
        <div className="NumberBaseball">
            <h1>{state.result}</h1>
            <form onSubmit={onSubmitForm}>
                <input maxLength={4} value={state.value} onChange={onChangeInput}/>
            </form>
            <div>시도:{state.tries.length}</div>
            <ul>{}</ul>
        </div>
    );
}

export default NumberBaseball;