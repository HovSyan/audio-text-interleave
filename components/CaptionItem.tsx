import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
    words: string;
    speaker: string;
    highlighted: boolean;
    align: 'flex-end' | 'flex-start'
}

function CaptionItem({ words, speaker, highlighted, align }: Props) {
    return <View style={[styles.box, { alignItems: align }]}>
        <Text style={[styles.speaker, { color: highlighted ? 'yellow' : 'black' }]}>{speaker}</Text>
        <Text style={[styles.words, { color: highlighted ? 'yellow' : 'black' }]}>{words}</Text>
    </View>
}

export default memo(CaptionItem);

const styles = StyleSheet.create({
    box: {
        gap: 2,
    },
    speaker: {
        paddingInline: 10
    },
    words: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'lightblue'
    }
})