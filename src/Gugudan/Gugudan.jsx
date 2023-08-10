import React, {useState, useRef, useCallback} from 'react';
import './gugudan.css';

const High = (props) => {
    const [highScore, sethighScore] = useState(0);
    if (props.value > highScore) sethighScore(props.value);
    return (
        <div className='high_score'>최고점수 : {highScore}</div>
    );
}

const Gugudan = () => {
    const [state, setState] = useState({
        first : Math.ceil(Math.random() * 9),
        second : Math.ceil(Math.random() * 9),
        value : '',
        result : '정답을 입력후 CHECK 버튼을 클릭하세요!',
        score : 0
    })
    const inputRef = useRef(null);

    const check = (e) => {
        e.preventDefault();
        state.first * state.second === Number(state.value) ? 
        setState({
            first : Math.ceil(Math.random() * 9),
            second : Math.ceil(Math.random() * 9),
            value : '',
            result : state.value + ' 정답!',
            score : state.score + 1,}) : 
        setState({
            ...state, 
            result:state.value + ' 오답!', 
            value:'', 
            count : 0});
        inputRef.current.focus();
    }

    const onChangeInput = useCallback((e) => {
        setState({
            ...state,
            value: e.target.value,
        })
    }, [state.value]);

    return(
        <div className="gugudan">
            <div className='problem'>{state.first} X {state.second}</div>
            <form onSubmit = {check}>
                <input ref={inputRef} type="number" value={state.value} onChange={onChangeInput}/>
                <button type="submit">CHECK</button>
                <div className="answer"><strong>{state.result}</strong></div>
            </form>
            <div className='score'>점수 : {state.score}</div>
            <High value={state.score} />
        </div>
    );
}

export default Gugudan;