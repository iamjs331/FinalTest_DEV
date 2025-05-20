let computerChip = 1000; //컴퓨터가 소지한 칩, 초기값 1000개
let computerCard = []; //라운드마다 플레이어가 소지할 카드

let computerDeck = gameDeck;
let bettingChip = 0; //현재 배팅된 칩, 라운드 내에서 컴퓨터가 더 배칭하거나 승리시 가져온 후 초기화


//족보에 따라 랜덤한 확률 출력 함수수

// 최상위 족보의 확률 출력 함수
function bestHighScore() { 
    let rand = Math.random() * 100; // 0 이상 100 미만의 실수
    if (rand < 40) {
        return "call"; // 0~39.999... 40%
    } else if (rand < 99) {
        return "half"; // 40~98.999... 59%
    } else {
        return "die"; // 99~99.999... 1%
    }
}

// 상위 족보의 확률 출력 함수
function highScore() { 
    let rand = Math.random() * 100;
    if (rand < 55) {
        return "call"; // 55%
    } else if (rand < 98) {
        return "half"; // 43%
    } else {
        return "die"; // 2%
    }
}

// 중상위 족보의 확률 출력 함수
function middleHighScore() { 
    let rand = Math.random() * 100;
    if (rand < 70) {
        return "call"; // 70%
    } else if (rand < 95) {
        return "half"; // 25%
    } else {
        return "die"; // 5%
    }
}
// 중위 족보의 확률 출력 함수
function middleScore() { 
    let rand = Math.random() * 100;
    if (rand < 80) {
        return "call"; // 80%
    } else if (rand < 95) {
        return "half"; // 15%
    } else {
        return "die"; // 5%
    }
}
// 중하위 족보의 확률 출력 함수
function middleLowScore() { 
    let rand = Math.random() * 100;
    if (rand < 60) {
        return "call"; // 60%
    } else if (rand < 70) {
        return "half"; // 10%
    } else {
        return "die"; // 30%
    }
}
// 하위 족보의 확률 출력 함수
function lowScore() { 
    let rand = Math.random() * 100;
    if (rand < 40) {
        return "call"; // 40%
    } else if (rand < 45) {
        return "half"; // 5%
    } else {
        return "die"; // 55%
    }
}
// 최하위 족보의 확률 출력 함수
function bestLowScore() { 
    let rand = Math.random() * 100;
    if (rand < 10) {
        return "call"; // 10%
    } else if (rand < 100) {
        return "die"; // 90%
    } //harf 없으므로 0%
}
// 특수족보 확률 출력 함수
function specialScore() { 
    let bluffing = Math.random() // 블러핑 확률 반반(0 ~ 0.499... / 0.5 ~ 0.999...)
    let rand = Math.random() * 100;
    if (bluffing < 0.5) { // 경우1
        if (rand < 70) {
            return "call"; // 70%
        } else if (rand < 95) {
            return "half"; // 25%
        } else {
            return "die"; // 5%
        }
    } else { // 경우2
        if (rand < 40) {
            return "call"; // 40%
        } else if (rand < 45) {
            return "half"; // 5%
        } else {
            return "die"; // 55%
        }
    }
}

// 컴퓨터가 받은 패를 판단 후 확률 출력하는 함수
function computerJudg() {
    const computerScore = getCardScore(computerCard[0], computerCard[1]);
    if (computerScore === 0) { // "망통"
        return bestLowScore();
    } else if (computerScore === 49 || computerScore === 99 || computerScore === 1500) { // "특수패"
        return specialScore();
    } else if (computerScore < 5) { // "~4끗"
        return lowScore();
    } else if (computerScore < 8) { // "~7끗"
        return middleLowScore();
    } else if(computerScore < 20) { // "~9끗"
        return middleScore();
    } else if(computerScore < 700) { // "세륙 ~ 알리"
        return middleHighScore();
    } else if(computerScore < 2000) { // "7땡 ~ 장땡"
        return highScore();
    } else { // "광땡들"
        return bestHighScore();
    }
}
