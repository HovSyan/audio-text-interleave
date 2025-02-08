import useCaptions from "@/hooks/Captions.hook";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { Text } from "react-native";

export type TCaptionsContext = ReturnType<typeof useCaptions>;

export const CaptionsContext = createContext<TCaptionsContext | null>(null);

type Props = {
  children: ReactNode;
  uri: string;
};

export default function CaptionsProvider({ children, uri }: Props) {
  const captions = useCaptions(uri);

  if (captions.error) {
    <Text>It's an error, couldn't load the captions</Text>;
  }

  if (captions.loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <CaptionsContext.Provider value={captions}>
      {children}
    </CaptionsContext.Provider>
  );
}
