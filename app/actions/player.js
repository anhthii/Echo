import * as types from '../constant/action_constant';

export function updateLyric(lyric1, lyric2) {
  return {
    type: types.UPDATE_LYRIC,
    lyrics: { lyric1, lyric2 },
  };
}

export function updatePlayedPercent(percent) {
  return {
    type: types.UPDATE_PLAYED_PERCENT,
    playedPercent: percent,
  };
}

export function updateLyricPercent(...percentages) {
  const payload = {};

  percentages.forEach((value, index) => {
    if (value !== null) {
      payload[`per${index + 1}`] = value;
    }
  });

  return {
    type: types.UPDATE_LYRIC_PERCENT,
    payload,
  };
}
