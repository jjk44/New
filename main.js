setCookie("room","0",5);

var curHat = [0, 0];
var curArmor = [0, 0];
var curWeapon = [0, 0];

var curExp = 0;

enemyPresent = false;

watchPos();


var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
var canvas = document.createElement("canvas");
var width = 1136;
var height = 640;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');

var btnOffX = width*1.15;


//Menu Junk
var menu = new Menu();
var curMenuButton = null;
var icon = new Sprite("Img/icon.png", 220, 50);


//Battle Junk
var battle = new Battle();
var reIcon = new Sprite("Img/reIco.png", 120, 420);
var swIcon = new Sprite("Img/swIco.png", 525, 420);
var shIcon = new Sprite("Img/shIco.png", 800, 420);



var render = function () {
};

var update = function () {
};

var step = function () {
	if(getCookie("room") == "0") {
	    menu.update();
    	menu.render();
    }
    else if(getCookie("room") == "1") {
    	battle.update();
    	battle.render();
    }
    
    animate(step);
};



document.body.appendChild(canvas);
animate(step);
