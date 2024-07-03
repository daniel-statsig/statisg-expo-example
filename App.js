import {
  StatsigProviderExpo,
  useFeatureGate,
  warmCachingFromAsyncStorage,
} from "@statsig/expo-bindings";
import { StatsigClient } from "@statsig/js-client";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

function Content() {
  const gate = useFeatureGate("a_gate");
  return (
    <Text>
      a_gate: {String(gate.value)} {gate.details.reason}
    </Text>
  );
}

function useMyStatsigClient() {
  return useMemo(() => {
    const client = new StatsigClient(
      "client-rfLvYGag3eyU0jYW5zcIJTQip7GXxSrhOFN69IGMjvq",
      { userID: "a-user" }
    );

    const warming = warmCachingFromAsyncStorage(client);

    return { client, warming };
  });
}

export default function App() {
  const { warming, client } = useMyStatsigClient();
  return (
    <View style={styles.container}>
      <StatsigProviderExpo client={client} cacheWarming={warming}>
        <Content />
      </StatsigProviderExpo>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
