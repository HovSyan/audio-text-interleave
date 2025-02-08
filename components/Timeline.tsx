import { PlayerExactTimeContext } from "@/contexts/player.context";
import Slider from "@react-native-community/slider";
import { memo, useContext } from "react";

type Props = {
  style: object;
  duration: number;
};

function Timeline({ style, duration }: Props) {
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

export default memo(Timeline);
