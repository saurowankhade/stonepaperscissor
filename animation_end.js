let img1 = document.querySelector('.img1');
let img2 = document.querySelector('.img2');
let main_screen = document.querySelector('main');

let di = document.querySelectorAll('dialog');

let playDilog = document.querySelector('.second_screen');
let btn = document.querySelector('.btn');

img1.addEventListener('animationend',()=>{
    playDilog.classList.add('fade_in');
    playDilog.style.visibility = 'visible';
}); 

btn.addEventListener('click',()=>{
    di[0].style.visibility = 'hidden';
    di[1].style.visibility = 'hidden';
    main_screen.classList.add('fade_in');
});



let iCard = document.querySelectorAll('.iCard');
let result_dialog = document.querySelector('.result_dialog');

iCard[0].addEventListener('click',()=>{
    result_dialog.style.visibility = 'hidden';
});

iCard[1].addEventListener('click',()=>{
    location.reload(true);
});