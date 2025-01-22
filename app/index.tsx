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
  const [audioUri, useAudioUrl] = useState('');
  const [captionsUri, useCaptionsUri] = useState('');
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
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text>Captures Uri</Text>
        <TextInput
          style={styles.input}
          onChangeText={useCaptionsUri}
          value={captionsUri}
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
