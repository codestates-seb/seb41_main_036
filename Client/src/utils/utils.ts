import * as Hangul from "hangul-js";
interface AttractionsDataProps {
  name: string;
  id: number;
  address: string;
}
interface AttractionProps {
  info: AttractionsDataProps;
  matchedLetter: number[][];
  exactMatchedLetter: number[][];
}
function getfilteredAttractions(
  AttractionsData: Array<AttractionsDataProps>,
  trimmedSearchValue: string,
  maxSuggest: number
) {
  if (trimmedSearchValue === "")
    return {
      trimmedSearchValue,
      filteredAttractions: [],
      numOfFilteredAttractions: 0,
    };
  let init: Array<AttractionProps> = [];
  const blankNumRemovedValue = trimmedSearchValue.replace(/[0-9 ]/g, "");

  let filteredAttractions = AttractionsData.reduce((acc, attraction) => {
    const searcher = new Hangul.Searcher(blankNumRemovedValue);
    const matchedLetter = Hangul.rangeSearch(
      attraction.name,
      trimmedSearchValue
    );

    if (searcher.search(attraction.name.replace(/[0-9 ]/g, "")) === -1)
      return acc;
    const exactMatchedLetter = matchedLetter.filter(
      (el: any) =>
        attraction.name[el[1]] === trimmedSearchValue.slice(-1) &&
        Hangul.isCompleteAll(blankNumRemovedValue)
    );
    return [
      ...acc,
      {
        info: attraction,
        matchedLetter,
        exactMatchedLetter,
      },
    ];
  }, init).sort((prev, next) => {
    let diff = prev.matchedLetter[0]?.[0] - next.matchedLetter[0]?.[0];
    let exactDiff = null;

    if (!prev.exactMatchedLetter.length && next.exactMatchedLetter.length)
      return 1;
    if (prev.exactMatchedLetter.length && !next.exactMatchedLetter.length)
      return -1;
    if (prev.exactMatchedLetter.length && next.exactMatchedLetter.length) {
      exactDiff = prev.exactMatchedLetter[0][0] - next.exactMatchedLetter[0][0];
    }

    if (exactDiff) return exactDiff;
    if (diff) return diff;
    return prev.info.name.localeCompare(next.info.name, "ko");
  });

  return {
    filteredAttractions: filteredAttractions.slice(0, maxSuggest + 1),
    numOfFilteredAttractions: filteredAttractions.length,
  };
}

const throttle = (callback: Function, delay: number, e?: MouseEvent) => {
  let timerId: ReturnType<typeof setTimeout> | null = null;
  return () => {
    if (timerId) {
      return;
    }
    timerId = setTimeout(() => {
      callback(e);
      timerId = null;
    }, delay);
  };
};

const delaySetter = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const getCurrentCount = (
  totalCount: number | undefined,
  prev: boolean,
  cur: boolean
) => {
  if (prev === false) {
    return cur ? (totalCount as number) + 1 : totalCount;
  }
  return cur ? totalCount : (totalCount as number) - 1;
};

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

interface optionsType {
  dateStyle: "short";
  timeStyle: "short";
}
const options: optionsType = {
  dateStyle: "short",
  timeStyle: "short",
};
const getTime = (time: string) => {
  return new Intl.DateTimeFormat("ko", options).format(new Date(time));
};

const splitEmoji = (emojis: string) =>
  [...new Intl.Segmenter().segment(emojis)].map((x) => x.segment);
const emojis =
  "😀😃😄😁😆😅🤣😂🙂🙃🫠😉😊😇🥰😍🤩😘😗😚😙🥲😋😛😜🤪😝🤑🤗🤭🫢🫣🤫🤔🫡🤐🤨😐😑😶🫥🤕🤢🤮🤧🥵🥶🥴😵😵‍💫🤯🤠🥳🥸😎";

const generateRandomEmoji = () => {
  const emojiArr = splitEmoji(emojis);
  const min = 0;
  const max = emojiArr.length - 1;
  return emojiArr[Math.floor(Math.random() * (max - min + 1) + min)];
};

const rafThrottle = (callback: () => void) => {
  let rafTimeout: number | null = null;
  return () => {
    if (rafTimeout) {
      window.cancelAnimationFrame(rafTimeout);
    }
    rafTimeout = window.requestAnimationFrame(callback); //?
  };
};
export {
  getfilteredAttractions,
  throttle,
  delaySetter,
  getCurrentCount,
  getRandomInt,
  getTime,
  generateRandomEmoji,
  rafThrottle,
};
