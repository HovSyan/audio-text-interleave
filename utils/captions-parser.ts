export type CaptionsJSON = {
  pause: number;
  speakers: Array<{
    name: string;
    phrases: Array<{ words: string; time: number }>;
  }>;
};
export type ParsedCaptionsList = Array<ParsedCaption>;
export type ParsedCaption = {
  type: "speaker";
  from: number;
  to: number;
  speakerName: string;
  words: string;
};

export function parseCaptionsJSON(json: CaptionsJSON): ParsedCaptionsList {
    const pause = json.pause;
    const list: ParsedCaptionsList = [];
    const speakersLen = json.speakers.length;
    let phraseIndex = 0;
    let time = 0;
    let hasPhrase = true;
  
    while (hasPhrase) {
      hasPhrase = false;
      for (let i = 0; i < speakersLen; i++) {
        if (phraseIndex < json.speakers[i].phrases.length) {
          list.push({
            type: "speaker",
            from: time,
            to: time + json.speakers[i].phrases[phraseIndex].time,
            speakerName: json.speakers[i].name,
            words: json.speakers[i].phrases[phraseIndex].words,
          });
          hasPhrase = true;
          time += json.speakers[i].phrases[phraseIndex].time + pause;
        }
      }
      phraseIndex++;
    }
    return list;
  }
  