import { LoremIpsum } from "lorem-ipsum";

// Generate Lorem Ipsum Text
export const lorem = new LoremIpsum({
  wordsPerSentence: {
    min: 5,
    max: 16,
  },
});
