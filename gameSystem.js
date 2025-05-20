//게임 전체에서 사용될 덱 저장
const gameDeck = [ //[ 패의 점수, 특수패(광, 열끗)여부, 이미지 경로 ]
    {score: 1, isSpecial: true, img: "multiMedia/1_1광.jpg"},
    {score: 1, isSpecial: false, img: "multiMedia/1_2.jpg"},
    {score: 2, isSpecial: false, img: "multiMedia/2_1.jpg"},
    {score: 2, isSpecial: false, img: "multiMedia/2_2.jpg"},
    {score: 3, isSpecial: true, img: "multiMedia/3_1광.jpg"},
    {score: 3, isSpecial: false, img: "multiMedia/3_2.jpg"},
    {score: 4, isSpecial: true, img: "multiMedia/4_1열끗.jpg"},
    {score: 4, isSpecial: false, img: "multiMedia/4_2.jpg"},
    {score: 5, isSpecial: false, img: "multiMedia/5_1.jpg"},
    {score: 5, isSpecial: false, img: "multiMedia/5_2.jpg"},
    {score: 6, isSpecial: false, img: "multiMedia/6_1.jpg"},
    {score: 6, isSpecial: false, img: "multiMedia/6_2.jpg"},
    {score: 7, isSpecial: true, img: "multiMedia/7_1열끗.jpg"},
    {score: 7, isSpecial: false, img: "multiMedia/7_2.jpg"},
    {score: 8, isSpecial: true, img: "multiMedia/8_1광.jpg"},
    {score: 8, isSpecial: false, img: "multiMedia/8_2.jpg"},
    {score: 9, isSpecial: true, img: "multiMedia/9_1열끗.jpg"},
    {score: 9, isSpecial: false, img: "multiMedia/9_2.jpg"},
    {score: 10, isSpecial: false, img: "multiMedia/10_1.jpg"},
    {score: 10, isSpecial: false, img: "multiMedia/10_2.jpg"}
]

const defaultChip = 100; //기본적으로 배팅될 칩의 수
let nowChip = defaultChip; //배팅해야할 칩의 수

let playerChip = 1000; //플레이어가 소지한 칩, 초기치 1000개
let playerCard = []; //라운드마다 플레이어가 소지할 카드

let computerChip = 1000; //컴퓨터가 소지한 칩, 초기치 1000개
let computerCard = []; //라운드마다 컴퓨터가 소지할 카드

let roundDeck = gameDeck; //라운드마다 초기화되는 덱, startRound() 함수에서 시작마다 gameDeck 변수가 할당됨.
let bettingChip = 0; //현재 배팅된 칩, 라운드 승자의 칩을 수치만큼 가산 후 초기화


function startRound(){
    roundReset();

    playerChip = defaultBetting(playerChip); // 플레이어 기본 배팅
    computerChip = defaultBetting(computerChip); // 컴퓨터 기본 배팅

    for(let i = 0; i<2; i++){ // 모든 유저의 카드뽑기 2회 진행.
        getCard(playerCard);
        getCard(computerCard);
    }

    openComputerCard(computerCard, 0);
}

//라운드 초기화
function roundReset(){
    roundDeck = gameDeck; //라운드에서 사용할 덱 초기화
    bettingChip = 0; //현재 배팅된 칩을 0개로 초기화
    nowChip = defaultChip; //배팅해야할 칩을 defaultChip 개로 초기화

    playerCard = []; // 플레이어 카드 초기화
    computerCard = []; //컴퓨터 카드 초기화
}

//모든 카드를를 뒷면으로 설정
function closeCard(){
    document.getElementsByClassName("playerCard1")[0].src = "multiMedia/0_0뒷면.jpg";
    document.getElementsByClassName("playerCard2")[0].src = "multiMedia/0_0뒷면.jpg";
    document.getElementsByClassName("computerCard1")[0].src = "multiMedia/0_0뒷면.jpg";
    document.getElementsByClassName("computerCard2")[0].src = "multiMedia/0_0뒷면.jpg";
}

//카드 공개
function openComputerCard(userCard, num){
    document.getElementsByClassName("computerCard1")[0].src = userCard[num].img;
}

// 카드 뽑기
function getCard(userCard){
    let randomNum = Math.floor(Math.random() * roundDeck.length) // 0 ~ ( roundDeck의 길이 - 1 ) 에 해당하는 값 랜덤 지정, 카드를 뽑기 위함
    
    userCard.push(roundDeck[randomNum]); //카드추가
    roundDeck.splice(randomNum, 1); //roundDeck에서 카드 삭제 
}

//기본 배팅
function defaultBetting(userChip){
    if (userChip === playerChip){ // 플레이어의 칩 확인
        if (userChip < 0) { //칩이 없으면 패배
            loseGame();
        }
    }
    else{// 컴퓨터의 칩 확인
        if (userChip < 0) { //칩이 없으면 패배
            winGame();
        }
    }
    if (userChip < defaultChip){ //칩이 defaultChip개 미만이라면 칩을 전부 배팅
        bettingChip = bettingChip + userChip
        userChip = 0;
    }
    else{ //칩이 defaultChip개 이상이라면 defaultChip개 만큼 배팅
        bettingChip = bettingChip + defaultChip
        userChip = userChip - defaultChip
    }
    return userChip;
} 

function computerBetting(userChip){
    let bettingType = computerJudg(computerCard[0],computerCard[1], computerCard[3])

    if (bettingType === "die"){

    }
    else if (bettingType === "call"){

    }
    else {
        
    }
}

//플레이어의 칩이 0개가 되면 출력되는 코드 == 패배시 출력되는 코드
function loseGame(){
    
}

//모든 컴퓨터의 칩이 0개가 되면 출력되는 코드 == 승리시 출력되는 코드
function winGame(){
    
}

function getCardScore(card1, card2) {
    let temp = [card1, card2].sort((a, b) => a.score - b.score); //card1과 card2를 score의 크기에 따라 정렬 | a = card1, b = card2 를 의미하며 a.score - b.score가 음수라면 a가 b보다 먼저, 양수라면 b가 a보다 먼저 옴. => score값에 따라 오름차순 정렬
    card1 = temp[0];
    card2 = temp[1];

    if (card1.score === 4 && card2.score === 9){ //구사
        return 49
    }
    else if (card1.score === 3 && card1.isSpecial === true && card2.score === 7 && card2.isSpecial === true){ //땡잡이
        return 99
    }
    else if (card1.score === 4 && card1.isSpecial === true && card2.score === 7 && card2.isSpecial === true){ //암행어사
        return 1500
    }
    else if (card1.score === 3 && card1.isSpecial === true && card2.score === 8 && card2.isSpecial === true){ //38광땡
        return 3838
    }
    else if (card1.score === 1 && card1.isSpecial === true && card2.score === 8 && card2.isSpecial === true){ //18광땡
        return 2038
    }
    else if (card1.score === 1 && card1.isSpecial === true && card2.score === 3 && card2.isSpecial === true){ //13광땡
        return 2038
    }
    else if (card1.score === card2.score){ //1~10땡
        return card1.score * 100
    }
    else if (card1.score === 1 && card2.score === 2){ //알리 
        return 45
    }
    else if (card1.score === 1 && card2.score === 4){ //독사
        return 40
    }
    else if (card1.score === 1 && card2.score === 9){ //구삥
        return 35
    }
    else if (card1.score === 1 && card2.score === 10){ //장삥
        return 30
    }
    else if (card1.score === 4 && card2.score === 10){ //장사
        return 25
    }
    else if (card1.score === 4 && card2.score === 6){ //세륙
        return 20
    }
    else { // 0 ~ 9 끗
        return (card1.score + card2.score) % 10
    }
} //카드 입력 시 족보 출력.

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
function computerJudg(card1, card2, card3) {
    if (card3 === undefined){
        let computerScore = getCardScore(card1, card2);
    }
    else{
        let computerScore = Math.max(getCardScore(card1, card2), getCardScore(card2, card3), getCardScore(card1, card3))
    }
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

