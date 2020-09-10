document.addEventListener('DOMContentLoaded', () => {
    const 
    restart             =  document.querySelector("#restart"),
    playerScore         =  document.querySelector("#playerscore"),
    computerScore       =  document.querySelector("#computerscore"),
    round               =  document.querySelector("#round"),
    drawScore           =  document.querySelector("#draw"),
    result              =  document.querySelector("#result"),
    stonPaperScissor    =  document.querySelector("#stonPaperScissor"),
    model               =  document.querySelector("#model-container"),
    gameStart           =  document.querySelector("#game-start"),
    startModel          =  document.querySelector("#set-round"),
    playerName          =  document.querySelector("#playerName"),
    totalRound          =  document.querySelector("#rounds"),
    error               =  document.querySelector("#error"),
    greetingModel       =  document.querySelector("#final-greeting-model"),
    totalRoundDisplay   =  document.querySelector("#total-round"),
    greetingModelContent=  document.querySelector("#greeting-model-content"),
    sound1              =  document.querySelector("#sound1"),
    sound2              =  document.querySelector("#sound2"),
    sound3              =  document.querySelector("#sound4"),
    sound4              =  document.querySelector("#sound3"),
    sound5              =  document.querySelector("#sound5"),
    mute                =  document.querySelector("#mute"),
    addBtn              =  document.querySelector('.add-button');

    let audio, deferredPrompt;
    audio = true;
    mute.addEventListener('click', () => {
        if (audio == true) {
            audio = false;
            mute.classList.remove('fa-volume-up');
            mute.classList.add('fa-volume-mute');
        } else {
            audio = true;
            mute.classList.remove('fa-volume-mute');
            mute.classList.add('fa-volume-up');
        }
    });

    function playAudio1() { 
        sound1.play(); 
    } 
    function playAudio2() { 
        sound2.play(); 
    } 
    function playAudio3() { 
        sound3.play(); 
    } 
    function playAudio4() { 
        sound4.play(); 
    } 
    function playAudio5() { 
        sound5.play(); 
    } 

    const player = {
        totalRound: 0,
        playerName: 'Player'
    }

    const scores = {
        computerScore: 0,
        playerScore: 0,
        round: 0,
    }

    function start() {
        gameStart.style.display = "none";
        scores.computerScore = 0;
        scores.playerScore = 0;
        scores.round = 0;
        round.innerHTML = '<i class="fa fa-history"></i> 0'
        startModel.style.display = '';
        score()
        greetingModel.style.display = 'none';
        document.body.style = "default";
    }

    function finalResult() {
        gameStart.style.display = "none";
        greetingModel.style.display = 'block';
        if (scores.playerScore > scores.computerScore) {
            document.body.style.background = "url('./assets/img/giphy (7).gif')";
            if(audio == true) {
                playAudio5();
            }
            greetingModelContent.innerHTML = `
            <div class="winner" id="winner">
                <h2 class="title-greeting"><span>${player.playerName}</span> Win's</h2>
                <p class="total-round style">Total Round ${player.totalRound}</p>
                <p class="playerscore style">You Scored ${scores.playerScore}</p>
                <p class="computerscore style">Computer Scored ${scores.computerScore}</p>
                <p class="draw style">Total Draw ${scores.round - (scores.computerScore + scores.playerScore)}</p>
            </div>
            `;
        }else if(scores.playerScore === scores.computerScore) {
            document.body.style.background = "url('./assets/img/giphy (4).gif')";
            greetingModelContent.innerHTML = `
            <div class="" id="">
                <h2 class="title-greeting"><span>Draw</span></h2>
                <p class="total-round style">Total Round ${player.totalRound}</p>
                <p class="playerscore style">You Scored ${scores.playerScore}</p>
                <p class="computerscore style">Computer Scored ${scores.computerScore}</p>
                <p class="draw style">Total Draw ${scores.round - (scores.computerScore + scores.playerScore)}</p>
            </div>
            `; 
        } else {
            document.body.style.background = "url('./assets/img/giphy (3).gif')";
            greetingModelContent.innerHTML = `
            <div class="" id="">
                <h2 class="title-greeting"><span>You</span> lose</h2>
                <p class="total-round style">Total Round ${player.totalRound}</p>
                <p class="playerscore style">You Scored ${scores.playerScore}</p>
                <p class="computerscore style">Computer Scored ${scores.computerScore}</p>
                <p class="draw style">Total Draw ${scores.round - (scores.computerScore + scores.playerScore)}</p>
            </div>
            `; 
        }
    }

    function play(e) {
        if (player.totalRound === scores.round) {
            finalResult() 
        } else {
            if (e.target.id === 'rock' || e.target.id === 'paper' || e.target.id === 'scissors') { 
                    if(audio == true) {
                        playAudio1();
                    }
                    let computerChoose = match()
                    gameRound()
                    winner(e.target.id, computerChoose)
            }
        }
    }

    function gameRound() {
        scores.round += 1
        round.innerHTML = `<i class="fa fa-history"></i> ${scores.round}`
    }
    
    function match() {
        let computerChoose = Math.random()
        if(computerChoose < 0.30) {
            return 'rock'
        } else if(computerChoose < 0.60) {
            return 'paper'
        } else {
            return 'scissors'
        }
    }

    function winner(p, c) {
        const Cwin = "Computer Win's  🎃";
        const Pwin = `${player.playerName} Win's 🏆`
        if(p === c) {
            if(audio == true) {
                playAudio2();
            }
            ShowModel(p ,c, "Draw")
        } else if (p === 'rock') {
            if(c === 'paper') {
                if(audio == true) {
                    playAudio3();
                }
                ShowModel(p, c, Cwin, 'computer');
            } else if(c === 'scissors') {
                if(audio == true) {
                    playAudio4();
                }
                ShowModel(p, c, Pwin, 'player');
            }
        } else if (p === 'scissors') {
            if(c === 'rock') {
                if(audio == true) {
                    playAudio3();
                }
                ShowModel(p, c, Cwin, 'computer');
            } else if (c === 'paper') {
                if(audio == true) {
                    playAudio4();
                }
                ShowModel(p, c, Pwin, 'player')
            }
        } else if(p === 'paper') {
            if (c === 'rock') {
                if(audio == true) {
                    playAudio4();
                }
                ShowModel(p, c, Pwin, 'player')
            } else if(c== 'scissors') {
                ShowModel(p, c, Cwin, 'computer')
                if(audio == true) {
                    playAudio3();
                }
            }
        }
        document.querySelector('#close').addEventListener('click', () => {
            close()
        })
        score()
    }

    function ShowModel(p, c, winner, s = 'draw') {
        if(s === 'player') {
            scores.playerScore += 1
        } else if(s === 'computer') {
            scores.computerScore += 1
        } 
        stonPaperScissor.style.display = 'none'
        model.style.visibility = 'visible';
        model.style.opacity = '1';
        result.innerHTML = `
        <h1 style="color: red;text-transform: capitalize;" id="winner">${winner} 
            <button style="float: right;cursor: pointer" id="close">
                <b>x</b>
            </button>
        </h1>
        <div class="result-ico">
            <div>
                <h1>Player</h1>
                <img style="margin-top: 1rem;" src="./assets/img/${p}.png" >
                <p style="text-align: center">${p}</p>
            </div>
            <div>
                <h1>Computer</h1>
                <img style="margin-top: 1rem;" src="./assets/img/${c}.png">
                <p style="text-align: center">${c}</p>
            </div>
        </div>
        `;
    }

    function score() {
        playerScore.innerHTML = `
        <i class="fa fa-user"></i> ${scores.playerScore}
        `;
        computerScore.innerHTML = `
        <i class="fa fa-laptop"></i> ${scores.computerScore}
        `;
        drawScore.innerHTML = `
        <i class="fa fa-bolt"></i> ${scores.round - (scores.playerScore + scores.computerScore)}
        `;
        if (scores.round !== 0) {
            restart.style.display = 'inline-block'
        }
        restart.addEventListener('click', () => {
            startModel.style.display = '';
            start();
        });
    }
    function userDetails(e) {
        e.preventDefault()
        if (totalRound.value.match(/^[0-9]+$/g)) {
            if(parseInt(totalRound.value) !== 0) {
                player.playerName = playerName.value ? playerName.value : 'Player';
                player.totalRound = parseInt(totalRound.value);
                totalRoundDisplay.innerHTML = `<i class="fa fa-retweet"></i> ${player.totalRound}`
                gameStart.style.display = '';
                startModel.style.display = 'none';
                error.innerHTML = '';
            } else {
                error.innerHTML = 'Please set round greater than 0';
            }
        } else {
            error.innerHTML = 'Invalid Input';
        } 
    }

    function close() {
        model.style.visibility = 'hidden';
        model.style.opacity = '0';
        stonPaperScissor.style.display = '';
        if (player.totalRound === scores.round) {
            finalResult();
        }
    }

    document.querySelector('#stonPaperScissor').addEventListener('click', play)
    startModel.addEventListener('submit', userDetails)
    start();

    document.addEventListener('click', (e) => {
        if(e.target.id === 'model-container') {
            close()
        }

        if (e.target.id === 'final-greeting-model') {
            start();
        }
    });

    addBtn.style.display = 'none';
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        addBtn.style.display = 'block';
      
        addBtn.addEventListener('click', (e) => {
            addBtn.style.display = 'none';
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                deferredPrompt = null;
            });
        });
    });
});