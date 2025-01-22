import { parseCaptionsJSON } from "./captions-parser";

const sample = {
  pause: 250,
  speakers: [
    {
      name: "John",
      phrases: [
        {
          words: "this is one phrase.",
          time: 1474,
        },
        {
          words: "now the second phrase.",
          time: 1667,
        },
        {
          words: "end with last phrase.",
          time: 1214,
        },
      ],
    },
    {
      name: "Jack",
      phrases: [
        {
          words: "another speaker here.",
          time: 1570,
        },
        {
          words: "saying her second phrase.",
          time: 1989,
        },
        {
          words: "and eventually finishing up.",
          time: 1486,
        },
      ],
    },
  ],
};

describe("parseCaptionsJSON", () => {
  it("should correctly parse the captions", () => {
    expect(parseCaptionsJSON(sample)).toEqual([
        { type: 'speaker', from: 0, to: 1474, speakerName: 'John', words: 'this is one phrase.' },
        { type: 'speaker', from: 1724, to: 3294, speakerName: 'Jack', words: 'another speaker here.' },
        { type: 'speaker', from: 3544, to: 5211, speakerName: 'John', words: 'now the second phrase.' },
        { type: 'speaker', from: 5461, to: 7450, speakerName: 'Jack', words: 'saying her second phrase.' },
        { type: 'speaker', from: 7700, to: 8914, speakerName: 'John', words: 'end with last phrase.' },
        { type: 'speaker', from: 9164, to: 10650, speakerName: 'Jack', words: 'and eventually finishing up.' },
    ])
  });
});
