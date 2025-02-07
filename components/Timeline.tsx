import {
  PlayerExactTimeContext,
  PlayerStatusContext,
} from "@/contexts/player.context";
import Slider from "@react-native-community/slider";
import { useContext } from "react";

type Props = {
  style: object;
};

export default function Timeline({ style }: Props) {
  const { duration } = useContext(PlayerStatusContext)!;
  const time = useContext(PlayerExactTimeContext);

  return (
    <Slider
      style={style}
      value={time / duration}
      minimumValue={0}
      maximumValue={1}
    />
  );
}
