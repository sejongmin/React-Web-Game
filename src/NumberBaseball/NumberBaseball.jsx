import React, {useState, useRef} from "react";
import './numberbaseball.css';

const getNumber = () => {
    const candidate = [0,1,2,3,4,5,6,7,8,9];
    const array = [];
    for(let i = 0; i < 4; i += 1){
        const chosen = candidate.splice(Math.floor(Math.random() * (10 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

const NumberBaseball = () => {
    const inputRef = useRef(null);
    const [state, setState] = useState({
        result : '',
        value : '',
        answer : getNumber(),
        tries:[]
    });

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (state.value === state.answer.join('')){
            setState({
                ...state,
                result:'홈런!',
                tries:[...state.tries, {try : state.value, result: '홈런!'}],
            })
        } else{
            const answerArray = state.value.split('').map((v) => {return parseInt(v) });
            let strike = 0;
            let ball = 0;
            if (state.tries.length >= 9){
                setState({
                    ...state,
                    result: `10번 넘게 틀려서 실패! 답은 ${state.answer} 입니다.`,
                });
            } else {
                for (let i = 0; i < 4; i += 1){
                    if (answerArray[i] === state.answer[i]){
                        strike += 1;
                    } else if (state.answer.includes(answerArray[i])){
                        ball += 1;
                    }
                }
                setState({
                    ...state,
                    tries : [...state.tries, {try : state.value, result : `${strike} 스트라이크, ${ball} 볼입니다. `}],
                    value : '',
                    result : `${strike} 스트라이크, ${ball} 볼입니다. `
                })
            }
        }
        inputRef.current.focus();
    }

    const onChangeInput = (e) => {
        setState({
            ...state,
            value : e.target.value
        });
    }

    const tryTag = state.tries.map((v, i) => {
        return(
            <li key={i}>
                <strong>{v.try}</strong><br />
                <span>{v.result}</span>
            </li>
        )
    })

    const onClick = (e) => {
        setState({
            result:'',
            value:'',
            answer:getNumber(),
            tries:[],
        })
    }


    return(
        <div className="NumberBaseball">
            <h1>{state.result}</h1>
            <form onSubmit={onSubmitForm}>
                <input ref={inputRef} minLength={4} maxLength={4} value={state.value} onChange={onChangeInput}/>
                <button type="submit">입력</button>
                <button type="button" onClick={onClick}>다시시작</button>
            </form>
            <div>시도:{state.tries.length}</div>
            <ul>{tryTag}</ul>
        </div>
    );
}

export default NumberBaseball;