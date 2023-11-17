import { LoremIpsum } from "lorem-ipsum";

export const lorem = new LoremIpsum({
  wordsPerSentence: {
    min: 5,
    max: 16,
  },
});
