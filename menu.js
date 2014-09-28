var curMenu = 0;
	var oldMenu = 0;
var toMenu = 0;
var percMenu = 1;
var percBattle = 0;

var bgDeg = 0;
var bgW = 0;
var bg2Deg = 0;
var bg2W = 0;

var genItem = 0;


var bgC = [0, 0, 0];
	var bg0C = [138, 78, 87];
	var bg1C = [78, 87, 138];
	var bg2C = [78, 138, 87];

var fgC = [0, 0, 0];
	var fg0C = [94, 41, 49];
	var fg1C = [41, 49, 94];
	var fg2C = [41, 94, 49];

var tgC = [0, 0, 0];
	var tg0C = [110, 57, 65];
	var tg1C = [57, 65, 110];
	var tg2C = [57, 110, 65];

function Menu() {    
	//Menu 0
    	this.btn1 = new MenuButton(0,1,"Inventory", "Display the user's inventory and use items.\n\nIf you're at home, you can store valuable items for safekeeping, or clear up space.", 100, 50, 400, 150, "#402327","#301317");
    	this.btn2 = new MenuButton(0,2,"Stats", "Display the user's stats and magic.\n\nHealth, attack, defense, level.", 100, 50+150+50, 400, 150, "#402327","#301317");
    //Menu 1
    	this.btn4 = new MenuButton(1,0,"Return", "Return to the main menu.", 100, 150+150+100, 400, 130, "#272340","#131730");
   	//Menu 2
   		this.btn3 = new MenuButton(2,0,"Return", "Return to the main menu.", 100, 150+150+100, 400, 130, "#234027","#133017");
   		
   		this.btnE = new MenuButton(0,3,"Fight!!", "There is an enemy! Click here to engage!", 100, 50+2*150+2*50, 400, 130, "#234027","#133017");
   		
   	this.inv = new Inventory();
   	this.stt = new Stats();
}
	Menu.prototype.render = function() {
		curBG = bgC;
		toBG = bgC;
				
		switch(oldMenu)
		{
			case 0: curBG = bg0C;
					curFG = fg0C;
					curTG = tg0C;
					break;
			case 1: curBG = bg1C;
					curFG = fg1C;
					curTG = tg1C;
					break;
			case 2: curBG = bg2C;
					curFG = fg2C;
					curTG = tg2C;
					break;
		}
		
		switch(toMenu)
		{
			case 0: toBG = bg0C;
					toFG = fg0C;
					toTG = tg0C;
					break;
			case 1: toBG = bg1C;
					toFG = fg1C;
					toTG = tg1C;
					break;
			case 2: toBG = bg2C;
					toFG = fg2C;
					toTG = tg2C;
					break;
		}
		
		
		bgC[0] = Math.round(curBG[0]*percMenu + toBG[0]*(1 - percMenu));
			bgC[1] = Math.round(curBG[1]*percMenu + toBG[1]*(1 - percMenu));
			bgC[2] = Math.round(curBG[2]*percMenu + toBG[2]*(1 - percMenu));
		fgC[0] = Math.round(curFG[0]*percMenu + toFG[0]*(1 - percMenu));
			fgC[1] = Math.round(curFG[1]*percMenu + toFG[1]*(1 - percMenu));
			fgC[2] = Math.round(curFG[2]*percMenu + toFG[2]*(1 - percMenu));
		tgC[0] = Math.round(curTG[0]*percMenu + toTG[0]*(1 - percMenu));
			tgC[1] = Math.round(curTG[1]*percMenu + toTG[1]*(1 - percMenu));
			tgC[2] = Math.round(curTG[2]*percMenu + toTG[2]*(1 - percMenu));
			
		context.fillStyle = "#000000";
		context.font = "50px Tahoma";
		
		context.fillStyle = "rgba(" + bgC[0] + "," + bgC[1] + "," + bgC[2] + ",1)";//"rgba(138, 78, 87, 1)";
	    context.fillRect(0, 0, width, height);
	    
	    
	    context.fillStyle = "rgba(" + fgC[0] + "," + fgC[1] + "," + fgC[2] + ", 1)";
	    context.fillRect(0, 0, bg2W, height);
	        
	    context.fillStyle = "rgba(" + tgC[0] + "," + tgC[1] + "," + tgC[2] + ",.8)";
	    context.fillRect(0, 0, bgW, height);
	    
	   	context.fillStyle = "rgba(" + fgC[0] + "," + fgC[1] + "," + fgC[2] + ", 1)";
	   	context.font = "100px Tahoma";
	   	context.fillText("TRAVELER", 550, 170);
	   	
	   	context.fillStyle = "rgba(" + tgC[0] + "," + tgC[1] + "," + tgC[2] + ", .8)";
	   	context.font = "100px Tahoma";
	   	context.fillText("TRAVELER", 550 + 5*Math.cos(bgDeg/180*3.14159), 170 + 5*Math.sin(bgDeg/180*3.14159));

	    
	    icon.render();
	    
	    		this.stt.render();

	    
		this.inv.render();
		this.btn1.render();
		this.btn2.render();
		this.btn3.render();
		this.btn4.render();
		this.btnE.render();
		
		
		
		context.fillStyle = "rgba(0,0,0,"+ percBattle +")";
	    context.fillRect(0, 0, width, height);
	};
	Menu.prototype.update = function() {
		if(curMenu == -1) {
			percMenu += (0 - percMenu)/20;
			
			if(percMenu < .05) {
				percMenu = 1;
				curMenu = toMenu;
				oldMenu = toMenu;
			}
		}
		if(curMenu == 3)
		{
			percBattle += (1 - percBattle)/10;
			
			if(Math.abs(1 - percBattle) < .001)
			{
				setCookie("room", "1", 5);
				curMenu = 0;
				enemyPresent = false;
				this.btnE.x = -800;
			}
		}
		else
		{
			percBattle += (0 - percBattle)/10;
			
			if(percBattle < .05)
				percBattle = 0;
		}

		
		this.btn1.update();
		this.btn2.update();
		this.btn3.update();
		this.btn4.update();
		this.btnE.update();
		
		this.stt.update();
		
		icon.update();
    
	    bgW += (400 + 15*Math.sin(bgDeg/180*3.14159) - bgW)/15;
	    bg2W += (400 + 30*Math.sin(bg2Deg/180*3.14159 + 50) - bgW)/15;
	    
	    bgDeg += 1;
	    if(bgDeg > 360)
	    	bgDeg -= 360;
	    bg2Deg += 1;
	    if(bg2Deg > 360)
	    	bg2Deg -= 360;
	};


function MenuButton(num, toNum, name, description, x, y, w, h, c1, c2) {
	this.num = num;
	this.toNum = toNum;
	
	this.name = name;
	this.description = description;
	this.canSelect = false;
	
	this.x = btnOffX;
		this.toX = x;
		this.exX = 0;
		
	if(toNum == 3)
		this.x = -800;
	
	this.y = y;
	this.w = w;
	this.h = h;
	
	this.z = 1.5;
	this.zDeg = 0;
	
	this.grd = context.createLinearGradient(0,y,0,y+h);
		this.grd.addColorStop(0,c1);
		this.grd.addColorStop(1,c2);
		
	this.lGrd = context.createLinearGradient(0,y,0,y+h);
		this.lGrd.addColorStop(0,"rgba(240, 240, 240, .2)");
		this.lGrd.addColorStop(1,"rgba(160, 160, 160, .2)");
}
	MenuButton.prototype.render = function() {
		var dX = this.x + this.exX;
		var dY = this.y;
		
		
		//Draw MenuButton Shadow
		context.fillStyle = "rgba(41, 21, 24, .5)";//"#291518";    	
    	roundRect(context, dX + 30*this.z*(dX + this.w/2 - width/2)/(width/2), dY + 20, this.w, this.h, 16, true, false);
    	
    	dX += -5*(this.z - 1.5)*(dX + this.w/2 - width/2)/(width/2);
    	dY += -5*(this.z - 1.5);
    	
    	//Draw MenuButton
    	context.fillStyle = this.grd;
    	roundRect(context, dX, dY, this.w, this.h, 16, true, false); 
		
		//Draw MenuButton Text
		context.font = "70px Tahoma";
		context.fillStyle = "#FFFFFF";
		context.fillText(this.name, dX + 40 + 20*(dX + this.w/2 - width/2)/(width/2), dY + this.h*.55);
		


		if(curMenuButton == this)
		{	
			context.fillStyle = this.lGrd;//"rgba(255, 255, 255, " + .1*this.exX/50 + ")";    	
			roundRect(context, dX, dY, this.w, this.h, 16, true, false);    
			
			
			context.font = "40px Tahoma";
			context.fillStyle = "rgba(41, 21, 24, .5)";
			wrapText(context, this.description, width/2+4, 270+4, width/2, 50);
			
			
			context.font = "40px Tahoma";
			context.fillStyle = "#FFFFFF";
			wrapText(context, this.description, width/2, 270, width/2, 50);
		}
	};
	MenuButton.prototype.update = function() {
		if(curMenu == this.num)
		{
			if(this == menu.btnE)
				if(!enemyPresent)
				{
					this.x += (-500 - this.x)/20;
					return;
				}
			this.x += (this.toX - this.x)/20;
			
			if(curMenuButton == this)
				this.exX += (50 - this.exX)/10;
			else if(this.exX > 0)
			{
				this.canSelect = false;
				this.exX += (0 - this.exX)/10;
				
				if(this.exX < .5)
					this.exX = 0;
			}
				
			if(curMenu == this.num && (mouseX > this.x && mouseX < this.x+this.w && mouseY > this.y && mouseY < this.y+this.h))
			{
				if(mouseDown)
				{
					if(!this.canSelect)
					{
							curMenuButton = this;
							menu.inv.selInd = -1;
					}
					else
					{
						oldMenu = curMenu;
						curMenu = -1;
						toMenu = this.toNum;
						curMenuButton = null;
						this.canSelect = false;
					}
				}
				else if(curMenuButton == this)
					this.canSelect = true;
			}
			else
			{
				if(mouseDown)
				{
					this.canSelect = false;
					
					if(curMenuButton == this)
						curMenuButton = null;
				}
			}
		}
		else
		{
			if(this == menu.btnE)
				if(!enemyPresent)
					return;
				
			this.x += (btnOffX - this.x)/20;
			this.exX += (0 - this.exX)/10;
			
			if(this.exX < .5)
					this.exX = 0;
		}
		
				
		this.zDeg += 2;
		if(this.zDeg > 360)
			this.zDeg -= 360;
		this.z = 1.5;//1.5 + .5*Math.sin(this.zDeg/180*3.14159);
		
		//delete this.lGrd;
		//this.lGrd = context.createLinearGradient(0,y,0,y+h);
			this.lGrd.addColorStop(0,"rgba(240, 240, 240," + .2*(.75 + .7*Math.sin(this.zDeg/180*3.14159))*this.exX/50);
			this.lGrd.addColorStop(1,"rgba(100, 100, 100," + .2*(.75 + .7*Math.sin(this.zDeg/180*3.14159))*this.exX/50);
	};
	
	
function Stats() {
	alph = 0;
	
	this.map = new Sprite("Img/map.PNG",500, 200);
};
	Stats.prototype.render = function() {
		context.globalAlpha = alph;
			this.map.render();
		context.globalAlpha = 1;

		
		dY = 200;
		
		context.fillStyle = "rgba(255,255,255, " + alph + ")";
	   	context.font = "50px Tahoma";
	   	context.fillText("Health: " + curHP + "/" + curMaxHP, 100, dY);
	   	context.fillText("Attack: " + (curArmor[0]+curWeapon[0]+curHat[0]), 100, dY+50);
	   	context.fillText("Defense: " + (curArmor[1]+curWeapon[1]+curHat[1]), 100, dY+100);

		//context.fillStyle = "rgba(" + tgC[0] + "," + tgC[1] + "," + tgC[2] + ", " + alph + ")";
	   	//context.fillRect(600, dY-45, 200, 50);
	   	
		//context.fillStyle = "rgba(255,255,255, " + alph + ")";
	   	//context.fillRect(600, dY-45, 200*(curHP/curMaxHP), 50);
	};
	Stats.prototype.update = function() {
		if(curMenu == 2)
			alph += (1 - alph)/12;
		else
		{
			alph += (0 - alph)/12;
			
			if(alph < .01)
				alph = 0;
		}
	};
	
	
var ownedItems = [];
function Inventory() {
	this.alph = 0;
	
	this.updateInventory();
	
	this.selInd = -1;
	this.strtY = 0;
	this.ySpd = 0;
	
	this.hatInd = -1;
		this.hatName = "";
	this.weaponInd = -1;
		this.weaponName = "";
	this.armorInd = -1;
		this.armorName = "";
	
	this.hasDragged = false;
	this.dragDis = 0;
	
	end = 1.2;
	
	less = 160;
	
	this.times = 10;
	
	this.sGrd = context.createLinearGradient(0,0,0,640);
		this.sGrd.addColorStop(0,"rgba(255, 255, 255, 0)");
			this.sGrd.addColorStop(.05*end,"rgba(255, 255, 255, .2)");
			this.sGrd.addColorStop(.2*end,"rgba(255, 255, 255, .6)");
			this.sGrd.addColorStop(.25*end,"rgba(255, 255, 255, .8)");
			this.sGrd.addColorStop(.3*end,"rgba(255, 255, 255, .6)");
			this.sGrd.addColorStop(.45*end,"rgba(255, 255, 255, .2)");
		this.sGrd.addColorStop(.5*end,"rgba(255, 255, 255, 0)");
	
	this.haGrd = context.createLinearGradient(0,0,0,640);
		this.haGrd.addColorStop(0,"rgba(" + less + ", 255, " + less + ", 0)");
			this.haGrd.addColorStop(.05*end,"rgba(" + less + ", 255, " + less + ", .2)");
			this.haGrd.addColorStop(.2*end,"rgba(" + less + ", 255, " + less + ", .6)");
			this.haGrd.addColorStop(.25*end,"rgba(" + less + ", 255, " + less + ", .8)");
			this.haGrd.addColorStop(.3*end,"rgba(" + less + ", 255, " + less + ", .6)");
			this.haGrd.addColorStop(.45*end,"rgba(" + less + ", 255, " + less + ", .2)");
		this.haGrd.addColorStop(.5*end,"rgba(" + less + ", 255, " + less + ", 0)");
	
	this.swGrd = context.createLinearGradient(0,0,0,640);
		this.swGrd.addColorStop(0,"rgba(255, " + less + ", " + less + ", 0)");
			this.swGrd.addColorStop(.05*end,"rgba(255, " + less + ", " + less + ", .2)");
			this.swGrd.addColorStop(.2*end,"rgba(255, " + less + ", " + less + ", .6)");
			this.swGrd.addColorStop(.25*end,"rgba(255, " + less + ", " + less + ", .8)");
			this.swGrd.addColorStop(.3*end,"rgba(255, " + less + ", " + less + ", .6)");
			this.swGrd.addColorStop(.45*end,"rgba(255, " + less + ", " + less + ", .2)");
		this.swGrd.addColorStop(.5*end,"rgba(255, " + less + ", " + less + ", 0)");
	
	this.weGrd = context.createLinearGradient(0,0,0,640);
		this.weGrd.addColorStop(0,"rgba(" + less + ", " + less + ", 255, 0)");
			this.weGrd.addColorStop(.05*end,"rgba(" + less + ", " + less + ", 255, .2)");
			this.weGrd.addColorStop(.2*end,"rgba(" + less + ", " + less + ", 255, .6)");
			this.weGrd.addColorStop(.25*end,"rgba(" + less + ", " + less + ", 255, .8)");
			this.weGrd.addColorStop(.3*end,"rgba(" + less + ", " + less + ", 255, .6)");
			this.weGrd.addColorStop(.45*end,"rgba(" + less + ", " + less + ", 255, .2)");
		this.weGrd.addColorStop(.5*end,"rgba(" + less + ", " + less + ", 255, 0)");
};
	Inventory.prototype.updateInventory = function() {
		//This will iterate through a user's items
		var Items = Parse.Object.extend("Items");
		var inventory = currentUser.get("Inventory");
		var sword = null;
		query = new Parse.Query(Items);
		
		var curA = currentUser.get("Armour");
		var curH = currentUser.get("Hats");
		var curW = currentUser.get("Weapon");
		
		k = 0;
		
		setCookie("hatInd","-1",5);
		setCookie("weaponInd","-1",5);
		setCookie("armorInd","-1",5);
		
		query.find({
			success:function(results) {
				for (var i = 0, len = inventory.length; i < len; i++)
				{
					for (var b = 0, bb = results.length; b < bb; b++)
					{
						if (results[b].id == inventory[i])
						{
							sword = results[b];
							ownedItems.push(sword);
														
							if(curA == sword.id)
							{
								this.armorInd = i;
									setCookie("armorInd",String(i),5);
							}
							else if(curW == sword.id)
							{
								this.weaponInd = i;
									setCookie("weaponInd",String(i),5);
								this.weaponName = sword.get("Name");
								curWeapon = [sword.get("ATK"), sword.get("DEF")];
							}
							else if(curH == sword.id)
							{
								this.hatInd = i;
									setCookie("hatInd",String(i),5);
							}
							
							k += 1;
							
							break;
						}
					}
							//sword.get(...)
							//Description
							//ATK - Attack value
							//DEF - Defence value
							//Class - 0 for weapon, 1 for armour, 2 for hats
							//Picture .url()
				}
			}});
	};
	Inventory.prototype.render = function() {
		if(this.times > 0)
		{
			this.hatInd = parseInt(getCookie("hatInd"));
				if(this.hatInd != -1)	
				{		
					o = ownedItems[this.hatInd];
					this.hatName = o.get("Name");
					curHat = [o.get("ATK"), o.get("DEF")];	
				}
			this.weaponInd = parseInt(getCookie("weaponInd"));
				if(this.weaponInd != -1)	
				{		
					o = ownedItems[this.weaponInd];
					this.weaponName = o.get("Name");
					curWeapon = [o.get("ATK"), o.get("DEF")];	
				}
			this.armorInd = parseInt(getCookie("armorInd"));
				if(this.armorInd != -1)	
				{		
					o = ownedItems[this.armorInd];
					this.armorName = o.get("Name");
					curArmor = [o.get("ATK"), o.get("DEF")];	
				}
				
			this.times -= 1;
		}
		
		if(curMenu == 1)
			this.alph += (1 - this.alph)/12;
		else
		{
			this.alph += (0 - this.alph)/12;
			
			if(this.alph < .01)
				this.alph = 0;
		}
		
		if(this.alph == 0)
			return;
		
		context.globalAlpha = this.alph;

		context.fillStyle = this.sGrd;//"#FFFFFF";
		
		hei = 70;		
		subt = 50;
		
		lX = 100;
		
		context.font = hei + "px Tahoma";

		
		for(i = 0; i < ownedItems.length; i++)
		{
			if(100+i*hei-this.strtY < 0)
				continue;
			if(100+i*hei-this.strtY > 420)
				break;
			
			name = ownedItems[i].get("Name");
			desc = ownedItems[i].get("Description");
			cls = ownedItems[i].get("Class");
			atk = ownedItems[i].get("ATK");
			def = ownedItems[i].get("DEF");
			
			img = new Image();
			img.src = ownedItems[i].get("Picture").url;
			
			context.fillStyle = "#FFFFFF";
			
			if(this.selInd != i)
			{
				if(this.hatInd == i)
					context.fillStyle = this.haGrd;
				else if(this.weaponInd == i)
					context.fillStyle = this.weGrd;	
				else if(this.armorInd == i)
					context.fillStyle = this.swGrd;	
				else
					context.fillStyle = this.sGrd;	
			}
			else
			{
				if(this.armorInd == i || this.hatInd == i || this.weaponInd == i)
				{
					context.fillStyle = "#FFFFFF";
					context.font = hei + "px Tahoma";
					context.fillText("EQUIPPED", 600,500);
				}
				
				context.fillStyle = "#FFFFFF";
			}
			context.font = hei + "px Tahoma";

			context.fillText(name, lX+60, 100 + i*hei - this.strtY);
			context.drawImage(img, lX, 100 + i*hei  - this.strtY - 50, hei-10, hei-10);
			
			delete img;
			
			if(mouseX > lX && mouseX < 550 && mouseY > 100+i*hei-this.strtY-subt && mouseY < 100+i*hei-this.strtY+hei - subt)
				if(!mouseDown && mouseDP && !this.hasDragged)
				{
					if(this.selInd != i)
					{
						this.selInd = i;
						menu.btn4.canSelect = false;
						curMenuButton = null;
					}
					else
					{					
						if(cls == 2)
						{
							this.hatInd = i;
							this.hatName = name;
							curHat = [atk, def];
							
							currentUser.set("Hats",ownedItems[i].id);
						}
						else if(cls == 1)
						{
							this.armorInd = i;
							this.armorName = name;
							curArmor = [atk, def];
							
							currentUser.set("Armour",ownedItems[i].id);
						}
						else if(cls == 0)
						{
							this.weaponInd = i;
							this.weaponName = name;
							curWeapon = [atk, def];
							
							currentUser.set("Weapon",ownedItems[i].id);
						}
						
						currentUser.save(null, {
							success: function(result){
							},
							error: function(user, error){
							}
						});
					}
				}
					
			if(this.selInd == i)
			{	
				context.font = "40px Tahoma";
				context.fillStyle = "rgba(41, 21, 24, .5)";
				wrapText(context, desc, width/2+4, 270+4, width/2, 50);
				
				
				context.font = "40px Tahoma";
				context.fillStyle = "#FFFFFF";
				wrapText(context, desc, width/2, 270, width/2, 50);
			}
		}
		
		
		if(mouseDown)
		{
			this.strtY -= (mouseY - mouseYP);
			this.dragDis += Math.abs(mouseY - mouseYP);
			
			if(this.dragDis > 10)
				this.hasDragged = true;
		}
		else if(!mouseDP)
		{
			this.hasDragged = false;
			this.dragDis = 0;
		}
		
		mouseYP = mouseY;
		mouseDP = mouseDown;
		
		context.globalAlpha = 1;
	};


/*window.addEventListener("keydown", function (event) {
    keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function (event) {
    delete keysDown[event.keyCode];
});*/

