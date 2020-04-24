var appData = {};

appData.startButton = document.getElementById('start');
appData.hitButton = document.getElementById('hit');
appData.stayButton = document.getElementById('stay');
appData.doubleButton = document.getElementById('ddbutton');
appData.roundButton = document.getElementById('runround');
//appData.playerName = document.getElementById('pname');
appData.money = document.getElementById('buyin');
appData.pBet = document.getElementById('playerBet');
appData.pHand = document.getElementById('playerHand');
appData.pcard1 = document.getElementById('pcard1');
appData.pcard2 = document.getElementById('pcard2');

appData.allCards = [];
appData.deck = [];
appData.players = []; //array of all player, dealer last
appData.canPlayTurn = false;
appData.roundRunning = false;
appData.gameRunning = false;

//---
var account_balance;
var display_name;
var games_won;
var games_lost;
var net_profit;

function Card(v, suit, id, imgname)
{
    this.title = v;
    this.suit = suit;
    this.id = id;
    this.inDeck = false;
    this.imgname = imgname;

    if(v == "ACE")
    {
      this.number = 11;
    }
    if(v == "TWO")
    {
      this.number = 2;
    }
    if(v == "THREE")
    {
      this.number = 3;
    }
    if(v == "FOUR")
    {
      this.number = 4;
    }
    if(v == "FIVE")
    {
      this.number = 5;
    }
    if(v == "SIX")
    {
      this.number = 6;
    }
    if(v == "SEVEN")
    {
      this.number = 7;
    }
    if(v == "EIGHT")
    {
      this.number = 8;
    }
    if(v == "NINE")
    {
      this.number = 9;
    }
    if(v == "TEN")
    {
      this.number = 10;
    }
    if(v == "JACK")
    {
      this.number = 10;
    }
    if(v == "QUEEN")
    {
      this.number = 10;
    }
    if(v == "KING")
    {
      this.number = 10;
    }
};

function Player(n, c)
{
    this.name = n;
    this.chips = c;
    this.bet = 0;
    this.hand = [];
};

//function initializeCards() //initialize 2 deck shute in order
var initializeCards = function()
{
    var allCards = [];
    //document.write("start init");
    //alert("start init");

    allCards.push(new Card("ACE","Diamond",0,"../images/cards/acediamond.PNG"));
    allCards.push(new Card("ACE","Club",1,"../images/cards/aceclub.PNG"));
    allCards.push(new Card("ACE","Heart",2,"../images/cards/aceheart.PNG"));
    allCards.push(new Card("ACE","Spade",3,"../images/cards/acespade.PNG"));
    allCards.push(new Card("ACE","Diamond",4,"../images/cards/acediamond.PNG"));
    allCards.push(new Card("ACE","Club",5,"../images/cards/aceclub.PNG"));
    allCards.push(new Card("ACE","Heart",6,"../images/cards/aceheart.PNG"));
    allCards.push(new Card("ACE","Spade",7,"../images/cards/acespade.PNG"));
    allCards.push(new Card("TWO","Diamond",8,"../images/cards/twodiamond.PNG"));
    allCards.push(new Card("TWO","Club",9,"../images/cards/twoclub.PNG"));
    allCards.push(new Card("TWO","Heart",10,"../images/cards/twoheart.PNG"));
    allCards.push(new Card("TWO","Spade",11,"../images/cards/twospade.PNG"));
    allCards.push(new Card("TWO","Diamond",12,"../images/cards/twodiamond.PNG"));
    allCards.push(new Card("TWO","Club",13,"../images/cards/twoclub.PNG"));
    allCards.push(new Card("TWO","Heart",14,"../images/cards/twoheart.PNG"));
    allCards.push(new Card("TWO","Spade",15,"../images/cards/twospade.PNG"));
    allCards.push(new Card("THREE","Diamond",16,"../images/cards/threediamond.PNG"));
    allCards.push(new Card("THREE","Club",17,"../images/cards/threeclub.PNG"));
    allCards.push(new Card("THREE","Heart",18,"../images/cards/threeheart.PNG"));
    allCards.push(new Card("THREE","Spade",19,"../images/cards/threespade.PNG"));
    allCards.push(new Card("THREE","Diamond",20,"../images/cards/threediamond.PNG"));
    allCards.push(new Card("THREE","Club",21,"../images/cards/threeclub.PNG"));
    allCards.push(new Card("THREE","Heart",22,"../images/cards/threeheart.PNG"));
    allCards.push(new Card("THREE","Spade",23,"../images/cards/threespade.PNG"));
    allCards.push(new Card("FOUR","Diamond",24,"../images/cards/fourdiamond.PNG"));
    allCards.push(new Card("FOUR","Club",25,"../images/cards/fourclub.PNG"));
    allCards.push(new Card("FOUR","Heart",26,"../images/cards/fourheart.PNG"));
    allCards.push(new Card("FOUR","Spade",27,"../images/cards/fourspade.PNG"));
    allCards.push(new Card("FOUR","Diamond",28,"../images/cards/fourdiamond.PNG"));
    allCards.push(new Card("FOUR","Club",29,"../images/cards/fourclub.PNG"));
    allCards.push(new Card("FOUR","Heart",30,"../images/cards/fourheart.PNG"));
    allCards.push(new Card("FOUR","Spade",31,"../images/cards/fourspade.PNG"));
    allCards.push(new Card("FIVE","Diamond",32,"../images/cards/fivediamond.PNG"));
    allCards.push(new Card("FIVE","Club",33,"../images/cards/fiveclub.PNG"));
    allCards.push(new Card("FIVE","Heart",34,"../images/cards/fiveheart.PNG"));
    allCards.push(new Card("FIVE","Spade",35,"../images/cards/fivespade.PNG"));
    allCards.push(new Card("FIVE","Diamond",36,"../images/cards/fivediamond.PNG"));
    allCards.push(new Card("FIVE","Club",37,"../images/cards/fiveclub.PNG"));
    allCards.push(new Card("FIVE","Heart",38,"../images/cards/fiveheart.PNG"));
    allCards.push(new Card("FIVE","Spade",39,"../images/cards/fivespade.PNG"));
    allCards.push(new Card("SIX","Diamond",40,"../images/cards/sixdiamond.PNG"));
    allCards.push(new Card("SIX","Club",41,"../images/cards/sixclub.PNG"));
    allCards.push(new Card("SIX","Heart",42,"../images/cards/sixheart.PNG"));
    allCards.push(new Card("SIX","Spade",43,"../images/cards/sixspade.PNG"));
    allCards.push(new Card("SIX","Diamond",44,"../images/cards/sixdiamond.PNG"));
    allCards.push(new Card("SIX","Club",45,"../images/cards/sixclub.PNG"));
    allCards.push(new Card("SIX","Heart",46,"../images/cards/sixheart.PNG"));
    allCards.push(new Card("SIX","Spade",47,"../images/cards/sixspade.PNG"));
    allCards.push(new Card("SEVEN","Diamond",48,"../images/cards/sevendiamond.PNG"));
    allCards.push(new Card("SEVEN","Club",49,"../images/cards/sevenclub.PNG"));
    allCards.push(new Card("SEVEN","Heart",50,"../images/cards/sevenheart.PNG"));
    allCards.push(new Card("SEVEN","Spade",51,"../images/cards/sevenspade.PNG"));
    allCards.push(new Card("SEVEN","Diamond",52,"../images/cards/sevendiamond.PNG"));
    allCards.push(new Card("SEVEN","Club",53,"../images/cards/sevenclub.PNG"));
    allCards.push(new Card("SEVEN","Heart",54,"../images/cards/sevenheart.PNG"));
    allCards.push(new Card("SEVEN","Spade",55,"../images/cards/sevenspade.PNG"));
    allCards.push(new Card("EIGHT","Diamond",56,"../images/cards/eightdiamond.PNG"));
    allCards.push(new Card("EIGHT","Club",57,"../images/cards/eightclub.PNG"));
    allCards.push(new Card("EIGHT","Heart",58,"../images/cards/eightheart.PNG"));
    allCards.push(new Card("EIGHT","Spade",59,"../images/cards/eightspade.PNG"));
    allCards.push(new Card("EIGHT","Diamond",60,"../images/cards/eightdiamond.PNG"));
    allCards.push(new Card("EIGHT","Club",61,"../images/cards/eightclub.PNG"));
    allCards.push(new Card("EIGHT","Heart",62,"../images/cards/eightheart.PNG"));
    allCards.push(new Card("EIGHT","Spade",63,"../images/cards/eightspade.PNG"));
    allCards.push(new Card("NINE","Diamond",64,"../images/cards/ninediamond.PNG"));
    allCards.push(new Card("NINE","Club",65,"../images/cards/nineclub.PNG"));
    allCards.push(new Card("NINE","Heart",66,"../images/cards/nineheart.PNG"));
    allCards.push(new Card("NINE","Spade",67,"../images/cards/ninespade.PNG"));
    allCards.push(new Card("NINE","Diamond",68,"../images/cards/ninediamond.PNG"));
    allCards.push(new Card("NINE","Club",69,"../images/cards/nineclub.PNG"));
    allCards.push(new Card("NINE","Heart",70,"../images/cards/nineheart.PNG"));
    allCards.push(new Card("NINE","Spade",71,"../images/cards/ninespade.PNG"));
    allCards.push(new Card("TEN","Diamond",72,"../images/cards/tendiamond.PNG"));
    allCards.push(new Card("TEN","Club",73,"../images/cards/tenclub.PNG"));
    allCards.push(new Card("TEN","Heart",74,"../images/cards/tenheart.PNG"));
    allCards.push(new Card("TEN","Spade",75,"../images/cards/tenspade.PNG"));
    allCards.push(new Card("TEN","Diamond",76,"../images/cards/tendiamond.PNG"));
    allCards.push(new Card("TEN","Club",77,"../images/cards/tenclub.PNG"));
    allCards.push(new Card("TEN","Heart",78,"../images/cards/tenheart.PNG"));
    allCards.push(new Card("TEN","Spade",79,"../images/cards/tenspade.PNG"));
    allCards.push(new Card("JACK","Diamond",80,"../images/cards/jackdiamond.PNG"));
    allCards.push(new Card("JACK","Club",81,"../images/cards/jackclub.PNG"));
    allCards.push(new Card("JACK","Heart",82,"../images/cards/jackheart.PNG"));
    allCards.push(new Card("JACK","Spade",83,"../images/cards/jackspade.PNG"));
    allCards.push(new Card("JACK","Diamond",84,"../images/cards/jackdiamond.PNG"));
    allCards.push(new Card("JACK","Club",85,"../images/cards/jackclub.PNG"));
    allCards.push(new Card("JACK","Heart",86,"../images/cards/jackheart.PNG"));
    allCards.push(new Card("JACK","Spade",87,"../images/cards/jackspade.PNG"));
    allCards.push(new Card("QUEEN","Diamond",88,"../images/cards/queendiamond.PNG"));
    allCards.push(new Card("QUEEN","Club",89,"../images/cards/queenclub.PNG"));
    allCards.push(new Card("QUEEN","Heart",90,"../images/cards/queenheart.PNG"));
    allCards.push(new Card("QUEEN","Spade",91,"../images/cards/queenspade.PNG"));
    allCards.push(new Card("QUEEN","Diamond",92,"../images/cards/queendiamond.PNG"));
    allCards.push(new Card("QUEEN","Club",93,"../images/cards/queenclub.PNG"));
    allCards.push(new Card("QUEEN","Heart",94,"../images/cards/queenheart.PNG"));
    allCards.push(new Card("QUEEN","Spade",95,"../images/cards/queenspade.PNG"));
    allCards.push(new Card("KING","Diamond",96,"../images/cards/kingdiamond.PNG"));
    allCards.push(new Card("KING","Club",97,"../images/cards/kingclub.PNG"));
    allCards.push(new Card("KING","Heart",98,"../images/cards/kingheart.PNG"));
    allCards.push(new Card("KING","Spade",99,"../images/cards/kingspade.PNG"));
    allCards.push(new Card("KING","Diamond",100,"../images/cards/kingdiamond.PNG"));
    allCards.push(new Card("KING","Club",101,"../images/cards/kingclub.PNG"));
    allCards.push(new Card("KING","Heart",102,"../images/cards/kingheart.PNG"));
    allCards.push(new Card("KING","Spade",103,"../images/cards/kingspade.PNG"));

    //document.write(allCards[1].title);
    return allCards;
};

function setup()
{
    //hide all in game buttons
    appData.pBet.value = "";
    appData.pBet.style.visibility = "hidden";
    appData.hitButton.style.visibility = "hidden";
    document.getElementById('end').style.visibility = "hidden";
    appData.stayButton.style.visibility = "hidden";
    appData.doubleButton.style.visibility = "hidden";
    appData.roundButton.style.visibility = "hidden";
    document.getElementById('writebet').style.visibility = "hidden";
    //appData.playerName.value = "";
}

var placeBet = function()
{
    appData.pBet.style.visibility = "visible";
    document.getElementById('writebet').style.visibility = "visible";
};

var writeBet = function()
{
    //alert("writebet");
    var userInput = parseInt(appData.pBet.value);
    var ml = parseInt(appData.money.value)
    if(userInput >= ml)
    {
        alert("All In");
        userInput = ml;
        //document.getElementById('currbet').innerHTML = "Your bet: " + ml;
        appData.pBet.value = ml;
    }
    document.getElementById('currbet').innerHTML = "Your bet: " + appData.pBet.value;
    appData.canPlayTurn = true;
    turn();
}

function test()
{
    document.write("test");
}

function startGame()
{
    //check for valid int
    var userInput = parseInt(appData.money.value);
    var okay = false;
    while(!okay && userInput != -1){
        if(userInput <= account_balance && userInput != -1)
        {
            okay = true;
        }
        else{
            alert("Not enough money in account");
            userInput = -1;
        }
    }

    if(okay)
    {
        appData.gameRunning = true;
        account_balance -= userInput;

        document.getElementById('end').style.visibility = "visible";
        //chage play button to quit button
        appData.startButton.style.visibility = "hidden";
        //appData.startButton.setAttribute('onclick', 'endGame()');

        //hide player name and buyin inputs
        appData.money.style.visibility = "hidden";
        //appData.playerName.style.visibility = "hidden";

        //display balance

        var userInput = parseInt(appData.pBet.value);
        if(userInput > account_balance)
        {

        }
        var ml = appData.money.value;
        document.getElementById('moneyLeft').innerHTML = "Money left: " + ml;

        //add player
        addPlayer();
        //add dealer
        addDealer();

        appData.allCards = initializeCards(); //initialize all cards in order
        appData.deck = shuffle(); //create shuffled deck

        runRound();
    }
}

function endGame()
{
    console.log(typeof account_balance);
    console.log(typeof appData.money.value);
    console.log(typeof games_won);
    console.log(typeof games_lost);
    alert("game over");
    appData.gameRunning = false;
    appData.pBet.value = "";
    //appData.playerName.style.visibility = "visible";
    account_balance = parseInt(account_balance) + parseInt(appData.money.value);
    document.getElementById('moneytotal').value = account_balance;
    document.getElementById('wins').value = parseInt(games_won);
    document.getElementById('losses').value = parseInt(games_lost);


    appData.money.style.visibility = "visible";
    appData.pBet.style.visibility = "hidden";
    appData.hitButton.style.visibility = "hidden";
    appData.stayButton.style.visibility = "hidden";
    appData.doubleButton.style.visibility = "hidden";
    appData.roundButton.style.visibility = "hidden";
    document.getElementById('writebet').style.visibility = "hidden";
    appData.money.value = "";
    document.getElementById('moneyLeft').innerHTML = "Money left: ";
    appData.startButton.innerHTML = "Play";
    appData.startButton.setAttribute('onclick', 'startGame()');
    document.getElementById('dtotal').innerHTML = "Dealer Hand Total: ?";
    document.getElementById('ptotal').innerHTML = "Your Hand Total: 0";
    document.getElementById('currbet').innerHTML = "Your bet: ";
    //document.getElementById('cardsLeft').innerHTML = "Cards left: ";
    clearCards();
    setup();
    document.getElementById('cardsLeft').innerHTML = "Cards left: ";
    appData.players.pop();
    appData.players.pop();

}


var shuffle = function()
{
    //alert("shuffle");
    temp = [];
    //alert("temp[0].title");
    //if(temp[0])
    for(var i = 0; i < appData.allCards.length; i++)
    {
        //remove all cards from deck
        appData.allCards[i].inDeck = false;
    }

    for(var j = 0; j < 104; j++) //add 2 decks / 104 cards
    {
      var n = Math.floor(Math.random() * 104); //randomize number between 0 and 103
      while(appData.allCards[n].inDeck == true) //rendomize new number until new card can be added to deck
      {
        n = Math.floor(Math.random() * 104);
      }
      //when new card can be added
      appData.allCards[n].inDeck = true; //now in deck
      temp.push(appData.allCards[n]);
    }

    return temp;
};


var deckPrinter = function (deck) {
    //alert("suh");
    document.write(deck.length);
    for (var i = 0; i < deck.length; i++)
    {
        //console.log(deck[i].name);
        document.write(deck[i].title + " , ");
    }
    return
}

var addPlayer = function()
{
    myPlayer = new Player("Player", 100); //default settings
    appData.players.push(myPlayer);
};

var addDealer = function()
{
    dealer = new Player("Dealer",0);
    appData.players.push(dealer);
};

var dealCards = function()
{
    //document.write("dealing cards");
    for(var i = 0; i < 2; i++)
    {
        for(var j = 0; j < appData.players.length; j++)
        {
            appData.players[j].hand[i] = appData.deck.pop();
            // document.write((appData.players[j].hand[i]).title);
            // document.write((appData.players[j].hand[i]).suit);
            // document.write((appData.players[j].hand[i]).imgname);
        }
    }
    showHands(false);
};

var getCardSum = function(player)
{
    var h = player.hand;

    var count = 0;
    var hasAce = false;
    for(var i = 0; i < h.length; i++) //check for an ace
    {
      if(h[i].title == "ACE")
      {
        hasAce = true;
      }
    }

    if(hasAce == false)
    {

      for(var x = 0; x < h.length; x++)
      {
        count += h[x].number;
      }
    }
    else
    {
      //has an ace
      for(var y = 0; y < h.length; y++)
      {
        if(h[y].title != "ACE")
        {
          //cout<<"value of non ace cards: "<<hand[y].getNumber()<<endl;
          count += h[y].number;
          //cout<<"count before aces = "<<count<<endl;
        }
      }
      for(var z = 0; z < h.length; z++)
      {
        if(h[z].title == "ACE")
        {
          if(count + 11 <= 21)
          {
            //cout<<"count ace as 11"<<endl;
            count+=11;
          }
          else
          {
            //cout<<"pushed over, change ace to a 1"<<endl;
            count += 1;
          }
        }
        //cout<<"count after aces = "<<count<<endl;
      }

    }
    return count;


}

var showHands = function(showDealer)
{
    a = document.getElementById('pcard1');
    a.setAttribute("src", (appData.players[0].hand[0]).imgname);
    b = document.getElementById('pcard2');
    b.setAttribute("src", (appData.players[0].hand[1]).imgname);
    c = document.getElementById('dcard1');
    c.setAttribute("src", (appData.players[1].hand[0]).imgname);
    d = document.getElementById('dcard2');
    if(showDealer == true)
    {
        d.setAttribute("src", (appData.players[1].hand[1]).imgname);
    }
    else{
        d.setAttribute("src", "../images/cards/cardback.PNG");
    }
};

function hit()
{
    alert("hit");

    //appData.doubleButton.disabled = true;
    document.getElementById('doubledown').disabled = true;
    //appData.doubleButton.style.visibility = "hidden";

    appData.players[0].hand.push(appData.deck.pop()); //add next card to hand
    document.getElementById('playerHand').innerHTML += "&nbsp;";

    var img = document.createElement("img");

    img.src = (appData.players[0].hand[appData.players[0].hand.length-1]).imgname;
    img.width = "50";
    img.height = "80";
    var src = document.getElementById("playerHand");

    src.appendChild(img);

    //update total
    var sum = getCardSum(appData.players[0]);
    document.getElementById('ptotal').innerHTML = "Your Hand Total: " + sum;


    //check for bust
    if(sum > 21)
    {
        alert("busted");
        appData.hitButton.style.visibility = "hidden";
        appData.stayButton.style.visibility = "hidden";
        appData.doubleButton.style.visibility = "hidden";
        // lose();
        //stay();
        payOut();
    }

}

function dealerHit()
{
    appData.players[1].hand.push(appData.deck.pop()); //add next card to hand
    document.getElementById('dealerHand').innerHTML += "&nbsp;";

    var img = document.createElement("img");

    img.src = (appData.players[1].hand[appData.players[1].hand.length-1]).imgname;
    img.width = "50";
    img.height = "80";
    img.id = "hitcard";
    var src = document.getElementById("dealerHand");

    src.appendChild(img);

    //update total
    var sum = getCardSum(appData.players[1]);
    document.getElementById('dtotal').innerHTML = "Dealer Hand Total: " + sum;

    //check for bust
    // if(sum > 21)
    // {
    //     if(getCardSum(appData.players[0]) <= 21)
    //     {
    //         win(); //player wins
    //     }
    // }
}

function dealerStay()
{
    //end round
    //alert("round end");
    appData. roundRunning = false;
}

function stay()
{
    //alert("stay");
    dealerTurn();
    appData.hitButton.style.visibility = "hidden";
    appData.stayButton.style.visibility = "hidden";
    appData.doubleButton.style.visibility = "hidden";
}

function doubleDown()
{
    appData.pBet.value = 2 * parseInt(appData.pBet.value);
    document.getElementById('currbet').innerHTML = "Your bet: " + appData.pBet.value;
    hit();
    if(getCardSum(appData.players[0]) <= 21) {
        stay();
    }
}

var displayPlayerHand = function()
{
    //alert("hi");
    //var myHand = appData.players[0].hand;
    //appData.players[0].hand[0].imgname = "./acespade.PNG";
    //appData.players[0].hand[1].imgname = "./threeclub.PNG";
    //document.write(appData.players[0].hand[0].imgname);
    //alert("check");

    // var x = document.createElement("IMG");
    //   x.setAttribute("src", "./uparrow.svg");
    //   x.setAttribute("width", "304");
    //   x.setAttribute("height", "228");
    //   x.setAttribute("alt", "The Pulpit Rock");
    //   document.body.appendChild(x);

    a = document.getElementById('pcard1');
    a.setAttribute("src", (appData.players[0].hand[0]).imgname);
    b = document.getElementById('pcard2');
    b.setAttribute("src", (appData.players[0].hand[1]).imgname);
    // a = document.getElementById('pcard1');
    // a.setAttribute("src", "./cardback.PNG");
    // b = document.getElementById('pcard2');
    // b.setAttribute("src", "./cardback.PNG");
};


function turn()
{
    dealCards();
    var sum = getCardSum(appData.players[0]);
    document.getElementById('ptotal').innerHTML = "Your Hand Total: " + sum;
    appData.pBet.style.visibility = "hidden";
    appData.hitButton.style.visibility = "visible";
    appData.stayButton.style.visibility = "visible";
    appData.doubleButton.style.visibility = "visible";
    document.getElementById('doubledown').disabled = false;
    document.getElementById('writebet').style.visibility = "hidden";
    alert("player turn");

    if(sum == 21)
    {
        //blackjack
        alert("black jack!");
        payOut();
    }
    // appData.hitButton.onclick = hit();
    // appData.stayButton.onclick = stay();
}

function dealerTurn()
{
    alert("dealer turn");
    showHands(true);
    var dt = getCardSum(appData.players[appData.players.length-1]); //dealer total
    document.getElementById('dtotal').innerHTML = "Dealer Hand Total: " + dt;

    while(dt <= 16)
    {
        dealerHit();
        var dt = getCardSum(appData.players[appData.players.length-1]); //dealer total
    }
    dealerStay();

    payOut();
}

function lose()
{
    alert("you lost");
    games_lost++;
    var b = parseInt(appData.pBet.value);
    var ml = parseInt(appData.money.value);
    var newAmount = ml - b;
    appData.money.value = ml - b;
    document.getElementById('moneyLeft').innerHTML = "Money left: " + appData.money.value;
    appData.pBet.value = "";
    document.getElementById('currbet').innerHTML = "Your bet: ";
    clearCards();
}

function win()
{
    alert("you won");
    games_won++;
    var b = parseInt(appData.pBet.value);
    var ml = parseInt(appData.money.value);
    var newAmount = ml + b;
    appData.money.value = ml + b;
    document.getElementById('moneyLeft').innerHTML = "Money left: " + appData.money.value;
    appData.pBet.value = "";
    document.getElementById('currbet').innerHTML = "Your bet: ";
    clearCards();
}

function blackJack()
{
    //alert("you won");
    var b = parseInt(appData.pBet.value);
    var ml = parseInt(appData.money.value);
    var newAmount = ml + b;
    appData.money.value = ml + (2 * b);
    document.getElementById('moneyLeft').innerHTML = "Money left: " + appData.money.value;
    appData.pBet.value = "";
    document.getElementById('currbet').innerHTML = "Your bet: ";
    clearCards();
}

function draw()
{
    appData.pBet.value = "";
    document.getElementById('currbet').innerHTML = "Your bet: ";
    clearCards();
}

//
// var runGame = function()
// {
//     appData.running = true;
//     while(appData.players.length > 1) //while there is at least one player and the dealer in the game
//     {
//       //run a round
//       runRound();
//     }
//
//   }
// };
//

function payOut()
{
    var dt = getCardSum(appData.players[appData.players.length-1]);
    var pt = getCardSum(appData.players[0]);

    if(pt > 21)
    {
        lose();
    }
    else if(pt == 21 && (appData.players[0].hand.length == 2))
    {
        //blackjack
        blackJack();
    }
    else if(pt <= 21 && dt <= 21)
    {
        if(pt > dt)
        {
            win();
        }
        else if(dt > pt)
        {
            lose();
        }
        else{
            alert("draw");
            draw();
        }
    }
    else if(dt > 21 && pt <= 21)
    {
        win();
    }
}

function clearCards()
{
    //alert("clearing cards");
    //remove all cards from hands
    for(var i = 0; i < appData.players.length; i++)
    {
        var l = appData.players[i].hand.length;
        for(var j = 0; j < l; j++)
        {
            appData.players[i].hand.pop();
        }
    }

    //clear cards from table
    document.getElementById('dealerHand').innerHTML = '<img id="dcard1" width="50" height="80" src="../images/cards/emptycardslot.PNG">&nbsp;<img id="dcard2" width="50" height="80" src="../images/cards/emptycardslot.PNG">';
    document.getElementById('playerHand').innerHTML = '<img id="pcard1" width="50" height="80" src="../images/cards/emptycardslot.PNG">&nbsp;<img id="pcard2" width="50" height="80" src="../images/cards/emptycardslot.PNG">';

    document.getElementById('ptotal').innerHTML = "Your Hand Total: 0";
    document.getElementById('dtotal').innerHTML = "Dealer Hand Total: ?";
    //alert("cards cleared");
    checkBankrupt();
}

function checkBankrupt()
{
    //check if player is out of money
    var ml = parseInt(appData.money.value);
    if(ml <= 0)
    {
        //game ends
        alert("bankrupt");
        endGame();
    }
    else {
        //appData.roundButton.style.visibility = "visible";
        document.getElementById('cardsLeft').innerHTML = "Cards left: " + appData.deck.length;
        runRound();
    }

    appData.roundRunning = false;

}

function runRound()
{
    //run round
    appData.roundRunning = true;
    appData.roundButton.style.visibility = "hidden";

    //check if reshuffle is needed
    document.getElementById('cardsLeft').innerHTML = "Cards left: " + appData.deck.length;
    if(appData.deck.length <= 6*appData.players.length)
    {
      alert("reshuffle");
      appData.deck = shuffle();
    }

    //players bet
    for(var i = 0; i < appData.players.length-1; i++)
    {
        //alert("bet");
        placeBet();
    }
    return;
    //callback();

    //deal cards
    //dealCards();

    //each player takes turn

    //payout stage


    //remove cards and bets

    //check for bankrupcy
};
