import React, { memo } from "react";
import { ScrollView, Text, View } from "react-native";
import { ParsedCaptionsList } from "./Player";
import CaptionItem from "./CaptionItem";

type Props = {
  list: ParsedCaptionsList;
  activeIndex: number | null;
};

function Captions({ list, activeIndex }: Props) {
  return (
    <ScrollView
      style={{
        backgroundColor: "#bbb",
        flex: 1,
        padding: 10,
      }}
      contentContainerStyle={{
        rowGap: 24,
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

export default memo(Captions);
