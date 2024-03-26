const boardRegions = document.querySelectorAll('#gameBoard span')
let vBoard = []
let turnPlayer = ''

function updateTitle() {
  const playerInput = document.getElementById(turnPlayer)
  document.getElementById('turnPlayer').innerText = playerInput.value
}

function initializeGame(){
    vBoard = [['','',''], ['','',''], ['','','']];
    turnPlayer= 'player1';
    document.querySelector('h2').innerHTML = 'Vez de: <span id="turnPlayer"></span>';
    updateTitle()
    boardRegions.forEach((element)=>{
        element.classList.remove('win')
        element.innerText = ''
        element.addEventListener('click', handleBoardClick)
    })
}

function getWinRegions(){
    const winRegions = [];
    if (vBoard[0][0] && vBoard[0][0] === vBoard[0][1] && vBoard[0][0] === vBoard[0][2])
    winRegions.push("0.0", "0.1", "0.2")
  if (vBoard[1][0] && vBoard[1][0] === vBoard[1][1] && vBoard[1][0] === vBoard[1][2])
    winRegions.push("1.0", "1.1", "1.2")
  if (vBoard[2][0] && vBoard[2][0] === vBoard[2][1] && vBoard[2][0] === vBoard[2][2])
    winRegions.push("2.0", "2.1", "2.2")
  if (vBoard[0][0] && vBoard[0][0] === vBoard[1][0] && vBoard[0][0] === vBoard[2][0])
    winRegions.push("0.0", "1.0", "2.0")
  if (vBoard[0][1] && vBoard[0][1] === vBoard[1][1] && vBoard[0][1] === vBoard[2][1])
    winRegions.push("0.1", "1.1", "2.1")
  if (vBoard[0][2] && vBoard[0][2] === vBoard[1][2] && vBoard[0][2] === vBoard[2][2])
    winRegions.push("0.2", "1.2", "2.2")
  if (vBoard[0][0] && vBoard[0][0] === vBoard[1][1] && vBoard[0][0] === vBoard[2][2])
    winRegions.push("0.0", "1.1", "2.2")
  if (vBoard[0][2] && vBoard[0][2] === vBoard[1][1] && vBoard[0][2] === vBoard[2][0])
    winRegions.push("0.2", "1.1", "2.0")
  return winRegions
}

function disableRegion(element){
    element.classList.remove('cursor-pointer');
    element.classList.add('cursor-forbidden')
    element.removeEventListener('click', handleBoardClick);

}

function handleWin(regions) {
    regions.forEach(function (region) {
      document.querySelector('[data-region="' + region + '"]').classList.add('win')
    })
    const playerName = document.getElementById(turnPlayer).value
    document.querySelector('h2').innerHTML = `${playerName} venceu!`
}

function handleBoardClick(ev){
    const span = ev.currentTarget;
    const region = span.dataset.region;
    const rowColumnPair = region.split('.')
    const row = rowColumnPair[0]
    const column = rowColumnPair[1]
     if(turnPlayer === 'player1'){
        span.innerText = 'X'
        vBoard[row][column] = 'X'
     } else{
        span.innerText = 'O'
        vBoard[row][column] = 'O'
     }
    disableRegion(span);
    const winRegions = getWinRegions();
    if (winRegions.length > 0){
        handleWin(winRegions);
    } else if(vBoard.flat().includes('')){
        turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1'
        updateTitle()
    } else{
        document.querySelector('h2').innerHTML = 'EMPATOU'
        boardRegions.forEach((element) => {
            element.classList.add('draw');
            element.removeEventListener('click', handleBoardClick);
          });
        }
    }

document.getElementById('start').addEventListener('click', initializeGame)