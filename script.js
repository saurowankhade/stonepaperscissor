const computerDecision = ['Stone','Paper','Scissor'];
 
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

let ani = document.querySelector('canvas');
let h = document.querySelector('h2');


let result_dialog = document.querySelector('.result_dialog');
let result_img = document.querySelector('.result_img');
let result_h1 = document.querySelector('.result_h1');
        

const audio = document.querySelector("audio");

// auto play background audio
window.addEventListener("DOMContentLoaded", event => {
    console.log(audio); 
   console.log( audio.play());
  });



// console.log(img);

img.forEach((im) =>{
    im.addEventListener('click',()=>{
        const randomNumber = Math.floor(Math.random() * 3); // generate random number form 0 to 3 -> (0,1,2)
        let computerChoice = computerDecision[randomNumber]; //computer choice according to random number
        let userChoice = im.getAttribute('title');
        
        resetHand(); // reset hand possion to default stone

        showHand(userChoice,computerChoice); // hand changes 
        
        console.log(`UserChoice is : ${userChoice} and ComputerChoice is : ${computerChoice }`);
        
    });
});

// check who will win 
function checkWhoIsWin(userChoice,computerChoice){
    game++; // counting how much time game has played
    console.log(`Game played : ${game}`);
        if(userChoice === computerChoice){
            console.log('Game Tide!');
        } else{
            winner.forEach((win) =>{
                if( (win[0] === userChoice || win[0] === computerChoice) && 
                (win[1] === userChoice || win[1] === computerChoice) ){
                    if(win[2] === userChoice){
                        console.log(`Winner is User`);
                        ani.style.visibility = 'visible'; // winner aimation show
                        h.innerText = "User Win"; 
                        userWin++; // counting user win
                    } else{
                        console.log(`Winner is Computer`);
                        h.innerText = 'Computer Win!';
                        computerWin++; // counting computer win
                    }
                }
            });
        }


        setTimeout(()=>{
            resetHand(); // reset hand to original one
            ani.style.visibility = 'hidden'; // animation hidden
            h.innerText = 'You';


            if(game === 5){
                result_dialog.style.visibility = 'visible'; // final result dialog show
                if(userWin === computerWin){
                    result_h1.innerText = 'Game Tide!!'
                }
                else if(userWin > computerWin){
                    result_h1.innerText = 'You Win';
                    result_img.src = 'media/win.gif';
                    ani.style.visibility = 'visible';
                    console.log(`1st inning win by user ${userWin}`);
                } else{
                    result_h1.innerText = 'You Lost';
                    result_img.src = 'media/lose.gif';
                    console.log(`1st inning win by Computer ${computerWin}`);
                }
                
                game = 0; // reset game count
                userWin = 0; // reset user win count
                computerWin =  0; // rest computer win
            }
        },2000);
     
  
      
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
            case 'Paper' : left_hand_source = 'media/left_Paper.png'; break;
            default: console.log('Error');
        }

        switch(computerHand){
            case 'Stone' : right_hand_source = 'media/right_stone.png'; break;
            case 'Scissor' : right_hand_source = 'media/right_scissor.png'; break;
            case 'Paper' : right_hand_source = 'media/right_Paper.png'; break;
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
    resetHand();
    result_dialog.style.visibility = 'hidden';
    ani.style.visibility = 'hidden';

});

iCard[1].addEventListener('click',()=>{
    location.reload(true);
});



// original hand 
function resetHand(){
    left_hand.src = 'media/left_stone.png';
    right_hand.src = 'media/right_stone.png';
}