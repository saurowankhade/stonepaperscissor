const computerDecision = ['Stone','Paper','Scissor'];
 
const winner = [
        ['Stone' , 'Paper' ,'Paper'],
        ['Stone' , 'Scissor' ,'Stone'],
        ['Paper' , 'Scissor' ,'Scissor']
];

let userWin = 0;
let computerWin = 0;
let game = 0;


window.addEventListener("DOMContentLoaded", event => {
    const audio = document.querySelector("audio");
    console.log(audio);
    // audio.volume = 0.2;
    
   console.log( audio.play());
  });


let img = document.querySelectorAll('.clickImg');

let left_hand = document.querySelector('.left_hand');
let right_hand = document.querySelector('.right_hand');

let ani = document.querySelector('canvas');
let h = document.querySelector('h2');


// console.log(img);

img.forEach((im) =>{
    im.addEventListener('click',()=>{
        const randomNumber = Math.floor(Math.random() * 3);
        let computerChoice = computerDecision[randomNumber];
        let userChoice = im.getAttribute('title');
        // console.log(computerChoice);

        left_hand.src = 'media/left_stone.png';
        right_hand.src = 'media/right_stone.png';

        

        showHand(userChoice,computerChoice);

        console.log(`UserChoice is : ${userChoice} and ComputerChoice is : ${computerChoice }`);

        if(userChoice === computerChoice){
            game++;
            console.log('Game Tide');

        } else{
            checkWhoIsWin(userChoice,computerChoice);
        }


        
        if(game === 5){
            game = 0;
            userWin = 0;
            computerWin =  0;
            if(userWin === computerWin){
                ani.style.visibility = 'visible';
                h.innerText = "Inning win by user"
            }
            else if(userWin > computerWin){
                console.log(`1st inning win by user ${userWin}`);
            } else{
                console.log(`1st inning win by Computer ${computerWin}`);
            }
        }
    });
});


function checkWhoIsWin(userChoice,computerChoice){
 
        winner.forEach((win) =>{
            if( (win[0] === userChoice || win[0] === computerChoice) && 
            (win[1] === userChoice || win[1] === computerChoice) ){
                game++; // counting how much time game has played
                if(win[2] === userChoice){
                    console.log(`Winner is User`);
                    setTimeout(()=>{
                        ani.style.visibility = 'visible';
                        h.innerText = "User Win"
                    }, 2000);
                    setTimeout(()=>{
                        ani.style.visibility = 'hidden';
                        h.innerText = "User"
                    }, 4000); 
                    userWin++;
                } else{
                    console.log(`Winner is Computer`);
                    computerWin++;
                    h.innerText = "Computer Win";

                    ani.style.visibility = 'hidden';

                    setTimeout(()=>{
                        ani.style.visibility = 'hidden';
                        h.innerText = "bye"
                    }, 3000);
                }
            }
        });
};


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
};