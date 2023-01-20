import * as Hangul from "hangul-js";
interface AttractionsDataProps {
  name: string;
  id: number;
  address: string;
}
interface AttractionProps {
  info: AttractionsDataProps;
  matchedletter: number[][];
  exactmatchedletter: number[][];
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
    const matchedletter = Hangul.rangeSearch(
      attraction.name,
      trimmedSearchValue
    );

    if (searcher.search(attraction.name.replace(/[0-9 ]/g, "")) === -1)
      return acc;
    const exactmatchedletter = matchedletter.filter(
      (el:any) =>
        attraction.name[el[1]] === trimmedSearchValue.slice(-1) &&
        Hangul.isCompleteAll(blankNumRemovedValue)
    );
    return [
      ...acc,
      {
        info: attraction,
        matchedletter,
        exactmatchedletter,
      },
    ];
  }, init).sort((a, b) => {
    let diff = a.matchedletter[0]?.[0] - b.matchedletter[0]?.[0];
    let exactDiff = null;

    if (!a.exactmatchedletter.length && b.exactmatchedletter.length) return 1;
    else if (a.exactmatchedletter.length && !b.exactmatchedletter.length)
      return -1;
    else if (a.exactmatchedletter.length && b.exactmatchedletter.length) {
      exactDiff = a.exactmatchedletter[0][0] - b.exactmatchedletter[0][0];
    }

    return exactDiff
      ? exactDiff
      : diff
      ? diff
      : a.info.name.localeCompare(b.info.name, "ko");
  });

  return {
    filteredAttractions: filteredAttractions.slice(0, maxSuggest + 1),
    numOfFilteredAttractions: filteredAttractions.length,
  };
}
export { getfilteredAttractions };
