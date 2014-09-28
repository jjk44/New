var curBattleBtn = null;
var curTurn = 0;
var timer = -1;
var didFlee = false;
var newMonster = false;

var curHP = 0;
var curMaxHP = 0;
var curToHP = 0;

var finalMessage = 0;
var finalMessageA = 0;
var finalMessageY = 0;

var won = false;

var aType = 0;

function Battle() {  
	curHP = currentUser.get("HP");
	curMaxHP = currentUser.get("MAX_HP");

	this.monster = new Monster();
	
	this.hopDeg1 = 0;
	this.hopDeg2 = 0;
	this.hopDeg3 = 0;
	
	this.hopY1 = 10;
	this.hopY2 = 10;
	this.hopY3 = 10;
	
	this.bGrd = context.createLinearGradient(0,180,width,180);
		this.bGrd.addColorStop(0,"rgba(240, 240, 240, 1)");
		this.bGrd.addColorStop(1,"rgba(100, 100, 100, 1)");
		
	this.rBtn = new BattleButton(0, 210, 520, 100);
	this.aBtn = new BattleButton(1, 580, 520, 100);
	this.dBtn = new BattleButton(2, 900, 520, 100);
};
	Battle.prototype.render = function() {
		context.fillStyle = this.bGrd;
		context.fillRect(0, 0, width, 640);
		
		border = 180;
				

		context.fillStyle = "#223333";
		context.fillRect(0, 0, width, border);
				
				

		context.fillStyle = "#223333";
		context.fillRect(0, 640-border, width, border);
		
		
		
		
		if(this.monster.deathA < 1)
		{
			context.fillStyle = "rgba(255,255,255,"+ (1-this.monster.deathA) +")";
			context.fillRect(0, 0, width, height);	
		}
		
				this.monster.render();

		
		reIcon.render();
		swIcon.render();
		shIcon.render();
		
		
		rndX = 0;
		rndY = 0;
		
		if(curTurn == .6)
		{
			dir = Math.random()*360;
			rad = Math.random()*20;
			rndX = rad*Math.cos(dir/180*3.14159);
			rndY = rad*Math.sin(dir/180*3.14159);
		}
		
		rndX *= .25;
		rndY *= .25;
		
		
		
		context.fillStyle = "#777777";
		context.fillRect(50+rndX, 40+rndY, 320, 60);
		context.fillStyle = "#FFFFFF";
		context.fillRect(50+rndX, 40+rndY, 320*(curHP/curMaxHP), 60);
		
		context.fillStyle = "#444444";
		context.font = "50px Tahoma";
		context.fillText("Me: " + Math.round(curHP) + "/" + curMaxHP, 50+4, 160+4);
		
		context.fillStyle = "#FFFFFF";
		context.fillText("Me: " + Math.round(curHP) + "/" + curMaxHP, 50, 160);
		
		
		
		context.fillStyle = "rgba(0,0,0,"+ percBattle +")";
	    context.fillRect(0, 0, width, height);		
	    
	    context.font = "60px Tahoma";
		context.fillStyle = "rgba(255,255,255,"+ finalMessageA +")";
	    context.fillText(finalMessage, 300, 200-60*finalMessageY);
	};
	Battle.prototype.update = function() {
		if(newMonster)
		{
			delete this.monster;
			this.monster = new Monster();
			newMonster = false;
		}
		
		
		if(!didFlee && !won)
		{
			percBattle += (0 - percBattle)/10;
			if(percBattle < .05)
				percBattle = 0;
		}
		else
		{		
			if(percBattle < .95)
			{
				finalMessageA += (1 - finalMessageA)/20;
				finalMessageY += (1 - finalMessageY)/40;
			}
			else
			{
				finalMessageA += (0 - finalMessageA)/10;
				if(finalMessageA < .05)
					finalMessageA = 0;
			}
			
			percBattle += (1 - percBattle)/40;
			if(Math.abs(1 - percBattle) < .01)
			{
				curTurn = 0;
				curBattleBtn = null;
				
				this.rBtn.isSelected = false;
				this.aBtn.isSelected = false;
				this.dBtn.isSelected = false;
				
				newMonster = true;
				won = false;
				didFlee = false;
				percBattle = 1;
				setCookie("room", "0", 5);
				
				finalMessageA = 0;
				finalMessageY = 0;
			}
		}
		
		if(curTurn == .2)
		{
			if(timer > -1)
				timer -= 1;
			else
			{
				dmg = calcDamage(this.monster, 0);
				
				if(aType == 0);
					dmg *= 3;
				
				this.monster.toHP = Math.max(0, this.monster.hp - dmg);
				curTurn = .4;
				timer = 100;
			}
		}
		else if(curTurn == .4)
		{
			if(this.monster.hp != this.monster.toHP)
			{
				this.monster.hp += (this.monster.toHP - this.monster.hp)/5;
				
				if(Math.abs(this.monster.hp-this.monster.toHP) < .25)
				{
						this.monster.hp = this.monster.toHP;
						timer = 50;
						
						if(this.monster.hp == 0)
							curTurn = 1.2;
				}	
			}
			else
			{
				if(timer > -1)
					timer -= 1;
				else
				{
					dmg = calcDamage(this.monster, 1);
					
					if(aType == 0)
						dmg *= 1;
					
					curToHP = Math.max(0, curHP - dmg);
					curTurn = .6;
					timer = 100;
				}
			}
		}
		else if(curTurn == .6)
		{
			if(curHP != curToHP)
			{
				curHP += (curToHP - curHP)/5;

				if(Math.abs(curHP-curToHP) < .25)
				{
						curHP = curToHP;
						timer = 50;
						
						if(curHP == 0)
							curTurn = 1.4;
						else
							curTurn = 0;
				}	
			}
		}
		else if(curTurn == 1.2)
		{
			this.monster.deathA += (0 - this.monster.deathA)/50;
			
			if(this.monster.deathA < .001)
			{
				this.monster.deathA = 0;
				curTurn = 0;
				won = true;
				
				finalMessage = "You have won!";
			}
		}
		else if(curTurn == 1.4)
		{
			newMonster = true;
			curTurn = 0;
			won = true;
			
			finalMessage = "You have died...";
		}
		
		this.monster.update();
		this.rBtn.update();
		this.aBtn.update();
		this.dBtn.update();
		
		if(curBattleBtn == this.rBtn)
		{
			this.hopDeg1 += 9;
			s1 = 3;
		}
		else
		{
			this.hopDeg1 += 3;
			s1 = 1;
		}
		if(curBattleBtn == this.aBtn)
		{
			this.hopDeg2 += 9;
			s2 = 3;
		}
		else
		{
			this.hopDeg2 += 3;
			s2 = 1;
		}
		if(curBattleBtn == this.dBtn)
		{
			this.hopDeg3 += 9;
			s3 = 3;
		}
		else
		{
			this.hopDeg3 += 3;
			s3 = 1;
		}
		
		if(this.hopDeg1 > 360)
			this.hopDeg1 -= 360;
		if(this.hopDeg2 > 360)
			this.hopDeg2 -= 360;
		if(this.hopDeg3 > 360)
			this.hopDeg3 -= 360;
		
		if(curTurn == 0 && this.monster.hp > 0)
		{	
			this.hopY1 += (420 - 10*(s1-1) + s1*10*Math.round(Math.abs(Math.sin(this.hopDeg1/180*3.14159))) - this.hopY1)/4;
			this.hopY2 += (420 - 10*(s2-1) + s2*10*Math.round(Math.abs(Math.sin(15 + this.hopDeg2/180*3.14159))) - this.hopY2)/4;
			this.hopY3 += (420 - 10*(s3-1) + s3*10*Math.round(Math.abs(Math.sin(30 + this.hopDeg3/180*3.14159))) - this.hopY3)/4;
		}
		else
		{
			this.hopY1 += (700 - this.hopY1)/10;
			this.hopY2 += (700 - this.hopY2)/10;
			this.hopY3 += (700 - this.hopY3)/10;
		}
		
		reIcon.y = this.hopY1;
		swIcon.y = this.hopY2;
		shIcon.y = this.hopY3;
	};

function BattleButton(num,x,y,rad) {
	this.num = num;

	this.x = x;
	this.y = y;
	
	this.rad = rad;
	
	this.isSelected = false;
};
	BattleButton.prototype.update = function() {
		if(curTurn == 0 && Math.sqrt(Math.pow(this.x - mouseX,2) + Math.pow(this.y - mouseY,2)) < this.rad)
		{
			if(mouseDown) 
			{
				if(!this.isSelected)
					curBattleBtn = this;
				else
				{
					if(this.num == 0)
					{
						didFlee = true;
						this.isSelected = false;
						
						finalMessage = "You have gotten away safely!";
					}
					else
					{
						if(this.num == 1)
							aType = 0;
						else
							aType = 1;
							
						curTurn = .2;
						
						timer = 30;
						
						this.isSelected = false;
					}
				}
			}
			else if(curBattleBtn == this)
				this.isSelected = true;
		}
		else if(mouseDown && curBattleBtn == this)
		{
			this.isSelected = false;
			curBattleBtn = null;
		}
	};
	BattleButton.prototype.render = function() {
		context.beginPath();
		context.arc(this.x,this.y,this.rad,0,2*Math.PI);
		context.stroke();
	};
	
	
	
loadRnd = function() {
	var query = new Parse.Query(NoteMonsters);
	
	query.find({
		success: function(results) {				
			note = results[Math.round(15*Math.random())];				
		
			setCookie("curName",note.get("Name"),5);
			setCookie("curHP",note.get("HP"),5);
			setCookie("curSrc",note.get("Picture").url,5);	
			setCookie("curDef",note.get("DEF"),5);
			setCookie("curAtk",note.get("ATK"),5);
			setCookie("curEY",note.get("exp_yield"),5);
			setCookie("curLvl",note.get("Level"),5);	
	},
	error:function(error) {
		alert("Error when getting notes!");
	}});
};
	
function Monster() {
	this.name = "";
	this.hp = 0;
	this.maxHP = 0;
	this.lvl = 0;
	this.atk = 0;
	this.def = 0;
	this.src = "";	
	
	this.deathAni = -1;
	this.deathA = 1;
	
	loadRnd();

	this.def = getCookie("curDef");
	this.atk = getCookie("curAtk");
	this.expYield = getCookie("curEY");
	this.lvl = getCookie("curLvl");
	this.name = getCookie("curName");
	this.hp = parseInt(getCookie("curHP"));
	this.maxHP = this.hp;
	this.toHP = this.hp;
		
	this.hopDeg = 0;
	
	this.src = getCookie("curSrc");
	this.spr = new Sprite(this.src,100,100);
	this.spr.setCenter();
	this.spr.scale(400);
	
	this.y = this.spr.y;
	
	this.times = 10;
};
	Monster.prototype.render = function() {	
		rndX = 0;
		rndY = 0;
		
		if(this.deathA < 1)
		{		
			context.globalAlpha = this.deathA;

			dir = Math.random()*360;
			rad = Math.random()*((1-this.deathA)*90);
			rndX = rad*Math.cos(dir/180*3.14159);
			rndY = rad*Math.sin(dir/180*3.14159);
			
			bkpX = this.spr.x;
			bkpY = this.spr.y;
			
			this.spr.x += rndX;
			this.spr.y += rndY;
					
			this.spr.render();

			context.globalCompositeOperation = "multiply";
					this.spr.render();
					
					context.fillStyle = "#FF0000";
					context.fillRect(this.spr.x,this.spr.y,this.spr.s*this.spr.w,this.spr.s*this.spr.h);
			context.globalCompositeOperation = "source-over";
			
			this.spr.x = bkpX;
			this.spr.y = bkpY;		
			
			context.globalAlpha = 1;
			
			rndX = 0;
			rndY = 0;
		}
		else
		{
			bkpX = this.spr.x;
			bkpY = this.spr.y;
			
			if(curTurn == .4 && timer == 100)
			{
				dir = Math.random()*360;
				rad = Math.random()*20;
				rndX = rad*Math.cos(dir/180*3.14159);
				rndY = rad*Math.sin(dir/180*3.14159);
				
				this.spr.x += rndX;
				this.spr.y += rndY;
			}
			
			this.spr.render();
			
			this.spr.x = bkpX;
			this.spr.y = bkpY;	
		}
		
		context.fillStyle = "#444444";
		context.font = "50px Tahoma";
		context.fillText(this.name + ": Lvl. " + this.lvl, 50+4, 240+4);
		
		context.fillStyle = "#FFFFFF";
		context.fillText(this.name + ": Lvl. " + this.lvl, 50, 240);
		
		rndX *= .25;
		rndY *= .25;
		
		context.fillStyle = "#777777";
		context.fillRect(50+rndX, 260+rndY, 320, 60);
		context.fillStyle = "#FFFFFF";
		context.fillRect(50+rndX, 260+rndY, 320*(this.hp/this.maxHP), 60);
		
		context.fillStyle = "#444444";
		context.fillText("HP: " + Math.round(this.hp) + "/" + this.maxHP, 50+4, 390+4);
		
		context.fillStyle = "#FFFFFF";
		context.fillText("HP: " + Math.round(this.hp) + "/" + this.maxHP, 50, 390);	
	};
	Monster.prototype.update = function() {
		//this.spr.setCenter();
		
		if(this.deathA == 1)
		{
			this.hopDeg += 2;
			if(this.hopDeg > 360)
				this.hopDeg -= 360;
				
			//this.spr.y = this.y + 20*Math.round(2*Math.sin(this.hopDeg/180*3.14159));
			this.spr.y = this.y + 20*Math.sin(this.hopDeg/180*3.14159);
		}
		else
		{
			this.spr.y += (this.y - 100*(1 - this.deathA) - this.spr.y)/3;
		}
		
		if(this.times > 0)
		{
			this.spr.y = 1000;
			
			this.def = getCookie("curDef");
			this.atk = getCookie("curAtk");
			this.expYield = getCookie("curEY");
			this.lvl = getCookie("curLvl");
			this.name = getCookie("curName");
			this.hp = parseInt(getCookie("curHP"));
				this.maxHP = this.hp;
				this.toHP = this.hp;
			this.src = getCookie("curSrc");
			this.spr = new Sprite(this.src,100,100);
			this.spr.setCenter();
			this.spr.scale(400);
			
			this.times -= 1;
		}
	};
	
	


