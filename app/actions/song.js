import axios from "axios";
import { browserHistory } from "react-router";
import * as types from "../constant/action_constant";
import { MEDIA_ENDPOINT, ROOT_URL } from "../constant/endpoint_constant";
import { lrcParser } from "../utils/func";
import { togglePushRoute } from "./queue";
import {
  finishDownloading,
  startDownloading,
  updateDownloadProgress,
} from "./ui";

export function fetchSong(name, id) {
  return (dispatch) => {
    dispatch({ type: types.START_FETCHING_SONG });

    axios
      .get(`/api/media/song?name=${name}&id=${id}`)
      .then(response => {
        let data = response.data;
        axios
          .get(data.lyric)
          .then(({ data: lrcString }) => {
            data.lyric = lrcParser(lrcString).scripts;
          })
          .catch((err) => console.log(err));
        data.cover = data.artist ? data.artist.cover : "";
        const ids = {
          songId: data.id,
          artistId: data.artist.id,
        };
        dispatch(fetchSuggestedSongs(ids));

        delete data.artist;
        dispatch({ type: types.FETCH_SONG_SUCCESS, data });
        dispatch(togglePushRoute(false));
        dispatch({
          type: types.ADD_SONG_TO_QUEUE,
          song: {
            name: data.name,
            id,
            artists: data.artists,
            thumbnail: data.thumbnail,
          },
        });
      })
      .catch((err) => {
        console.log(err);

        dispatch({ type: types.FETCH_SONG_FAILURE });
        browserHistory.push("/notfound/song");
      });
  };
}

export function fetchSuggestedSongs({ songId, artistId }) {
  return (dispatch) => {
    axios
      .get(
        `${MEDIA_ENDPOINT}/suggested-song?artistId=${artistId}&songId=${songId}`
      )
      .then(({ data }) =>
        dispatch({
          type: types.FETCH_SUGGESTED_SONG_SUCCESS,
          songs: data.data.items,
        })
      )
      .catch((err) =>
        dispatch({
          type: types.FETCH_SUGGESTED_SONG_FAILURE,
        })
      );
  };
}

export function download({ songName, id, filename }) {
  return (dispatch) => {
    dispatch(startDownloading(id)); // dispatch the action for showing loading progress bar
    axios.get(`${MEDIA_ENDPOINT}/download?id=${id}`)
         .then(response =>{
            const url = response.data["128"]?response.data["128"]: null;
            if(!url){
              alert("Cannot download this song, you must Vip user");
              return;
            }
            axios({
              method: "get",
              url,
              responseType: "arraybuffer",
              onDownloadProgress: (progressEvent) => {
                const percentCompleted = Math.floor(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                // do whatever you like with the percentage complete
                // maybe dispatch an action that will update a progress bar or something
                dispatch(updateDownloadProgress(percentCompleted));
              },
            })
              .then((response) => {
                const blob = new Blob([response.data], { type: "audio/mpeg" });
                const link = document.createElement("a");
                link.href = window.URL.createObjectURL(blob);
                link.download = `${songName}.mp3`;
                link.click();
        
                dispatch(finishDownloading());
              })
              .catch((err) => {
                throw err;
              });
         })
      };
}
