import { useState, useEffect } from 'react';
import './ColorGame.css';

const ColorGame = () => {
    const [targetColor, setTargetColor] = useState('');
    const [colorOptions, setColorOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [gameStatus, setGameStatus] = useState('');
    
    const colors = ['#EF1289', '#33FF57', '#3357FF', '#F1C40F', '#8E44AD', '#E74C3C'];

    useEffect(() => {
        startNewGame();
    }, []);

    const startNewGame = () => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setTargetColor(randomColor);
        setColorOptions(generateColorOptions(randomColor));
        setGameStatus('');
    };

    const generateColorOptions = (correctColor) => {
        const shuffledColors = [...colors];
        shuffledColors.sort(() => Math.random() - 0.5);
        if (!shuffledColors.includes(correctColor)) {
            shuffledColors[0] = correctColor;
        }
        return shuffledColors.slice(0, 6);
    };

    const handleColorClick = (color) => {
        if (color === targetColor) {
            setScore(score + 1);
            setGameStatus('Correct! 🎉');
            setTimeout(startNewGame, 2000);
        } else {
            setGameStatus('Wrong! Try again. ❌');
        }
    };

    const handleNewGame = () => {
        setScore(0); 
        startNewGame();
    };

    return (
        <div className="game-container">
            <h1 className="game-title" data-testid="gameInstructions">Guess the correct color!</h1>
            <div 
                className="color-box" 
                style={{ backgroundColor: targetColor }} 
                data-testid="colorBox"
            ></div>
            <div className="color-options">
                {colorOptions.map((color, index) => (
                    <button
                        key={index}
                        className="color-option"
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorClick(color)}
                        data-testid="colorOption" 
                    />
                ))}
            </div>
            <div className={`game-status ${gameStatus.includes('Correct') ? 'correct' : 'wrong'}`} data-testid="gameStatus">
                {gameStatus}
            </div>
            <div className="score" data-testid="score">Score: {score}</div>
            <button className="new-game" onClick={handleNewGame} data-testid="newGameButton">New Game</button>
        </div>
    );
};

export default ColorGame;