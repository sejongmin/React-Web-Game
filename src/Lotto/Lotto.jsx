import React, {useState, useRef, useEffect, useMemo, useCallback, memo} from "react";
import './lotto.css';

const getWinNumbers = () => {
    console.log("get win numbers");
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while(candidate.length > 0){
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0])
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}

const Ball = memo((props) => {
    let background;
    if (props.number <= 10){
        background = 'red';
    } else if (props.number <= 20){
        background = 'orange';
    } else if (props.number <= 30) {
        background = 'yellow';
    } else if (props.number <= 40){
        background = 'blue';
    } else{
        background = 'green';
    }

    return(
        <>
            {props.isBonus && <div>보너스!</div>}
            <div className="ball" style={{background}}>{props.number}</div>
        </>
    );
})

const Lotto = () => {
    const [redo, setRedo] = useState(false);
    const lottoNumbers = useMemo(() => getWinNumbers, [redo]); //함수 실행한 리턴값을 기억, []안에 요소가 바뀌기 전까지 실행X
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState();
    const timeouts = useRef([]);

    useEffect(() => {
        console.log("useEffect");
        for(let i = 0; i < 6; i++){
            timeouts.current[i] = setTimeout(()=>{
                setWinBalls((prevWinBalls) => [...prevWinBalls, winNumbers[i]]);
            }, (i + 1) * 1000);
        }
        timeouts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000);

        return () => {
            timeouts.current.forEach((v)=>{
                clearTimeout(v);
            });
        };
    }, [timeouts.current]);

    const onClickRedo = useCallback(() => { //함수를 기억, 랜더링 될 때마다 함수를 계속 생성하지 않음.
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus();
        setRedo(false);
        timeouts.current = [];
    }, [winNumbers]);

    return (
        <div className="Lotto">
            <div>당첨 숫자</div>
            <div id="결과창">
                {winBalls.map((v) => <Ball key={v} number={v} />)}
            </div>
            {bonus && <Ball number={bonus} isBonus={true} />} 
            {redo && <button onClick={onClickRedo}>한 번 더!</button>}
        </div>
    );
}

export default Lotto;