var Goalkeepers	=	["Fraser Digby","Mike Hooper","Pegguy Arphexad","Rhys Wilmot","Perry Suckling"];
var Defenders		=	["George Parris","Dean Austin","Richard Rufus","Chris Price","Chris Fairclough","Gary Strodder","Gretar Steinsson","Tosh McKinlay","Alan Kimble","Robert Ullathorne","Jamie Pollock","David Wetherall","Mark Aizlewood","David Kerslake","William Prunier"];
var Midfielders	=	["Lars Bohinen","Garry Parker","Cobi Jones","Steve Agnew","Andy Impey","Mick Stockwell","Paul Tisdale","Carlton Fairweather","Eoin Jess","Nicky Shorey","Hassan Kachloul","Jim Magilton","Micky Hazard","Rick Holden","Jason Wilcox","Billy McKinlay","John Gannon","Neil Maddison","Eddie Newton"];
var Forward			=	["David Hirst","Simon Garner","Tommy Gaynor","Kevin Drinkell","Gordon Durie","Robert Fleck","Roy Wegerle","Willie Falconer","Wayne Allison","Devon White","David White","Jason Beckford","Sean Dundee","Fabian de Freitas","Kurt Nogan","Craig Hignett","Malcolm Christie","Hamilton Ricard","Guy Whittingham","Graham Fenton"];
var yellow			=	["y1.jpg","y2.jpg","y3.jpg","y4.jpg","y5.jpg","y6.jpg","y7.jpg"];
var red					=	["r1.jpg","r2.jpg","r3.jpg","r4.jpg"];

var Pturn_count=0;//number of turns by player
var Pwrong_selection_count=0;
var Cturn_count=0;//number of turns by computer
var Cwrong_selection_count=0;
var Whos_turn = 'player';
var selecter_players = [];
var team_1_name = 'team 1: ';
var team_2_name = 'team 2: ';

	$(document).ready(function() {
		loaddata();
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
		var player, x;

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

		(player_name === ("lb_" + x)) ? $('#' + player_name).text("Ian Culverhouse") : $('#' + player_name).text(getRandomPlayer(player));

	};

	function loaddata() {
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

		var player_name, i;

		//loading players for player
		for(i = 0 ;i < players.length; i++) {
			player_name = players[i];
			loadPlayersHelper(player_name, 'player');
		}

		//loading players for computer
		for(var i = 0; i < comp.length; i++) {
			player_name=comp[i];
			loadPlayersHelper(player_name, 'computer');
		}
	}//loaddata end


	function select_player(player_name) {
		var Midfielders_flag=false;
		var player, choice;

		// check that it is the player turn and not the computer's turns
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
				if(Pturn_count<=5) {
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
				$('#p_score').text(1 + parseInt($('#p_score').text()));
			}

			$('#' + player_name).css({
				'color': 'yellow',
				'font-size': '1.5em'
			});

			// disable the select buttons until it's the player's turn again
			$('.box.player_team input').prop('disabled', true).addClass('disabled-button');
			$('.box.computer_team input').prop('disabled', false).removeClass('disabled-button');

			setTimeout(function()
			{
				$('#' + player_name).text(switchRandomPlayer(player, $('#' + player_name).text()))
				$('#' + player_name).css({
					'color': 'white',
					'font-size': '1.0em'
				});
				$('#screen').attr('src', 'images/stadium.jpg');
			},1000);
	}; //select_player end


	function select_computer(player_name) {
		var Midfielders_flag=false;
		var player, choice;

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
				gamewon_comp();
			}
		} else if(choice==(player[player.length-1])) {//bad player
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
			$('#c_score').text(1 + parseInt($('#c_score').text()));
		}

		$('#' + player_name).css({
			'color': 'yellow',
			'font-size': '1.5em'
		});

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
	}; //select_computer end

	function gameover(name) {
		setTimeout(function()
		{
			alert("Game lost by " + name + ", Thanks for playing!");
			location.reload();

		},2000);
	};

	function gamewon() {
		setTimeout(function() {
			var x=prompt("You won","Thanks for playing");
			if( (x === "") || (x!== "" )) {
				location.reload();
			}
		},2000);
	};

	function gamewon_comp() {
		setTimeout(function() {
			var x=prompt("Computer won","Thanks for playing");
			if((x === "") || (x!=="")) {
				location.reload();
			}
		},2000);
	};

	//called on load of body
	function startup() {
		team_1_name = prompt("Please enter the name of team 1", "");
		if (!team_1_name) { team_1_name = 'Team 1 '}
		$('#team_1_name').text(team_1_name +': ');

		team_2_name = prompt("Please enter the name of team 2", "");
		if (!team_2_name) { team_2_name = 'Team 2 '}
		$('#team_2_name').text(team_2_name +': ');
		$('audio')[0].play();
	};
