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

const defaultChip = 10; //기본적으로 배팅될 칩의 수

let player = {
    name: "player", //구분용 이름
    chip: 1000, //플레이어가 소지한 칩, 초기치 1000개
    card: [], //라운드마다 플레이어가 소지할 카드
    selectCard: []
};

let computer = {
    name: "computer", //구분용 이름
    chip: 1000, //컴퓨터가 소지한 칩, 초기치 1000개
    card: [] //라운드마다 컴퓨터가 소지할 카드
};

let round = {
    deck: gameDeck, //라운드마다 초기화되는 덱, startRound() 함수에서 시작마다 gameDeck 변수가 할당됨.
    bettingChip: 0, //현재 배팅된 칩, 라운드 승자의 칩을 수치만큼 가산 후 초기화
    nowChip: defaultChip, //배팅해야할 칩의 수
    alive: [player.name, computer.name], // 현재 살아있는 유저, 1이 되면 종료
    callUser: [], //콜을 외친 유저 
    round: 0,
    bettingTurn: "end"
}

let userList = [ player, computer ]

function startRound(){
    roundReset();

    defaultBetting(player); // 플레이어 기본 배팅
    defaultBetting(computer); // 컴퓨터 기본 배팅

    docBettingChip() //표기변경
    docUserChip() //표기변경

    for(let i = 0; i<2; i++){ // 모든 유저의 카드뽑기 2회 진행.
        getCard(player);
        getCard(computer);
    }

    openPlayerCard(0);
    openPlayerCard(1);
    openComputerCard(computer, 0); // 컴퓨터의 첫번째 카드 공개

    let rand = Math.random() * 100;

    if (rand < 50){
        round.bettingTurn = userList[0].name
    }
    else{
        round.bettingTurn = userList[1].name
        setTimeout(computerBetting, 500);
    }

}

//라운드 초기화
function roundReset(){
    round.deck = [...gameDeck]; //라운드에서 사용할 덱 초기화
    round.bettingChip = 0; //현재 배팅된 칩을 0개로 초기화
    round.nowChip = defaultChip; //배팅해야할 칩을 defaultChip 개로 초기화
    round.alive = [player.name, computer.name]; //생존 유저 목록 초기화
    round.callUser = []; //콜을 외친 유저 목록 초기화
    round.round = 0;

    player.card = []; // 플레이어 카드 초기화
    computer.card = []; //컴퓨터 카드 초기화

    closeCard(); //카드 비공개
    docBettingChip() //표기변경
    docUserChip() //표기 변경
}

//모든 카드를를 뒷면으로 설정
function closeCard(){
    document.getElementById("playerCard1").src = "multiMedia/0_0뒷면.jpg";
    document.getElementById("playerCard2").src = "multiMedia/0_0뒷면.jpg";
    document.getElementById("playerCard3").src = "multiMedia/0_0뒷면.jpg";
    document.getElementById("computerCard1").src = "multiMedia/0_0뒷면.jpg";
    document.getElementById("computerCard2").src = "multiMedia/0_0뒷면.jpg";
    document.getElementById("computerCard3").src = "multiMedia/0_0뒷면.jpg";
}

//카드 공개
function openComputerCard(user, num){
    document.getElementById("computerCard1").src = user.card[num].img;
}

function openPlayerCard(num){
    if (num === 0) document.getElementById("playerCard1").src = player.card[num].img;
    else if (num === 1) document.getElementById("playerCard2").src = player.card[num].img;
    else if (num === 2) document.getElementById("playerCard3").src = player.card[num].img;
    else return;
}

//카드 전체 공개
function openAllCard(){
    document.getElementById("computerCard1").src = computer.card[0].img;
    document.getElementById("computerCard2").src = computer.card[1].img;
    if (computer.card[2] !== undefined) { //3번째 카드를 받은 경우에만 공개
        document.getElementById("computerCard3").src = computer.card[2].img;
    }
    document.getElementById("playerCard1").src = player.card[0].img;
    document.getElementById("playerCard2").src = player.card[1].img;
    if (player.card[2] !== undefined){ //3번째 카드를 받은 경우에만 공개
        document.getElementById("playerCard3").src = player.card[2].img;
    }
}

// 카드 뽑기
function getCard(user){
    let randomNum = Math.floor(Math.random() * round.deck.length) // 0 ~ ( roundDeck의 길이 - 1 ) 에 해당하는 값 랜덤 지정, 카드를 뽑기 위함
    
    user.card.push(round.deck[randomNum]); //카드추가
    round.deck.splice(randomNum, 1); //roundDeck에서 카드 삭제 
}

//기본 배팅
function defaultBetting(user){
    if (user === player){ // 플레이어의 칩 확인
        if (user.chip < 0) { //칩이 없으면 패배
            loseGame(); //게임 패배
        }
    }
    else{// 컴퓨터의 칩 확인
        if (user.chip < 0) { //칩이 없으면 패배
            winGame(); //게임 승리
        }
    }
    if (user.chip < defaultChip){ //칩이 defaultChip개 미만이라면 칩을 전부 배팅
        round.bettingChip = round.bettingChip + user.chip;  // 올인
        user.chip = 0; //유저의 칩 0개
        round.callUser.push(user.name) //콜한 유저 목록에 추가
    }
    else{ //칩이 defaultChip개 이상이라면 defaultChip개 만큼 배팅
        round.bettingChip = round.bettingChip + defaultChip;
        user.chip = user.chip - defaultChip;
    }
} 

//컴퓨터의 배팅
function computerBetting(){
    let bettingType = computerJudg(computer.card[0],computer.card[1], computer.card[3]) //배팅타입 "die", "call", "half" 중 하나 판단

    if (bettingType === "die"){ //로직 결과 == die
        dieBetting(computer); //컴퓨터의 다이 배팅
    }
    else if (bettingType === "call"){ //로직 결과 == call
        callBetting(computer); //컴퓨터의 콜 배팅
    }
    else { //로직 결과 == half
        halfBetting(computer); //컴퓨터의 하프 배팅
    }
    if (round.bettingTurn === "computer"){
        round.bettingTurn = userList[0].name; //배팅할 차례를 플레이어에게 넘김
    }
}

//다이 배팅
function dieBetting(user){
    if (round.bettingTurn === "end"){ //배팅할 턴이 아니라면 강제종료.
        return
    }
    if (user.name ==="player" && round.bettingTurn !== "player"){ //배팅할 턴이 아니라면 강제종료.
        alert("당신의 턴이 아닙니다!");
        return;
    }

    let index = round.alive.indexOf(user.name); //생존자 목록에서 다이 배팅을 한 유저 검색

    if (index !== -1){ //오류 방지
        round.alive.splice(index, 1); //생존자 목록에서 다이 배팅을 한 유저 삭제
    }

    if (round.alive.length === 1){ //생존자가 1명이라면
        endRound(); //라운드 종료 후 결산
        return;
    }
    
}

//콜 배팅
function callBetting(user){
    if (round.bettingTurn === "end"){ //배팅할 턴이 아니라면 강제종료.
        return
    }
    if (user.name ==="player" && round.bettingTurn !== "player"){ //배팅할 턴이 아니라면 강제종료.
        alert("당신의 턴이 아닙니다!");
        return;
    }
    if (user.chip <= 0){ //칩이 0개 이하라면
        if (round.alive.includes(user.name)){ //유저가 생존했는지 확인
            if (round.callUser.includes(user.name)){ //유저가 이미 콜을 했다면 강제종료.
                return;
            }
            else{
                round.callUser.push(user.name) // 칩이 0개 이하 + 생존 ->> 올인한 유저. 3번째 카드를 받는 과정에서 콜 유저 목록에서 빠져나간것임.
            }
        }
        return; //칩이 0개라면 넘어감
    }
    if (user.chip >= round.nowChip){ //유저의 칩이 배팅요구치보다 많으면
        user.chip = user.chip - round.nowChip; //요구치만큼 유저의 칩 감소
        round.bettingChip = round.bettingChip + round.nowChip; //전체 배팅 칩을 배팅요구치만큼 증가
    }
    else{
        round.bettingChip = round.bettingChip + user.chip; //전체 배팅 칩을 유저의 칩만큼 증가
        user.chip = 0; //올인이므로 유저의 칩을 0개로 만듦
    }
    round.callUser.push(user.name); //콜 배팅을 한 사람 목록에 유저 추가
    docBettingChip(); //표기변경
    docUserChip(); // 표기변경

    if (round.alive.length === round.callUser.length){ //생존한 유저와 콜한 유저의 수가 동일 -> 배팅종료 
        if (round.round === 0){ //3번째 카드를 받지 않은 상황이라면
            round.round++; //3번쨰 카드를 받은 상황으로 변수 설정
            round.callUser = []; //콜한 유저 초기화
            getCard(player); //3번째 카드 지급
            getCard(computer); //3번째 카드 지급
            openPlayerCard(2); //플레이어의 카드 오픈
            
            if (user.name === "player" && round.bettingTurn === "player"){
                round.bettingTurn = userList[1].name; //배팅할 유저 변경
                setTimeout(computerBetting, 500); //0.5초 후 컴퓨터의 배팅
            }
            else{
                round.bettingTurn = userList[0].name; //배팅할 유저 변경
            }
            return;
        }
        else { // 3번째 카드를 받은 상황
            endRound(); //라운드 종료
            return;
        }
    }
    if (user.name === "player" && round.bettingTurn === "player"){ //배팅할 턴이 아니라면 강제종료.
        round.bettingTurn = userList[1].name; //배팅할 유저 변경
        setTimeout(computerBetting, 500); //0.5초 후 컴퓨터의 배팅
        return;
    }
}

//하프 배팅
function halfBetting(user){
    if (round.bettingTurn === "end"){ //배팅할 턴이 아니라면 강제종료.
        return
    }
    if (user.name ==="player" && round.bettingTurn !== "player"){ //배팅할 턴이 아니라면 강제종료.
        alert("당신의 턴이 아닙니다!");
        return;
    }
    if (user.chip >= Math.floor(round.nowChip * 1.5)){ //유저의 칩이 배팅요구치의 1.5배보다 많으면
        round.nowChip = Math.floor(round.nowChip * 1.5); //요구치를 1.5배로 설정하고
        user.chip = user.chip - round.nowChip; //요구치만큼 유저의 칩 감소
        round.bettingChip = round.bettingChip + round.nowChip; //요구치만큼 전체 배팅 칩 증가
        round.callUser = [user.name]; //콜 배팅한 사람 목록을 유저명으로 할당

        docBettingChip(); //표기 변경
        docNowChip(); //표기 변경
        docUserChip(); //표기 변경
    }
    else if (user.chip < Math.floor(round.nowChip * 1.5)){ //유저의 칩이 요구치의 1.5배만큼 없다면
        callBetting(user); //강제로 콜 배팅으로 넘어감.
        return;
    }

    if (user.name == "player" && round.bettingTurn === "player"){ //배팅할 턴이 아니라면 강제종료.
        round.bettingTurn = userList[1].name; //배팅할 유저 변경
        setTimeout(computerBetting, 500); // 0.5초 후 컴퓨터의 배팅
        return;
    }
}

//라운드 종료 시 칩 분배 등의 결과를 정산하는 코드
function endRound(){
    round.bettingTurn = "end"; //배팅할 유저 초기화
    let winner; //변수 선언 << 승자가 누구인지 판단하는 변수

    if (round.alive.length === 1){ //생존자가 1명이라면
        for(let i = 0; i < userList.length; i++){ //유저의 수만큼 반복
            if (userList[i].name == round.alive){ //검색한 유저와 살아있는 유저가 같다면
                winner = userList[i]; //승자를 검색한 유저로 설정
                break;
            }
        }   
    }
    else if (round.alive.length > 1) { //생존자가 2명 시상이라면
        winner = getWinner(); //승자를 함수를통해 결정
    }
    
    openAllCard(); // 카드 전체 오픈
    winner.chip = winner.chip + round.bettingChip; //승자에게 칩 가산

    round.bettingChip = 0; //판에 배팅된 칩 초기화
    docBettingChip() //표기변경

    round.nowChip = defaultChip; //배팅해야하는 칩 수 초기화 
    docNowChip() //표기 변경

    docUserChip() //표기 변경
}

//플레이어의 칩이 0개가 되면 출력되는 코드 == 패배시 출력되는 코드
function loseGame(){
    
}

//모든 컴퓨터의 칩이 0개가 되면 출력되는 코드 == 승리시 출력되는 코드
function winGame(){
    
}

//배팅된 칩이 몇 개인지 변경시킴 ( html )
function docBettingChip() {
    document.getElementById("bettingChip").textContent = "배팅된 칩 : " + round.bettingChip; //표기 변경
}

//배팅요구치가 몇 개 인지 변경시킴 ( html )
function docNowChip() {
    document.getElementById("nowChip").textContent = "배팅요구치 : " + round.nowChip; // 표기 변경
}

//유저들의 칩 갯수 현황 변경 ( html )
function docUserChip() {
    document.getElementById("computerChip").textContent = "컴퓨터의 칩 : " + computer.chip;
    document.getElementById("playerChip").textContent = "플레이어의 칩 : " + player.chip;
}

//플레이어가 어떤 조합을 선택했는지 보여주는 카드
function docSelectCard() {
    let card1 = player.selectCard[0]; //플레이어가 고른 1번 카드
    let card2 = player.selectCard[1]; //플레이어가 고른 2번카드

    if (card1 === undefined) { //선택안했으면 n으로 변경
        card1 = "n"
    }
    if (card2 === undefined) {//선택안했으면 n으로 변경 
        card2 = "n"
    }

    document.getElementById("selectCard").textContent = "현재 조합한 카드 : " + card1 + "번 " + card2 + "번"; //표기 변경
}

//플레이어가 고른 조합 리셋
function selectReset() {
    player.selectCard = []; //플레이어가 고른 카드 리셋
    docSelectCard(); //표기변경
}

//1번카드 선택
function selectCard1(){
    if (player.selectCard.length < 3){ //카드는 2장까지만 선택가능
        player.selectCard.push(0); //고른 카드 배열에 넣기
        docSelectCard(); //표기변경
    }
}

//2번카드 선택
function selectCard2(){
    if (player.selectCard.length < 3){ //카드는 2장까지만 선택가능
        player.selectCard.push(1); //고른 카드 배열에 넣기
        docSelectCard(); //표기변경
    }
}

//3번카드 선택
function selectCard3(){
    if (player.selectCard.length < 3){ //카드는 2장까지만 선택가능
        player.selectCard.push(2); //고른 카드 배열에 넣기
        docSelectCard(); //표기변경
    }
}

//승자를 구하는 함수
function getWinner(){
    let computerScore = getCardScore(computer.card[0], computer.card[1]); //컴퓨터의 점수 구하기

    if (computer.card[2] !== undefined){ //3번째카드가 있으면 가장 높은 점수를 할당
        computerScore = Math.max(getCardScore(computer.card[0], computer.card[1]), getCardScore(computer.card[1], computer.card[2]), getCardScore(computer.card[0], computer.card[2]))
    }

    let n1 = player.selectCard[0] //선택 1번 카드
    let n2 = player.selectCard[1] //선택 2번 카드 

    if (n1 === undefined || n2 === undefined){ //하나라도 선택이 안되어있으면 1번(0) 카드와 2번(1) 카드로 강제선택
        n1 = 0;
        n2 = 1;
    }

    let playerScore = getCardScore(player.card[n1], player.card[n2]) //플레이어의 점수 구하기

    let score = [playerScore, computerScore]; //플레이어 점수와 컴퓨터 점수를 하나의 배열로 할당
    let maxScore = Math.max(score); //최댓값 구하기

    if (score.includes(1500)){ //암행어사가 있고
        if (maxScore === 2038){ //13광땡, 18광땡이 있다면
            return score.indexOf(1500) === 0 ? player : computer //암행어사 승리
        }   
        else{ //13광땡, 18광떙이 없다면
            score.indexOf(1500) === 0 ? playerScore = 1 : computerScore = 1; //암행어사는 1끗으로 취급됨
        }
    }

    if (score.includes(99)){ //땡잡이가 있고
        if (maxScore !== 1000 && maxScore % 100 === 0){ //가장 높은 패가 9땡이라면 
            return score.indexOf(99) === 0 ? player : computer; //땡잡이 승리
        }
        else { //땡이 없거나 땡보다 높은 패가 있다면
            score.indexOf(99) === 0 ? playerScore = 1 : computerScore = 1; //땡잡이는 1끗으로 취급됨.
        }
    }

    if (maxScore === 49){ //최댓값이 49 ( = 구사파토 ) 라면
        //재경기
    }
    
    return playerScore > computerScore ? player : computer //승자 출력
}

//카드 입력 시 족보 출력.
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
} 

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
    let computerScore = getCardScore(card1, card2);

    if (card3 !== undefined){
        computerScore = Math.max(getCardScore(card1, card2), getCardScore(card2, card3), getCardScore(card1, card3))
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

