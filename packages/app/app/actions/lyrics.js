import logger from 'electron-timber';
export const LYRIC_SEARCH_START = 'LYRIC_SEARCH_START';
export const LYRIC_SEARCH_SUCCESS = 'LYRIC_SEARCH_SUCCESS';

export function lyricSearchStart (query) {
  return {
    type: LYRIC_SEARCH_START,
    payload: query
  };
}

export function lyricSearchSuccess (query, result) {
  return {
    type: LYRIC_SEARCH_SUCCESS,
    payload: {
      type: query,
      info: result
    }
  };
}

export function lyricsSearch (track) {
  return (dispatch, getState) => {
    dispatch(lyricSearchStart(track));
    const providers = getState().plugin.plugins.lyricsProviders;
    const selectedProvider = getState().plugin.selected.lyricsProviders;
    const lyricsProvider = _.find(providers, {sourceName: selectedProvider});

    lyricsProvider.search(track.artist, track.name)
      .then(results => {
        dispatch(lyricSearchSuccess(results));
      })
      .catch(error => {
        logger.error(error);
      });
  };
}
