import React, {useState, useCallback} from "react";
import './rockscissorspaper.css';
import useInterval from './useInterval';

const rspCoords = {
    바위: '0',
    보: '-204px',
    가위 : '-408px',
};

const scores = {
    가위 : 1,
    바위 : 0,
    보 : -1,
};

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find((v) => v[1] === imgCoord)[0];
};

const RSP = () => {
    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState(rspCoords.바위);
    const [score, setScore] = useState(0);
    const [isRunning, setIsRunning] = useState(true);

    const changeHand = useCallback(() => {
        if (imgCoord === rspCoords.바위){
            setImgCoord(rspCoords.가위);
        } else if (imgCoord === rspCoords.가위){
            setImgCoord(rspCoords.보);
        } else if (imgCoord === rspCoords.보){
            setImgCoord(rspCoords.바위);
        }
    }, [imgCoord]);

    useInterval(changeHand, isRunning ? 100 : null);


    const onClickBtn = (choice) => {
        if (isRunning){
            setIsRunning(false);
            const myScore = scores[choice];
            const cpuScore = scores[computerChoice(imgCoord)];
            const diff = myScore - cpuScore;
            if (diff === 0){
                setResult('비겼습니다!');
            } else if ([-1, 2].includes(diff)){
                setResult('이겼습니다!');
                setScore(score + 1);
            } else {
                setResult('졌습니다!');
                setScore(score - 1);
            }
            setTimeout(() => {
                setIsRunning(true);
            }, 1000);
        }
    }

    return(
        <div className="RSP">
            <div id="computer" style={{background:`url(./images/RSP.jpg) ${imgCoord} 0`}}></div>
            <div>
                <button id="rock" className="btn" onClick={()=>{onClickBtn('바위')}}>바위</button>
                <button id="scissor" className="btn" onClick={()=>{onClickBtn('가위')}}>가위</button>
                <button id="paper" className="btn" onClick={()=>{onClickBtn('보')}}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
        </div>
    );
}

export default RSP;