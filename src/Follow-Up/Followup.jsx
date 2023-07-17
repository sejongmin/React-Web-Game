import React, {useState, useRef} from 'react';
import './followup.css';

const Followup = () => {
    const inputRef = useRef(null);
    const [state, setState] = useState({
        word : '제로초',
        value : '',
        result : '',
    });

    const onSubmitForm = (e) => {
        e.preventDefault();
        
        if (state.value.length > 1 && state.word[state.word.length - 1] === state.value[0]){
            setState({
                word : state.value,
                value : '',
                result : '딩동댕'
            });
        } else if (state.value.length < 2){
            setState({
                ...state,
                result : '2글자 이상 입력해주세요'
            });
        } else{
            setState({
                ...state,
                result : '땡'
            })
        }
        inputRef.current.focus();
    }

    const onChangeInput = (e) => {
        setState({
            ...state,
            value : e.currentTarget.value
        });
    }

    return(
        <div className="follow_up">
            <div>{state.word}</div>
            <form onSubmit={onSubmitForm}>
                <input ref={inputRef} value={state.value} onChange={onChangeInput}/>
                <button type="submit">입력</button>
            </form>
            <div>{state.result}</div>
        </div>
    );
}

export default Followup;