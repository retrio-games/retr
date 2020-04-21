var appData = {};

appData.startButton = document.getElementById('start');
appData.hitButton = document.getElementById('hit');
appData.stayButton = document.getElementById('stay');
appData.doubleButton = document.getElementById('ddbutton');
appData.roundButton = document.getElementById('runround');
appData.playerName = document.getElementById('pname');
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

    allCards.push(new Card("ACE","Diamond",0,"../resources/images/cards/acediamond.PNG"));
    allCards.push(new Card("ACE","Club",1,"../resources/images/cards/aceclub.PNG"));
    allCards.push(new Card("ACE","Heart",2,"../resources/images/cards/aceheart.PNG"));
    allCards.push(new Card("ACE","Spade",3,"../resources/images/cards/acespade.PNG"));
    allCards.push(new Card("ACE","Diamond",4,"../resources/images/cards/acediamond.PNG"));
    allCards.push(new Card("ACE","Club",5,"../resources/images/cards/aceclub.PNG"));
    allCards.push(new Card("ACE","Heart",6,"../resources/images/cards/aceheart.PNG"));
    allCards.push(new Card("ACE","Spade",7,"../resources/images/cards/acespade.PNG"));
    allCards.push(new Card("TWO","Diamond",8,"../resources/images/cards/twodiamond.PNG"));
    allCards.push(new Card("TWO","Club",9,"../resources/images/cards/twoclub.PNG"));
    allCards.push(new Card("TWO","Heart",10,"../resources/images/cards/twoheart.PNG"));
    allCards.push(new Card("TWO","Spade",11,"../resources/images/cards/twospade.PNG"));
    allCards.push(new Card("TWO","Diamond",12,"../resources/images/cards/twodiamond.PNG"));
    allCards.push(new Card("TWO","Club",13,"../resources/images/cards/twoclub.PNG"));
    allCards.push(new Card("TWO","Heart",14,"../resources/images/cards/twoheart.PNG"));
    allCards.push(new Card("TWO","Spade",15,"../resources/images/cards/twospade.PNG"));
    allCards.push(new Card("THREE","Diamond",16,"../resources/images/cards/threediamond.PNG"));
    allCards.push(new Card("THREE","Club",17,"../resources/images/cards/threeclub.PNG"));
    allCards.push(new Card("THREE","Heart",18,"../resources/images/cards/threeheart.PNG"));
    allCards.push(new Card("THREE","Spade",19,"../resources/images/cards/threespade.PNG"));
    allCards.push(new Card("THREE","Diamond",20,"../resources/images/cards/threediamond.PNG"));
    allCards.push(new Card("THREE","Club",21,"../resources/images/cards/threeclub.PNG"));
    allCards.push(new Card("THREE","Heart",22,"../resources/images/cards/threeheart.PNG"));
    allCards.push(new Card("THREE","Spade",23,"../resources/images/cards/threespade.PNG"));
    allCards.push(new Card("FOUR","Diamond",24,"../resources/images/cards/fourdiamond.PNG"));
    allCards.push(new Card("FOUR","Club",25,"../resources/images/cards/fourclub.PNG"));
    allCards.push(new Card("FOUR","Heart",26,"../resources/images/cards/fourheart.PNG"));
    allCards.push(new Card("FOUR","Spade",27,"../resources/images/cards/fourspade.PNG"));
    allCards.push(new Card("FOUR","Diamond",28,"../resources/images/cards/fourdiamond.PNG"));
    allCards.push(new Card("FOUR","Club",29,"../resources/images/cards/fourclub.PNG"));
    allCards.push(new Card("FOUR","Heart",30,"../resources/images/cards/fourheart.PNG"));
    allCards.push(new Card("FOUR","Spade",31,"../resources/images/cards/fourspade.PNG"));
    allCards.push(new Card("FIVE","Diamond",32,"../resources/images/cards/fivediamond.PNG"));
    allCards.push(new Card("FIVE","Club",33,"../resources/images/cards/fiveclub.PNG"));
    allCards.push(new Card("FIVE","Heart",34,"../resources/images/cards/fiveheart.PNG"));
    allCards.push(new Card("FIVE","Spade",35,"../resources/images/cards/fivespade.PNG"));
    allCards.push(new Card("FIVE","Diamond",36,"../resources/images/cards/fivediamond.PNG"));
    allCards.push(new Card("FIVE","Club",37,"../resources/images/cards/fiveclub.PNG"));
    allCards.push(new Card("FIVE","Heart",38,"../resources/images/cards/fiveheart.PNG"));
    allCards.push(new Card("FIVE","Spade",39,"../resources/images/cards/fivespade.PNG"));
    allCards.push(new Card("SIX","Diamond",40,"../resources/images/cards/sixdiamond.PNG"));
    allCards.push(new Card("SIX","Club",41,"../resources/images/cards/sixclub.PNG"));
    allCards.push(new Card("SIX","Heart",42,"../resources/images/cards/sixheart.PNG"));
    allCards.push(new Card("SIX","Spade",43,"../resources/images/cards/sixspade.PNG"));
    allCards.push(new Card("SIX","Diamond",44,"../resources/images/cards/sixdiamond.PNG"));
    allCards.push(new Card("SIX","Club",45,"../resources/images/cards/sixclub.PNG"));
    allCards.push(new Card("SIX","Heart",46,"../resources/images/cards/sixheart.PNG"));
    allCards.push(new Card("SIX","Spade",47,"../resources/images/cards/sixspade.PNG"));
    allCards.push(new Card("SEVEN","Diamond",48,"../resources/images/cards/sevendiamond.PNG"));
    allCards.push(new Card("SEVEN","Club",49,"../resources/images/cards/sevenclub.PNG"));
    allCards.push(new Card("SEVEN","Heart",50,"../resources/images/cards/sevenheart.PNG"));
    allCards.push(new Card("SEVEN","Spade",51,"../resources/images/cards/sevenspade.PNG"));
    allCards.push(new Card("SEVEN","Diamond",52,"../resources/images/cards/sevendiamond.PNG"));
    allCards.push(new Card("SEVEN","Club",53,"../resources/images/cards/sevenclub.PNG"));
    allCards.push(new Card("SEVEN","Heart",54,"../resources/images/cards/sevenheart.PNG"));
    allCards.push(new Card("SEVEN","Spade",55,"../resources/images/cards/sevenspade.PNG"));
    allCards.push(new Card("EIGHT","Diamond",56,"../resources/images/cards/eightdiamond.PNG"));
    allCards.push(new Card("EIGHT","Club",57,"../resources/images/cards/eightclub.PNG"));
    allCards.push(new Card("EIGHT","Heart",58,"../resources/images/cards/eightheart.PNG"));
    allCards.push(new Card("EIGHT","Spade",59,"../resources/images/cards/eightspade.PNG"));
    allCards.push(new Card("EIGHT","Diamond",60,"../resources/images/cards/eightdiamond.PNG"));
    allCards.push(new Card("EIGHT","Club",61,"../resources/images/cards/eightclub.PNG"));
    allCards.push(new Card("EIGHT","Heart",62,"../resources/images/cards/eightheart.PNG"));
    allCards.push(new Card("EIGHT","Spade",63,"../resources/images/cards/eightspade.PNG"));
    allCards.push(new Card("NINE","Diamond",64,"../resources/images/cards/ninediamond.PNG"));
    allCards.push(new Card("NINE","Club",65,"../resources/images/cards/nineclub.PNG"));
    allCards.push(new Card("NINE","Heart",66,"../resources/images/cards/nineheart.PNG"));
    allCards.push(new Card("NINE","Spade",67,"../resources/images/cards/ninespade.PNG"));
    allCards.push(new Card("NINE","Diamond",68,"../resources/images/cards/ninediamond.PNG"));
    allCards.push(new Card("NINE","Club",69,"../resources/images/cards/nineclub.PNG"));
    allCards.push(new Card("NINE","Heart",70,"../resources/images/cards/nineheart.PNG"));
    allCards.push(new Card("NINE","Spade",71,"../resources/images/cards/ninespade.PNG"));
    allCards.push(new Card("TEN","Diamond",72,"../resources/images/cards/tendiamond.PNG"));
    allCards.push(new Card("TEN","Club",73,"../resources/images/cards/tenclub.PNG"));
    allCards.push(new Card("TEN","Heart",74,"../resources/images/cards/tenheart.PNG"));
    allCards.push(new Card("TEN","Spade",75,"../resources/images/cards/tenspade.PNG"));
    allCards.push(new Card("TEN","Diamond",76,"../resources/images/cards/tendiamond.PNG"));
    allCards.push(new Card("TEN","Club",77,"../resources/images/cards/tenclub.PNG"));
    allCards.push(new Card("TEN","Heart",78,"../resources/images/cards/tenheart.PNG"));
    allCards.push(new Card("TEN","Spade",79,"../resources/images/cards/tenspade.PNG"));
    allCards.push(new Card("JACK","Diamond",80,"../resources/images/cards/jackdiamond.PNG"));
    allCards.push(new Card("JACK","Club",81,"../resources/images/cards/jackclub.PNG"));
    allCards.push(new Card("JACK","Heart",82,"../resources/images/cards/jackheart.PNG"));
    allCards.push(new Card("JACK","Spade",83,"../resources/images/cards/jackspade.PNG"));
    allCards.push(new Card("JACK","Diamond",84,"../resources/images/cards/jackdiamond.PNG"));
    allCards.push(new Card("JACK","Club",85,"../resources/images/cards/jackclub.PNG"));
    allCards.push(new Card("JACK","Heart",86,"../resources/images/cards/jackheart.PNG"));
    allCards.push(new Card("JACK","Spade",87,"../resources/images/cards/jackspade.PNG"));
    allCards.push(new Card("QUEEN","Diamond",88,"../resources/images/cards/queendiamond.PNG"));
    allCards.push(new Card("QUEEN","Club",89,"../resources/images/cards/queenclub.PNG"));
    allCards.push(new Card("QUEEN","Heart",90,"../resources/images/cards/queenheart.PNG"));
    allCards.push(new Card("QUEEN","Spade",91,"../resources/images/cards/queenspade.PNG"));
    allCards.push(new Card("QUEEN","Diamond",92,"../resources/images/cards/queendiamond.PNG"));
    allCards.push(new Card("QUEEN","Club",93,"../resources/images/cards/queenclub.PNG"));
    allCards.push(new Card("QUEEN","Heart",94,"../resources/images/cards/queenheart.PNG"));
    allCards.push(new Card("QUEEN","Spade",95,"../resources/images/cards/queenspade.PNG"));
    allCards.push(new Card("KING","Diamond",96,"../resources/images/cards/kingdiamond.PNG"));
    allCards.push(new Card("KING","Club",97,"../resources/images/cards/kingclub.PNG"));
    allCards.push(new Card("KING","Heart",98,"../resources/images/cards/kingheart.PNG"));
    allCards.push(new Card("KING","Spade",99,"../resources/images/cards/kingspade.PNG"));
    allCards.push(new Card("KING","Diamond",100,"../resources/images/cards/kingdiamond.PNG"));
    allCards.push(new Card("KING","Club",101,"../resources/images/cards/kingclub.PNG"));
    allCards.push(new Card("KING","Heart",102,"../resources/images/cards/kingheart.PNG"));
    allCards.push(new Card("KING","Spade",103,"../resources/images/cards/kingspade.PNG"));

    //document.write(allCards[1].title);
    return allCards;
};

function setup()
{
    //hide all in game buttons
    appData.pBet.value = "";
    appData.pBet.style.visibility = "hidden";
    appData.hitButton.style.visibility = "hidden";
    appData.stayButton.style.visibility = "hidden";
    appData.doubleButton.style.visibility = "hidden";
    appData.roundButton.style.visibility = "hidden";
    document.getElementById('writebet').style.visibility = "hidden";
    appData.playerName.value = "";
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
    //alert("start game");

    appData.gameRunning = true;

    //chage play button to quit button
    appData.startButton.innerHTML = "Quit Game";
    appData.startButton.setAttribute('onclick', 'endGame()');

    //hide player name and buyin inputs
    appData.money.style.visibility = "hidden";
    appData.playerName.style.visibility = "hidden";

    //display balance
    var ml = appData.money.value;
    document.getElementById('moneyLeft').innerHTML = "Money left: " + ml;

    //add player
    addPlayer();
    //add dealer
    addDealer();

    // for(var i = 0; i < appData.players.length; i++)
    // {
    //     document.write(appData.players[i].name + ", ");
    // }

    appData.allCards = initializeCards(); //initialize all cards in order
    appData.deck = shuffle(); //create shuffled deck
    //document.getElementById('cardsLeft').innerHTML = "Cards left: " + appData.deck.length;

    //placeBet();
    // while(appData.gameRunning == true)
    // {
    //     if(appData.roundRunning == false){
    //         runRound();
    //     }
    // }
    //$.when(runRound()).then(runRound());
    runRound();
    //appData.roundButton.style.visibility = "visible";
    // if(appData.roundRunning == false)
    // {
    //     alert("run round");
    //     runRound();
    // }
    //alert("run again");
    //runRound();

    // if(appData.canPlayTurn == true){
    //     dealCards();
    //     appData.pBet.style.visibility = "hidden";
    //     appData.hitButton.style.visibility = "visible";
    //     appData.stayButton.style.visibility = "visible";
    //     document.getElementById('writebet').style.visibility = "hidden";
    //     appData.hitButton.onclick = hit();
    //     appData.stayButton.onclick = stay();
    // }
    //document.getElementById('writebet').onclick = turn();

    //displayPlayerHand();
    //deckPrinter(appData.deck);
    //runGame();
}

function endGame()
{
    alert("game over");
    appData.gameRunning = false;
    appData.pBet.value = "";
    appData.playerName.style.visibility = "visible";
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
        d.setAttribute("src", "../resources/images/cards/cardback.PNG");
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
    document.getElementById('dealerHand').innerHTML = '<img id="dcard1" width="50" height="80" src="../resources/images/cards/emptycardslot.PNG">&nbsp;<img id="dcard2" width="50" height="80" src="../resources/images/cards/emptycardslot.PNG">';
    document.getElementById('playerHand').innerHTML = '<img id="pcard1" width="50" height="80" src="../resources/images/cards/emptycardslot.PNG">&nbsp;<img id="pcard2" width="50" height="80" src="../resources/images/cards/emptycardslot.PNG">';

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
