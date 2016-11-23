var Goalkeepers=["David Watson","Neil Sullivan","Steve Ogrizovic","Kevin Pressman","Bryan Gunn","Mark Crossley","Kevin Poole","John Sheffield","Keith Branagan","Vince Bartram","Bobby Mimms","Espen Bardsen","Gary Plumley","Bob Boulder","John Filan","Alan Fettis","Frode Grodas","Mark Gayle","Sieb Dijkstra","Mike Pollitt","Eddie Niedzwiecki","Jan Stejskal","Ian Andrews","Paul Musselwhite","Maarten Stekelenburg"];
var Defenders=["Arjan de Zeeuw","Warren Barton","Paul Beesley","Gianluca Festa","Carl Bradshaw","Roland Nilsson","Colin Cooper","Ian Woan","Steve Redmond","Craig Fleming","Mark Kennedy","Paul Bodin","Des Walker","Luc Nijholt ","Mel Sterland","Timothee Atouba","Eric Edman","Mike Whitlow","Kent Nielsen","Pal Lydersen","Darren Wassall","Paul Telfer", "Steve Sedgley","Alfie Haland","Clive Wilson","Gudni Bergsson","Jeff Kenna","Lee Sinnott","Stuart Nethercott","Earl Barrett","Frank Yallop", "Mal Donaghy","Steve Chettle","Greg Downs","Steve Potts","Derek Brazil","Neil Pointon","Phil King","Reuben Agboola","Gus Uhlenbeek","Daryl Sutch","Gunnar Halle","Micky Droy","Marc Hottiger","Colin Hendry","Peter Jackson","Richard Shaw","Johnny Metgod","Trevor Cherry","David Bardsley","Peter Haddock","Glenn Pennyfeather","Roger Joseph","Ian Cox","Nick Tanner","Lee Naylor","Kevin Scott","Alan Kernaghan","Steve Morrow","Dean Spink ","Tony Dorigo","Chris Riggott","Stefan Schnoor","Steve Vickers","Richard Naylor","David Brightwell", "Gus Caeser","David Linagan","Ian Brightwell","Neil Cox","Richard Edghill", "Richard Ord","Vince Overson","Richard Jobson","John Polston","Andy Duncan","Ian Butterworth","Jason Dodd","Peter Billing","Mitchell Thomas","Colin Pates","Brian Burrows","Pat Van Den Hauwe","Steve Sims","Tim Breacker","Peter Shirtliff","Rob Hindmarsh","Ian Brightwell","Trevor Peake","Danny Granville", "Graham Rodger","Jamie Clapham","Ian Pearce","Lloyd Dooley","Des Linton","Andy Hinchcliffe", "Gary Charles","Eric Young","Ronnie Wallwork","Chris Perry","Jody Craddock ","John Scales","Adi Moses","Nicky Eaden","Andy Hinchcliffe","Chris Bart-Williams","John O'Shea"];
var Midfielders=["Neil Redfearn","Eric Tinkler","Oyvind Leonhardsen","Darren Sheridan","Martin Bullock","Nick Henry","Darren Barnard","Carlton Palmer","Neil Adams","Mark Pembridge","Scott Gemmill","Robbie Earle","Peter Atherton","Gary Crosby","Dale Gordon","Teemu Tainio","Darren Barnard","Gary Micklewhite","John Ebbrell","David Hopkin","Nick Pickering","Nigel Vaughn","Kevin Langley","Ian Snodin","Chris Lumsden","Nigel Callaghan","Kingsley Black","Scott Sellars","Stephen Clemence","Ted McMinn","Ian Selley","Mark Kinsella","John Robinson","Paul Cook","Simon Rodger","Neil Emblen","Dave Bennett","Mustapha Hadji","Dane Whitehouse","Tommy Widdrington","David McCreery","Eddie McGoldrick","Richard Sneekes","Brian Tinnion","Tobias Linderoth","Ian Crook","Ian Taylor","Jason Dozzell","Ali Benarbia","Moussa Saib","Nigel Gleghorn","Didier Six","Paul Tait", "Junior Bent","Vinny Samways","Craig Skinner","Jimmy Carter","Clayton Blackmore","Mark Ward","Brian Marwood","Adrian Heath","George Parris","John Bumstead","Mike Milligan","Phil Stamp","Kevin Gage","Youssef Chippo","John Harkes","Ian Bishop","Peter Fear","Trevor Birch","Trevor Putney","Kevin Brock","Stewart Castledine","Micky Gynn","Graham Hyde","Steve Stone","Bryan Roy","Kevin Horlock","John Moncur","Steve Froggatt","John Salako","Jeremy Goss","Nicky Summerbee","Andy Sinton","Ruel Fox","Steed Malbranque","Willo Flood"];
var Forward=["Jan Age Fjortoft","Efan Ekoku","Marcus Gayle","Dean Holdsworth","John Fashanu","Paul Warhurst","Benito Carbone","Neil Shipperley","Phil Starbuck","Nigel Jemson","Lee Glover", "Stuart Barlow","Marco Boogers","Jamie Scowcroft","Ian Ormerdroyd","Ian Marshall","Alex Mathie","Brett Angel","Steve Anthrobus","Ian Olney","Gary Bennett","Gary Lund","Paul Goddard","Dalian Atkinson","Steve Slade","Mixu Paatelainen","Egil Ostenstad","Adrian Littlejohn","Stefan Iverson","Dennis Bailey", "Bobby Barnes","Frankie Bunn","Carl Shutt","Dean Coney","Simon Stainrod","Ashley Ward","Peter Ndlovu","Micky Quinn","Chris Kiwoyma","Malcolm Allen","Trevor Morley","Bob Latchford","Gary Bannister","Franz Carr","Robert Rosario","Gary Penrice","Brian Deane","Alan Cork","Nicky Banger","Stuart Rimmer","Imre Varadi","Mark Bright","Gilles de Bilde","Jostein Flo","Mark Robins","Fabrizio Ravanelli","Peter Beagrie","Martyn Waghorn"];
var yellow=["y1.jpg","y2.jpg","y3.jpg","y4.jpg","y5.jpg","y6.jpg","y7.jpg"];
var red=["r1.jpg","r2.jpg","r3.jpg","r4.jpg"];

	$(document).ready(function()
	{
		loaddata();
	});
	function loaddata()
	{

		var players=["rb_p","cb1_p","cb2_p","lb_p","rm_p","cm1_p","cm2_p","lm_p","fw1_p","fw2_p","gk_p"];

		var player_name;
		var player;
		for(var i=0;i<players.length;i++)//loading players for player
		{
			player_name=players[i];

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
			}
			else if(player_name=="rb_p" || player_name=="cb1_p" || player_name=="cb2_p" )
			{
				player=Defenders;
			}
			document.getElementById(player_name).innerHTML=player[Math.floor(Math.random() * player.length)];
			if(player_name=="lb_p")
			{
				document.getElementById(player_name).innerHTML="Ian Culverhouse";
			}
		}

	}//loaddata end
	var Pturn_count=0;//number of turns by player
	var Pwrong_selection_count=0;
	function select_player(player_name)
	{
		var Midfielders_flag=false;
		var player;
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
		var choice=document.getElementById(player_name).innerHTML;//getting the player name, to make decision
		Pturn_count++;
			if(player_name=="lb_p")//IanCulverhouse
			{
				Pwrong_selection_count++;
				if(Pturn_count<=5)
				{
					if(Pwrong_selection_count==1)
					{
						document.getElementById('screen').src="images/"+yellow[Math.floor(Math.random() * yellow.length)];
						document.getElementById("team_name").style.color="yellow";
						//yellow card
					}
					else if(Pwrong_selection_count==2)
					{
						document.getElementById('screen').src="images/"+red[Math.floor(Math.random() * red.length)];;
						//red card + game lost
						document.getElementById("team_name").style.color="red";
						gameover("Player");
						return 0;
					}
				}
				else
				{
					gamewon();
				}
			}//if end
			else if(choice==(player[player.length-1]))//bad player
			{
				Pwrong_selection_count++;
				if(Pwrong_selection_count==1)
				{
					document.getElementById('screen').src="images/"+yellow[Math.floor(Math.random() * yellow.length)];
					document.getElementById("team_name").style.color="yellow";
						//yellow card
				}
				else if(Pwrong_selection_count==2)
				{
					document.getElementById('screen').src="images/"+red[Math.floor(Math.random() * red.length)];
					document.getElementById("team_name").style.color="red";
					gameover("Player");
					return 0;
						//red card + game lost
				}
			}//else if end
			else if(Midfielders_flag==true && choice==(player[player.length-2]))
			{
				Pwrong_selection_count++;
				if(Pwrong_selection_count==1)
				{
					document.getElementById('screen').src="images/"+yellow[Math.floor(Math.random() * yellow.length)];
					document.getElementById("team_name").style.color="yellow";
						//yellow card
				}
				else if(Pwrong_selection_count==2)
				{
					document.getElementById('screen').src="images/"+red[Math.floor(Math.random() * red.length)];
					document.getElementById("team_name").style.color="red";
					gameover("Player");
						//red card + game lost
				}
			}//else if end
			else//good player
			{
				document.getElementById('screen').src="images/g1.jpg";
				var x=document.getElementById('p_score').innerHTML;
				x++;
				document.getElementById('p_score').innerHTML=x;
			}
			document.getElementById(player_name).style.color="yellow";
			document.getElementById(player_name).style.fontSize="1.5em";
		//	Toogle_inputs();//////////Disable inputs
				setTimeout(function()
				{
					document.getElementById(player_name).style.color="white";
					document.getElementById(player_name).style.fontSize="1.0em";
					document.getElementById(player_name).innerHTML=	player[Math.floor(Math.random() * player.length)];//name of new selected player


					document.getElementById('screen').src="images/stadium.jpg";

				//	Toogle_inputs();//Enable inputs
				},1000);
	}//select_player end
	function gameover(name)
	{
		setTimeout(function()
		{
			var x=prompt("Game lost by "+name,"Thanks for playing");
			if(x=="" || x!="")
			{
				location.reload();
			}
		},2000);
	}
	function gamewon()
	{
		setTimeout(function()
		{
			var x=prompt("You won","Thanks for playing");
			if(x=="" || x!="")
			{
				location.reload();
			}
		},2000);
	}
	function startup()//called on load of body
	{
		var TeamName=prompt("Please enter your Team name", "");
		document.getElementById('team_name').innerHTML=TeamName + ": ";
		$('audio')[0].play();
	}
	function Toogle_inputs()//disable/enable inputs
	{
    	var inputs = document.getElementsByTagName('input');
    	for (var i = inputs.length, n = 0; n < i; n++)
    	{
    	    inputs[n].disabled = !inputs[n].disabled;
    	}
	}//Disable_inputs end here
