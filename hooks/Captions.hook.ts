import { parseCaptionsJSON, ParsedCaptionsList } from "@/utils/captions-parser";
import { useEffect, useState } from "react";

export default function useCaptions(uri: string) {
  const [list, setList] = useState<ParsedCaptionsList>([]);
  const [highlighted, setHighlighted] = useState(-1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(uri)
      .then((r) => r.json())
      .then(parseCaptionsJSON)
      .then(setList)
      .then(
        () => {
          setLoading(false);
        },
        () => {
          setLoading(false);
          setError(true);
        }
      );
  }, []);

  const getPrev = (currentTime: number) => {
    if (!list[highlighted]) return null;
    const delta = currentTime - list[highlighted].from;
    if (0 <= delta && delta < 500) return list[highlighted - 1];
    return list[highlighted];
  };

  const getNext = () => {
    if (highlighted >= list.length - 1) return null;
    return list[highlighted + 1];
  };

  const setHighlightedByTime = (t: number) => {
    setHighlighted(list.findIndex((c) => c.from <= t && t < c.to ));
  }

  return { list, highlighted, error, loading, getPrev, getNext, setHighlightedByTime };
}
