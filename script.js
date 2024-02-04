const computerDecision = ['Stone','Paper','Scissor'];

const originalSrc = 'media/bgaudio.mp3';
const loseSrc = 'media/lose.mp3';
const tieSrc = 'media/tie.mp3';
const winSrc = 'media/win.mp3';
 
// winner possibilities 
const winner = [
        ['Stone' , 'Paper' ,'Paper'],
        ['Stone' , 'Scissor' ,'Stone'],
        ['Paper' , 'Scissor' ,'Scissor']
];

// initialized counting
let userWin = 0;
let computerWin = 0;
let game = 0;


// finding id`s 
let img = document.querySelectorAll('.clickImg');

let left_hand = document.querySelector('.left_hand');
let right_hand = document.querySelector('.right_hand');

// let ani = document.querySelector('canvas');

let userScore = document.querySelector('.userScore');
let computerScore = document.querySelector('.computerScore');


let result_dialog = document.querySelector('.result_dialog');
let result_img = document.querySelector('.result_img');
let result_h1 = document.querySelector('.result_h1');

const audio = document.querySelector("audio");


let heart = document.querySelectorAll('i');

let temp_result = document.querySelector('.result_tmp');

let temp_result_h = document.querySelector('.result_temp_show');


// auto play background audio
window.addEventListener("DOMContentLoaded", event => {
    audio.play();
  });

  setTimeout(()=>{
    audio.play();
    audio.loop = true;

  },10);

// console.log(img);

img.forEach((im) =>{
    im.addEventListener('click',()=>{
        const randomNumber = Math.floor(Math.random() * 3); // generate random number form 0 to 3 -> (0,1,2)
        let computerChoice = computerDecision[randomNumber]; //computer choice according to random number
        let userChoice = im.getAttribute('title');

        temp_result.style.visibility = 'visible';
        
        resetHand(); // reset hand possion to default stone

        showHand(userChoice,computerChoice); // hand changes 
        
        console.log(`UserChoice is : ${userChoice} and ComputerChoice is : ${computerChoice }`);
        
    });
});

// check who will win 
function checkWhoIsWin(userChoice,computerChoice){
   // counting how much time game has played
    switch(game){
        case 0: heart[4].style.color = 'rgba(165, 42, 42, 0.409)'; break
        case 1: heart[3].style.color = 'rgba(165, 42, 42, 0.409)'; break;
        case 2: heart[2].style.color = 'rgba(165, 42, 42, 0.409)'; break;
        case 3: heart[1].style.color = 'rgba(165, 42, 42, 0.409)'; break;
        case 4: heart[0].style.color = 'rgba(165, 42, 42, 0.409)'; break;
        default : console.log('Error');
    }
   
    game++; 
    console.log(`Game played : ${game}`);
        if(userChoice === computerChoice){
            temp_result_h.innerText = 'Draw!!';
            audio.src = tieSrc;
            resetHand(); // reset hand to original one
            console.log('Draw!');
        } else{
            winner.forEach((win) =>{
                if( (win[0] === userChoice || win[0] === computerChoice) && 
                (win[1] === userChoice || win[1] === computerChoice) ){
                    
                    resetHand(); // reset hand to original one
                    if(win[2] === userChoice){
                        audio.src = winSrc;
                        console.log(`Winner is User`);
                        userScore.innerText = userWin+1;
                        temp_result.style.backgroundImage = ' url(media/celebration.gif)';
                        temp_result_h.innerText = 'You Win!!';
                        userWin++; // counting user win
                    } else{
                        audio.src = loseSrc ;
                        console.log(`Winner is Computer`);
                        computerScore.innerText = computerWin+1;
                        temp_result_h.innerText = 'You Lost!!';
                        computerWin++; // counting computer win
                    }
                    
                }
            });
        }

        setTimeout(()=>{
            if(game !== 0){
                audio.src = originalSrc;
            }

            temp_result_h.innerText = '';
            temp_result.style.backgroundImage = 'none';
            temp_result.style.visibility = 'hidden';
        },1500);

        if(game === 5){
        setTimeout(()=>{
            resetHand();

            result_dialog.style.visibility = 'visible'; // final result dialog show

            if(userWin === computerWin){
                result_h1.innerText = 'Game Tie!!'
                result_img.src = 'media/draw_gif.gif';
                audio.src = tieSrc;
            }
            else if(userWin > computerWin){
                audio.src = winSrc;
                result_h1.innerText = 'You Win';
                result_dialog.style.backgroundImage = ' url(media/celebration.gif)';
                result_img.src = 'media/win.gif';
                console.log(`1st inning win by user ${userWin}`);
            } else{
                audio.src = loseSrc;
                result_h1.innerText = 'You Lost';
                result_img.src = 'media/lose.gif';
                console.log(`1st inning win by Computer ${computerWin}`);
            }
            
            game = 0; // reset game count
            userWin = 0; // reset user win count
            computerWin =  0; // rest computer win
                
            
        },1500);

    }
     
  
      
};


// hand changes according to user and computer input
function showHand(userHand,computerHand){
    left_hand.classList.add('hand');
    right_hand.classList.add('hand');

    let left_hand_source = 'media/left_paper.png';
    let right_hand_source = 'media/right_scissor.png';

    left_hand.addEventListener('animationend',()=>{
        
        switch(userHand){
            case 'Stone' : left_hand_source = 'media/left_stone.png'; break;
            case 'Scissor' : left_hand_source = 'media/left_scissor.png'; break;
            case 'Paper' : left_hand_source = 'media/left_paper.png'; break;
            default: console.log('Error');
        }

        switch(computerHand){
            case 'Stone' : right_hand_source = 'media/right_stone.png'; break;
            case 'Scissor' : right_hand_source = 'media/right_scissor.png'; break;
            case 'Paper' : right_hand_source = 'media/right_paper.png'; break;
            default: console.log('Error');
        }

        left_hand.src = left_hand_source;
        right_hand.src = right_hand_source;
        left_hand.classList.remove('hand');
        right_hand.classList.remove('hand');
        
    });

    setTimeout(()=>{
        checkWhoIsWin(userHand,computerHand); // check winner
    },2000);

   
};


// result dialog

let iCard = document.querySelectorAll('.iCard');

iCard[0].addEventListener('click',()=>{
    resetHand(); // origin hand (Stone)
    resetHeart(); // reset life line
    audio.src = originalSrc;
    result_dialog.style.visibility = 'hidden';
    userScore.innerText = '0';
    computerScore.innerText = '0';
    result_dialog.style.backgroundImage = 'none';

    
});


// reset heart -> lifeLine of game which is 5
function resetHeart(){
    heart.forEach((he)=>{
        he.style.color = 'red';
    });

    iCard.forEach((i)=>{
        i.style.color = 'rgb(43, 43, 32)';
    });
}

iCard[1].addEventListener('click',()=>{
    location.reload(true);
});



// original hand 
function resetHand(){
    left_hand.src = 'media/left_stone.png';
    right_hand.src = 'media/right_stone.png';
}