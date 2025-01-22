import React from "react";
import { Text, View } from 'react-native';

type Props = {
    words: string;
    speaker: string;
    highlighted: boolean;
    align: 'flex-end' | 'flex-start'
}

export default function CaptionItem({ words, speaker, highlighted, align }: Props) {
    return <View style={{ gap: 5, alignItems: align, height: 500 }}>
        <Text style={{ color: highlighted ? 'yellow' : 'black', paddingInline: 10 }}>{speaker}</Text>
        <Text style={{ color: highlighted ? 'yellow' : 'black', padding: 10, backgroundColor: 'lightblue', borderRadius: 10 }}>{words}</Text>
    </View>
}