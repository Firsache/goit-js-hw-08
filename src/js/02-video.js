import Player from '@vimeo/player';
import throttle from 'lodash.throttle';


const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const LOCALSTORAGE_KEY = "videoplayer-current-time";

let currentTime;

const onPlay = function (data) {
    currentTime = data.seconds;
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(currentTime));
};


player.on('timeupdate', throttle(onPlay, 1000));

player.setCurrentTime(localStorage.getItem(LOCALSTORAGE_KEY)).catch(function(error) {
});