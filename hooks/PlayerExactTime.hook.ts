import { AudioPlayer } from "expo-audio";
import { useEffect, useState } from "react";

export default function useExactTime(player: AudioPlayer) {
    const [time, setTime] = useState(player.currentStatus.currentTime);

    useEffect(() => {
        let frame = requestAnimationFrame(() => animate());
        const animate = () => {
            setTime(player.currentStatus.currentTime);
            frame = requestAnimationFrame(animate);
        }
        return () => {
            cancelAnimationFrame(frame);
        }
    }, [player])

    return time;
}