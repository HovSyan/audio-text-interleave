import { useNavigation } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, TextInput, View, Text } from "react-native";
import { RouteParams } from "./player";

const styles = StyleSheet.create({
  inputWrapper: {
    margin: 5,
    gap: 5
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 12,
  },
})

export default function Index() {
  const [audioUri, useAudioUrl] = useState('https://file.notion.so/f/f/24407104-f114-40ec-91ac-25f0ac0ac7a6/66b62104-67d0-48a9-956a-2534f0c1f52a/example_audio.mp3?table=block&id=afdf8629-9de2-456c-8d1e-cecb5f63378d&spaceId=24407104-f114-40ec-91ac-25f0ac0ac7a6&expirationTimestamp=1737518400000&signature=WagqNSaC94In8KS9F0CIqzyMCMJ6AUPDGreeHXnADf4&downloadName=example_audio.mp3');
  const [captionsUri, useCaptionsUri] = useState('https://file.notion.so/f/f/24407104-f114-40ec-91ac-25f0ac0ac7a6/fd457fa5-cdfc-423b-8900-d47ed9bc0915/example_audio.json?table=block&id=3e0f14c4-ac0a-4fb2-98a0-4f8197052beb&spaceId=24407104-f114-40ec-91ac-25f0ac0ac7a6&expirationTimestamp=1737518400000&signature=pJwnLRKO-GzlnK0UR-x6vN4M-OUOnrDPDl-v_8-OuvY&downloadName=example_audio.json');
  const navigation = useNavigation<any>();

  const onLetsRock = () => {
    if (audioUri && captionsUri) {
      navigation.navigate('player', { audioUri, captionsUri } as RouteParams)
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#ddd',
        gap: 10
      }}
    >
      <View style={styles.inputWrapper}>
        <Text>Audio Uri</Text>
        <TextInput
          style={styles.input}
          onChangeText={useAudioUrl}
          value={audioUri}
          placeholder="Audio Uri"
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text>Captures Uri</Text>
        <TextInput
          style={styles.input}
          onChangeText={useCaptionsUri}
          value={captionsUri}
          placeholder="Captures JSON"
        />
      </View>
      <Button 
        onPress={onLetsRock}
        title="Lets rock"
        color="#841584"
      />
    </View>
  );
}
