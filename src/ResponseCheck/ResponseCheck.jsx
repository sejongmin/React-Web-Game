import React, {useState, useRef} from "react";
import './responseCheck.css';

const ResponseCheck = () => {
    const [state, setState] = useState({
        now: 'waiting',
        message : '클릭해서 시작하세요',
    })
    const [result, setResult] = useState([]);
    const timeout = useRef(null);
    const startTime = useRef();
    const endTime = useRef();

    const onClick = () => {
        if (state.now === 'waiting'){
            setState({
                now:'ready',
                message: '초록색이 되면 클릭하세요',
            });
            timeout.current = setTimeout(()=>{
                setState({
                    now: 'now',
                    message: '지금클릭',
                })
                startTime.current = new Date();
            }, Math.floor(Math.random() * 3000) + 1000);
        } else if (state.now === 'ready'){
            clearTimeout(timeout.current);
            setState({
                now:'waiting',
                message:'너무 성급하게 클릭함',
            });
        } else if (state.now === 'now'){
            endTime.current = new Date();
            setResult([...result, Math.round(endTime.current - startTime.current)]);
            setState({
                now: 'waiting',
                message : '클릭해서 시작하세요',
            });
        }
    }

    const onReset = () => {
        setResult([]);
        setState({
            now:'waiting',
            message:'클릭해서 시작하세요'
        })
    }

    return(
        <div className="ResponseCheck">
            <div className={state.now} id="screen" onClick={onClick}>
                {state.message}
            </div>
            {result.length === 0 ? null :
            <div>
                <div>반응속도 : {result[result.length - 1]}ms</div>
                <div>평균속도 : {Math.round(result.reduce((a, c) => a + c) / result.length)}ms</div>
                <button onClick={onReset}>초기화</button>
            </div>}
        </div>
    );
}

export default ResponseCheck;