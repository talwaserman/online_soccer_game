/* ------- VARIABLES --------*/
var Goalkeepers=["David Watson","Neil Sullivan","Steve Ogrizovic","Kevin Pressman","Bryan Gunn","Mark Crossley","Kevin Poole","John Sheffield","Keith Branagan","Vince Bartram","Bobby Mimms","Espen Bardsen","Gary Plumley","Bob Boulder","John Filan","Alan Fettis","Frode Grodas","Mark Gayle","Sieb Dijkstra","Mike Pollitt","Eddie Niedzwiecki","Jan Stejskal","Ian Andrews","Paul Musselwhite","Maarten Stekelenburg"];
var Defenders=["Arjan de Zeeuw","Warren Barton","Paul Beesley","Gianluca Festa","Carl Bradshaw","Roland Nilsson","Colin Cooper","Ian Woan","Steve Redmond","Craig Fleming","Mark Kennedy","Paul Bodin","Des Walker","Luc Nijholt ","Mel Sterland","Timothee Atouba","Eric Edman","Mike Whitlow","Kent Nielsen","Pal Lydersen","Darren Wassall","Paul Telfer", "Steve Sedgley","Alfie Haland","Clive Wilson","Gudni Bergsson","Jeff Kenna","Lee Sinnott","Stuart Nethercott","Earl Barrett","Frank Yallop", "Mal Donaghy","Steve Chettle","Greg Downs","Steve Potts","Derek Brazil","Neil Pointon","Phil King","Reuben Agboola","Gus Uhlenbeek","Daryl Sutch","Gunnar Halle","Micky Droy","Marc Hottiger","Colin Hendry","Peter Jackson","Richard Shaw","Johnny Metgod","Trevor Cherry","David Bardsley","Peter Haddock","Glenn Pennyfeather","Roger Joseph","Ian Cox","Nick Tanner","Lee Naylor","Kevin Scott","Alan Kernaghan","Steve Morrow","Dean Spink ","Tony Dorigo","Chris Riggott","Stefan Schnoor","Steve Vickers","Richard Naylor","David Brightwell", "Gus Caeser","David Linagan","Ian Brightwell","Neil Cox","Richard Edghill", "Richard Ord","Vince Overson","Richard Jobson","John Polston","Andy Duncan","Ian Butterworth","Jason Dodd","Peter Billing","Mitchell Thomas","Colin Pates","Brian Burrows","Pat Van Den Hauwe","Steve Sims","Tim Breacker","Peter Shirtliff","Rob Hindmarsh","Ian Brightwell","Trevor Peake","Danny Granville", "Graham Rodger","Jamie Clapham","Ian Pearce","Lloyd Dooley","Des Linton","Andy Hinchcliffe", "Gary Charles","Eric Young","Ronnie Wallwork","Chris Perry","Jody Craddock ","John Scales","Adi Moses","Nicky Eaden","Andy Hinchcliffe","Chris Bart-Williams","John O'Shea"];
var Midfielders=["Neil Redfearn","Eric Tinkler","Oyvind Leonhardsen","Darren Sheridan","Martin Bullock","Nick Henry","Darren Barnard","Carlton Palmer","Neil Adams","Mark Pembridge","Scott Gemmill","Robbie Earle","Peter Atherton","Gary Crosby","Dale Gordon","Teemu Tainio","Darren Barnard","Gary Micklewhite","John Ebbrell","David Hopkin","Nick Pickering","Nigel Vaughn","Kevin Langley","Ian Snodin","Chris Lumsden","Nigel Callaghan","Kingsley Black","Scott Sellars","Stephen Clemence","Ted McMinn","Ian Selley","Mark Kinsella","John Robinson","Paul Cook","Simon Rodger","Neil Emblen","Dave Bennett","Mustapha Hadji","Dane Whitehouse","Tommy Widdrington","David McCreery","Eddie McGoldrick","Richard Sneekes","Brian Tinnion","Tobias Linderoth","Ian Crook","Ian Taylor","Jason Dozzell","Ali Benarbia","Moussa Saib","Nigel Gleghorn","Didier Six","Paul Tait", "Junior Bent","Vinny Samways","Craig Skinner","Jimmy Carter","Clayton Blackmore","Mark Ward","Brian Marwood","Adrian Heath","George Parris","John Bumstead","Mike Milligan","Phil Stamp","Kevin Gage","Youssef Chippo","John Harkes","Ian Bishop","Peter Fear","Trevor Birch","Trevor Putney","Kevin Brock","Stewart Castledine","Micky Gynn","Graham Hyde","Steve Stone","Bryan Roy","Kevin Horlock","John Moncur","Steve Froggatt","John Salako","Jeremy Goss","Nicky Summerbee","Andy Sinton","Ruel Fox","Steed Malbranque","Willo Flood"];
var Forward=["Jan Age Fjortoft","Efan Ekoku","Marcus Gayle","Dean Holdsworth","John Fashanu","Paul Warhurst","Benito Carbone","Neil Shipperley","Phil Starbuck","Nigel Jemson","Lee Glover", "Stuart Barlow","Marco Boogers","Jamie Scowcroft","Ian Ormerdroyd","Ian Marshall","Alex Mathie","Brett Angel","Steve Anthrobus","Ian Olney","Gary Bennett","Gary Lund","Paul Goddard","Dalian Atkinson","Steve Slade","Mixu Paatelainen","Egil Ostenstad","Adrian Littlejohn","Stefan Iverson","Dennis Bailey", "Bobby Barnes","Frankie Bunn","Carl Shutt","Dean Coney","Simon Stainrod","Ashley Ward","Peter Ndlovu","Micky Quinn","Chris Kiwoyma","Malcolm Allen","Trevor Morley","Bob Latchford","Gary Bannister","Franz Carr","Robert Rosario","Gary Penrice","Brian Deane","Alan Cork","Nicky Banger","Stuart Rimmer","Imre Varadi","Mark Bright","Gilles de Bilde","Jostein Flo","Mark Robins","Fabrizio Ravanelli","Peter Beagrie","Martyn Waghorn"];
var yellow=["y1.jpg","y2.jpg","y3.jpg","y4.jpg","y5.jpg","y6.jpg","y7.jpg"];
var red=["r1.jpg","r2.jpg","r3.jpg","r4.jpg"];

var Pturn_count=0;//number of turns by player
var Pwrong_selection_count=0;
var Cturn_count=0;//number of turns by computer
var Cwrong_selection_count=0;
var Whos_turn = 'player';
var selecter_players = [];
var team_1_name = 'team 1: ';
var team_2_name = 'team 2: ';
var gameName = 'The best game ever';
var update_other_player = true;	// tell the game if the other player should be notified of the move via socker io
var is_creator = null;	// tell the game if the user is the creator or a joiner
var playersList = {};	// used to save the list of players randomly generated for this game
	  playersList.player1 = [];
		playersList.player2 = [];
/* ---------------------------- */



/* SOCKET IO - real time communication */
var socket = io();
socket.on('rooms_status', function(data) {
});
socket.on('message', function(info) {
  switch(info.message) {
		case 'room_created':
			team_1_name = info.data.playerName;
			gameName   = info.data.gameName;
			is_creator = true;

			loaddata();

			$('.game-name-value').text(gameName);
			$('#team_1_name').text(team_1_name + ':');

			$('.waiting-wrapper-overlay').removeClass('hidden');
			$('.online_pvp_container').addClass('hidden');
			$('.start_game_container').removeClass('hidden');
			$('.player_2_input_btn').addClass('hidden');
		break;

		case 'join_room':
			team_1_name = info.data.player2Name;
			team_2_name = info.data.playerName;
			gameName   = info.data.gameName;
			is_creator = false;
			playersList = info.data.playersList;

			loaddata();

			$('.game-name-value').text(gameName);
			$('#team_1_name').text(team_1_name + ':');
			$('#team_2_name').text(team_2_name + ':');
			$('.online_pvp_container').addClass('hidden');
			$('.start_game_container').removeClass('hidden');
			$('.player_1_input_btn').addClass('hidden');
		break;

		case 'player_joined':
			team_2_name = info.data.playerName;
			alert('player ' + team_2_name + ' joined the game.');
			$('#team_2_name').text(team_2_name + ':');
			$('.waiting-wrapper-overlay').addClass('hidden');
		break;

		case 'user_left_room':
			alert('the other player lost, you win!');
			location.replace('/');
		break;

    case 'player_move':
		debugger;
			update_other_player = false;
			(info.data.split("_")[1] === 'p') ? select_player(info.data) : select_player2(info.data);
    break;

		case 'player_switch':
		debugger;
			$('#' + info.data.selector).text(info.data.newName);
		break;

		case 'update_score':
			$(info.data.selector).text(info.data.newScore);
		break;

		case 'player_won':
			var x=prompt("You Lost","Thanks for playing");
			if( (x === "") || (x!== "" )) {
				location.replace('/');
			}
		break;
	}
});


function create_new_online_game() {
  $('.step_1_create_or_select').addClass('hidden');
  $('.step_2_create_game').removeClass('hidden');
};

function select_game_to_join() {
  $('.step_1_create_or_select').addClass('hidden');
  $('.step_2_join_game').removeClass('hidden');
};

function back_to_step_2() {
  $('.step_1_create_or_select').removeClass('hidden');
  $('.step_2_join_game').addClass('hidden');
  $('.step_2_create_game').addClass('hidden');
};

function create_game_step_3() {
  //create a room and join it.
	var $createGame = $('.step_2_create_game');
  socket.emit('create', {
		'gameName': $createGame.find('.new_group_name').val(),
		'playerName': $createGame.find('.player_name').val()
	});
};

function select_game_to_join_step_3() {
  // join existing room
	var $joinGame = $('.step_2_join_game');
  socket.emit('join_room', {
		'gameName':   $joinGame.find('.join_group_name').val(),
		'playerName': $joinGame.find('.player_name').val()
	});
};

/* -------------------------------------------------------------- */

	$(document).ready(function() {
	});

	function getRandomPlayer(player) {
		// keep on searching for a random number for a player that was not chosen.
		var array_index, selected;

		do {
			array_index = Math.floor(Math.random() * player.length);
			selected = player[array_index];
		} while (selecter_players.indexOf(selected) !== -1);

		selecter_players.push(selected);
		return selected;
	};

	function switchRandomPlayer(player, player_to_return) {
		var index, new_player = getRandomPlayer(player);

		// return the player selected to the pull of players
		index = selecter_players.indexOf(player_to_return);
		selecter_players.splice(index, 1);

		return new_player;
	};

	function loadPlayersHelper(player_name, player_or_computer) {
		var player, x, randomPlayer;

		// computer is actually player2

		if (player_or_computer === 'player') {
			x = 'p';
		} else if (player_or_computer === 'computer') {
			x = 'c';
		}

		switch (player_name) {
				case ("gk_" + x):
					player = Goalkeepers;
				break;

				case ("fw1_" + x):
				case ("fw2_" + x):
					player = Forward;
				break;

				case ("rm_" + x):
				case ("lm_" + x):
				case ("cm1_" + x):
				case ("cm2_" + x):
					player = Midfielders;
				break;

				case ("rb_" + x):
				case ("cb1_" + x):
				case ("cb2_" + x):
					player = Defenders;
				break;
		}

		if (player_name === ("lb_" + x)) {
			$('#' + player_name).text('Ian Culverhouse');
			randomPlayer = 'Ian Culverhouse'
		} else {
			randomPlayer = getRandomPlayer(player);
			$('#' + player_name).text(randomPlayer);
		}

		return randomPlayer;
	};

	function loaddata() {
		var playerName, i;
		var comp=["rb_c","cb1_c","cb2_c","lb_c","rm_c","cm1_c","cm2_c","lm_c","fw1_c","fw2_c","gk_c"];
		var players=["rb_p","cb1_p","cb2_p","lb_p","rm_p","cm1_p","cm2_p","lm_p","fw1_p","fw2_p","gk_p"];

		players.forEach(function(player) {
			$('#' + player).closest('.box').addClass('player_team');
		});

		comp.forEach(function(comp) {
			$('#' + comp).closest('.box').addClass('computer_team');
		});

		//show that the first turn is for team 1
		$('.box.computer_team input').prop('disabled', true).addClass('disabled-button');

		if (is_creator) {
			//loading players for player1
			for(i = 0 ;i < players.length; i++) {
				playerName = players[i];
				playersList.player1.push(loadPlayersHelper(playerName, 'player'));
			}

			//loading players for player2
			for(i = 0; i < comp.length; i++) {
				playerName=comp[i];
				playersList.player2.push(loadPlayersHelper(playerName, 'computer'));
			}

			//update the other player of the players allocated for this game
			socket.emit('players_allocation', {
				'gameName': gameName,
				'playersList': playersList
			});
		} else {
			player_allocation();
		}

	}//loaddata end

	function player_allocation() {
		var comp=["rb_c","cb1_c","cb2_c","lb_c","rm_c","cm1_c","cm2_c","lm_c","fw1_c","fw2_c","gk_c"];
		var players=["rb_p","cb1_p","cb2_p","lb_p","rm_p","cm1_p","cm2_p","lm_p","fw1_p","fw2_p","gk_p"];

		for(i = 0 ;i < players.length; i++) {
			player_name = players[i];
			$('#' + player_name).text(playersList.player1[i]);
		}

		for(i = 0; i < comp.length; i++) {
			player_name = comp[i];
			$('#' + player_name).text(playersList.player2[i]);
		}
	}

	function select_player(player_name) {
		var Midfielders_flag=false;
		var player, choice, newScore;

		// check that it is the player turn and not the other player's turns
		if (Whos_turn !== 'player') {
			Pwrong_selection_count++;
			return;
		} else {
			Whos_turn = 'player';
		}

		if(player_name=="gk_p")
		{
			player=Goalkeepers;
		}
		else if(player_name=="fw1_p" || player_name=="fw2_p")
		{
			player=Forward;
		}
		else if(player_name=="rm_p" || player_name=="lm_p" || player_name=="cm1_p" || player_name=="cm2_p")
		{
			player=Midfielders;
			Midfielders_flag=true;
		}
		else if(player_name=="rb_p" || player_name=="cb1_p" || player_name=="cb2_p" )
		{
			player=Defenders;
		}
		else if(player_name=="lb_p")
		{
			player=["Ian Culverhouse"];
		}
		choice = $('#' + player_name).text();//getting the player name, to make decision
		Pturn_count++;
			if(player_name=="lb_p")//IanCulverhouse
			{
				Pwrong_selection_count++;
				if(Pturn_count<=8) {
					if(Pwrong_selection_count === 1) {
						document.getElementById('screen').src="images/"+yellow[Math.floor(Math.random() * yellow.length)];
						document.getElementById("team_1_name").style.color="yellow";
						//yellow card
					} else if(Pwrong_selection_count === 2) {
						document.getElementById('screen').src="images/"+red[Math.floor(Math.random() * red.length)];;
						//red card + game lost
						document.getElementById("team_1_name").style.color="red";
						gameover(team_1_name);
						return 0;
					}
				} else {
					gamewon();
				}
			} else if(choice === (player[player.length-1])) {//bad player
				Pwrong_selection_count++;
				if(Pwrong_selection_count === 1) {
					document.getElementById('screen').src="images/"+yellow[Math.floor(Math.random() * yellow.length)];
					document.getElementById("team_1_name").style.color="yellow";
						//yellow card
				} else if(Pwrong_selection_count === 2) {
					document.getElementById('screen').src="images/"+red[Math.floor(Math.random() * red.length)];
					document.getElementById("team_1_name").style.color="red";
					gameover(team_1_name);
					return 0;
					//red card + game lost
				}
			} else if((Midfielders_flag === true) && (choice === (player[player.length-2]))) {
				Pwrong_selection_count++;
				if(Pwrong_selection_count === 1) {
					document.getElementById('screen').src="images/"+yellow[Math.floor(Math.random() * yellow.length)];
					document.getElementById("team_1_name").style.color="yellow";
						//yellow card
				} else if(Pwrong_selection_count === 2) {
					document.getElementById('screen').src="images/"+red[Math.floor(Math.random() * red.length)];
					document.getElementById("team_1_name").style.color="red";
					gameover(team_1_name);
					//red card + game lost
				}
			} else {//good player
				$('#screen').attr('src', 'images/g1.jpg');
				newScore = 1 + parseInt($('#p_score').text());
				$('#p_score').text(newScore);
			}

			$('#' + player_name).css({
				'color': 'yellow',
				'font-size': '1.5em'
			});

			// disable the select buttons until it's the player's turn again
			$('.box.player_team input').prop('disabled', true).addClass('disabled-button');
			$('.box.computer_team input').prop('disabled', false).removeClass('disabled-button');

      // sending to all clients in 'game' room(channel) except sender
			// the move that this player made
      if (update_other_player) {
				socket.emit('player_move', player_name);
			} else {
				update_other_player = true;
			}

			setTimeout(function()
			{
				var newPlayerName = switchRandomPlayer(player, $('#' + player_name).text());
				$('#' + player_name).text(newPlayerName);
				$('#' + player_name).css({
					'color': 'white',
					'font-size': '1.0em'
				});
				$('#screen').attr('src', 'images/stadium.jpg');

				socket.emit('player_switch', {
					'selector': player_name,
					'newName': newPlayerName
				});

			},1000);

	}; //select_player end


	function select_player2(player_name) {
		var Midfielders_flag=false;
		var player, choice, newScore;

		// notify the program that it's the computer's turn.
		Whos_turn = 'computer';

		if(player_name=="gk_c")
		{
			player=Goalkeepers;
		}
		else if(player_name=="fw1_c" || player_name=="fw2_c")
		{
			player=Forward;
		}
		else if(player_name=="rm_c" || player_name=="lm_c" || player_name=="cm1_c" || player_name=="cm2_c")
		{
			player=Midfielders;
			Midfielders_flag=true;
		}
		else if(player_name=="rb_c" || player_name=="cb1_c" || player_name=="cb2_c")
		{
			player=Defenders;
		}
		else if(player_name=="lb_c")
		{
			player=["Ian Culverhouse"];
		}
		choice = $('#' + player_name).text();//getting the player name, to make decision
		Cturn_count++;
		if(player_name === "lb_c") {//IanCulverhouse
			Cwrong_selection_count++;
			if(Cturn_count<=50)
			{
				if(Cwrong_selection_count === 1)
				{
					document.getElementById('screen').src="images/"+yellow[Math.floor(Math.random() * yellow.length)];
					document.getElementById("team_2_name").style.color="yellow";
					//yellow card
				} else if(Cwrong_selection_count === 2) {
					$('#' + player_name).css({
						'color': 'yellow',
						'font-size': '1.5em'
					});
          //two lines above , get last player to show in yellow when comp loses
          document.getElementById('screen').src="images/"+red[Math.floor(Math.random() * red.length)];;
					//red card + game lost
					document.getElementById("team_2_name").style.color="red";
					gameover(team_2_name);
					return 0;
				}

			} else {
				//gamewon_comp();
			}
		} else if(choice === (player[player.length-1])) {//bad player
			Cwrong_selection_count++;
			if(Cwrong_selection_count === 1) {
				document.getElementById('screen').src="images/"+yellow[Math.floor(Math.random() * yellow.length)];
				document.getElementById("team_2_name").style.color="yellow";
					//yellow card
			} else if(Cwrong_selection_count === 2) {
				$('#' + player_name).css({
					'color': 'yellow',
					'font-size': '1.5em'
				});

				//two lines above , get last player to show in yellow when comp loses
				document.getElementById('screen').src="images/"+red[Math.floor(Math.random() * red.length)];
				document.getElementById("team_2_name").style.color="red";
				gameover(team_2_name);
				return 0;
				//red card + game lost
			}
		}//else if end
		else if(Midfielders_flag==true && choice==(player[player.length-2]))
		{
			Cwrong_selection_count++;
			if(Cwrong_selection_count === 1) {
				document.getElementById('screen').src="images/"+yellow[Math.floor(Math.random() * yellow.length)];
				document.getElementById("team_2_name").style.color="yellow";
				//yellow card
			} else if(Cwrong_selection_count==2) {
				$('#' + player_name).css({
					'color': 'yellow',
					'font-size': '1.5em'
				});

				//two lines above , get last player to show in yellow when comp loses
        document.getElementById('screen').src="images/"+red[Math.floor(Math.random() * red.length)];
				document.getElementById("team_2_name").style.color="red";
				gameover(team_2_name);
				return 0;
				//red card + game lost
			}
		} else {
			//good player
			$('#screen').attr('src', 'images/g1.jpg');
			newScore = 1 + parseInt($('#c_score').text());
			$('#c_score').text(newScore);
		}

		$('#' + player_name).css({
			'color': 'yellow',
			'font-size': '1.5em'
		});

		// sending to all clients in 'game' room(channel) except sender
		// the move that this player made
		if (update_other_player) {
			socket.emit('player_move', player_name);
		} else {
			update_other_player = true;
		}

		setTimeout(function()
		{
			$('#' + player_name).text(switchRandomPlayer(player, $('#' + player_name).text()))
			.css({
				'color': 'white',
				'font-size': '1.0em'
			});
			$('#screen').attr('src', 'images/stadium.jpg');

			Whos_turn = 'player';

			// enable the select buttons for player, it's his turn
			$('.box.player_team input').prop('disabled', false).removeClass('disabled-button');
			$('.box.computer_team input').prop('disabled', true).addClass('disabled-button');

		},1000);
	}; //select_player2 end

	function gameover(name) {
		setTimeout(function()
		{
			alert("Game lost by " + name + ", Thanks for playing!");
			location.replace('/');

		},2000);
	};

	function gamewon() {
		setTimeout(function() {
			var x=prompt("You won","Thanks for playing");
			if( (x === "") || (x!== "" )) {

	      socket.broadcast.to(gameName).emit('message', {
	        'message' : 'player_won',
	        'data': 'player_won'
	      });

				location.replace('/');
			}
		},2000);
	};
