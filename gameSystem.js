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

const defaultChip = 100;

let playerChip = 1000; //플레이어가 소지한 칩, 초기치 1000개
let playerCard = []; //라운드마다 플레이어가 소지할 카드

let computerChip = 1000; //컴퓨터가 소지한 칩, 초기치 1000개
let computerCard = []; //라운드마다 컴퓨터가 소지할 카드

let roundDeck = gameDeck; //라운드마다 초기화되는 덱, startRound() 함수에서 시작마다 gameDeck 변수가 할당됨.
let bettingChip = 0; //현재 배팅된 칩, 라운드 승자의 칩을 수치만큼 가산 후 초기화


function startRound(){
    roundDeck = gameDeck; //라운드에서 사용할 덱 초기화

    playerChip = defaultBetting(playerChip); // 플레이어 기본 배팅
    computerChip = defaultBetting(computerChip); // 컴퓨터 기본 배팅

    for(let i = 0; i<2; i++){ // 모든 유저의 카드뽑기 2회 진행.
        getCard(playerCard);
        getCard(computerCard);
    }
}

function getCard(whoCard){
    let randomNum = Math.floor(Math.random() * roundDeck.length) // 0 ~ ( roundDeck의 길이 - 1 ) 에 해당하는 값 랜덤 지정, 카드를 뽑기 위함
    
    whoCard.push(roundDeck[randomNum]); //카드추가
    roundDeck.splice(randomNum, 1); //roundDeck에서 카드 삭제 
} // 카드 뽑기

function defaultBetting(whoChip){
    if (whoChip === playerChip){ // 플레이어의 칩 확인
        if (whoChip < 0) { //칩이 없으면 패배
            loseGame();
        }
    }
    else{// 컴퓨터의 칩 확인
        if (whoChip < 0) { //칩이 없으면 패배
            winGame();
        }
    }
    if (whoChip < defaultChip){ //칩이 defaultChip개 미만이라면 칩을 전부 배팅
        bettingChip = bettingChip + whoChip
        whoChip = 0;
    }
    else{ //칩이 defaultChip개 이상이라면 defaultChip개 만큼 배팅
        bettingChip = bettingChip + defaultChip
        whoChip = whoChip - defaultChip
    }
    return whoChip;
} //기본 배팅

function loseGame(){
    //플레이어의 칩이 0개가 되면 출력되는 코드
}

function winGame(){
    //모든 컴퓨터의 칩이 0개가 되면 출력되는 코드
}

function getCardScore(card1, card2) {
    let temp = [card1, card2].sort((a, b) => a.score - b.score); //지피티로 작성한 코드, 추후 설명 붙일 예정
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