import { useCallback, useState, useEffect } from "react";

const buildGameStats = () => ({
    level: 1,
    linesCompleted: 0,
    linesPerLevel: 10,
    points: 0,
    record: 0
})

export const useGameStats = () => {
    const [gameStats, setGameStats] = useState(buildGameStats())

    useEffect(() => {
        const record = localStorage.getItem('tetrisRecord');
        if (record) {
            setGameStats((previous) => ({ ...previous, record: Number(record) }));
        }
    }, []);

    const addLinesCleared = useCallback((lines) => {
        setGameStats((previous) => {
            const points = previous.points + lines * 100;
            const { linesPerLevel } = previous;
            const newLinesCompleted = previous.linesCompleted + lines;
            const level =
            newLinesCompleted >= linesPerLevel
                ? previous.level + 1
                : previous.level;
            const linesCompleted = newLinesCompleted % linesPerLevel;

            let newRecord = previous.record
            if (points > previous.record) {
                newRecord = points
                localStorage.setItem('tetrisRecord', newRecord)
            }
    
            return {
            level,
            linesCompleted,
            linesPerLevel,
            points,
            record: newRecord
            };
        }, []);
    }, []);
    
    return [gameStats, addLinesCleared];
};