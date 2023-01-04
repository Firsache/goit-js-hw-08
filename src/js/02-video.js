import Player from '@vimeo/player';
// import Vimeo from '@vimeo/player'
// import throttle from 'lodash.throttle'


// const player = new Vimeo.Player(iframe);

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const currentTime = player.on('timeupdate', function (data) {
    console.log(data.seconds);
    return data.seconds;
});

// document.addEventListener(
// 'timeupdate',
// throttle(() => {
    
// },100)
// )

// localStorage.setItem("videoplayer-current-time", JSON.stringify(currentTime));

