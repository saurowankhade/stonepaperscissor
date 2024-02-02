let img1 = document.querySelector('.img1');
let img2 = document.querySelector('.img2');
let main_screen = document.querySelector('main');
 
let di = document.querySelectorAll('dialog');

let playDilog = document.querySelector('.second_screen');
let btn = document.querySelector('.btn');

let music = document.querySelector("audio");


img1.addEventListener('animationend',()=>{
    playDilog.classList.add('fade_in');
    playDilog.style.visibility = 'visible';
}); 

btn.addEventListener('click',()=>{
    music.src = 'media/bgaudio.mp3';
    di[0].style.visibility = 'hidden';
    di[1].style.visibility = 'hidden';
    main_screen.classList.add('fade_in');
});
main_screen.addEventListener('animationend',()=>{
    main_screen.classList.remove('fade_in');
});
