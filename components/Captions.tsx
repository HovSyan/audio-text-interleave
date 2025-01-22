import React, { memo } from "react";
import { ScrollView, Text, View } from "react-native";
import { CaptionsList } from "./Player";
import CaptionItem from "./CaptionItem";

type Props = {
  list: CaptionsList;
  activeIndex: number | null;
};

function Captions({ list, activeIndex }: Props) {
  return (
    <ScrollView
      style={{
        backgroundColor: "green",
        flex: 1,
        alignSelf: "center",
        padding: 24,
        gap: 24
      }}
    >
      {list.map((c, i) => (
        <View key={i}>
          {c.type === "speaker" && (
            <CaptionItem
              words={c.words}
              speaker={c.speakerName}
              highlighted={i === activeIndex}
              align={i % 2 ? "flex-start" : "flex-end"}
            />
          )}
        </View>
      ))}
    </ScrollView>
  );
}

export default memo(Captions)
