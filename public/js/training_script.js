var Goalkeepers	=	["Fraser Digby","Mike Hooper","Pegguy Arphexad","Rhys Wilmot","Perry Suckling"];
var Defenders		=	["George Parris","Dean Austin","Richard Rufus","Chris Price","Chris Fairclough","Gary Strodder","Gretar Steinsson","Tosh McKinlay","Alan Kimble","Robert Ullathorne","Jamie Pollock","David Wetherall","Mark Aizlewood","David Kerslake","William Prunier"];
var Midfielders	=	["Lars Bohinen","Garry Parker","Cobi Jones","Steve Agnew","Andy Impey","Mick Stockwell","Paul Tisdale","Carlton Fairweather","Eoin Jess","Nicky Shorey","Hassan Kachloul","Jim Magilton","Micky Hazard","Rick Holden","Jason Wilcox","Billy McKinlay","John Gannon","Neil Maddison","Eddie Newton"];
var Forward			=	["David Hirst","Simon Garner","Tommy Gaynor","Kevin Drinkell","Gordon Durie","Robert Fleck","Roy Wegerle","Willie Falconer","Wayne Allison","Devon White","David White","Jason Beckford","Sean Dundee","Fabian de Freitas","Kurt Nogan","Craig Hignett","Malcolm Christie","Hamilton Ricard","Guy Whittingham","Graham Fenton"];
var yellow			=	["y1.jpg","y2.jpg","y3.jpg","y4.jpg","y5.jpg","y6.jpg","y7.jpg"];
var red					=	["r1.jpg","r2.jpg","r3.jpg","r4.jpg"];

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
