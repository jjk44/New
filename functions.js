/**
 * Draws a rounded rectangle using the current state of the canvas. 
 * If you omit the last three params, it will draw a rectangle 
 * outline with a 5 pixel border radius 
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate 
 * @param {Number} width The width of the rectangle 
 * @param {Number} height The height of the rectangle
 * @param {Number} radius The corner radius. Defaults to 5;
 * @param {Boolean} fill Whether to fill the rectangle. Defaults to false.
 * @param {Boolean} stroke Whether to stroke the rectangle. Defaults to true.
 */
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == "undefined" ) {
    stroke = true;
  }
  if (typeof radius === "undefined") {
    radius = 5;
  }
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (stroke) {
    ctx.stroke();
  }
  if (fill) {
    ctx.fill();
  }        

}


function Sprite(src, x, y) {
	this.x = x;
	this.y = y;
	
	this.img = new Image;
	this.img.src = src; 
	
	this.s = 1;

	
	this.img.onload = function() 
	{
		setCookie("curWidth",String(this.width),5);
		setCookie("curHeight",String(this.height),5);
	};	
	
	
	this.w = parseInt(getCookie("curWidth"));
	this.h = parseInt(getCookie("curHeight"));
};
	Sprite.prototype.scale = function(wid) {
		this.s = wid/this.w;
	};
	Sprite.prototype.render = function() {
		if(this.s == 1)
			context.drawImage(this.img, this.x, this.y);
		else
			context.drawImage(this.img, this.x, this.y, this.s*this.w, this.s*this.h);
	};
	Sprite.prototype.update = function() {
	};
	Sprite.prototype.setCenter = function() {
		this.x = width/2;// - 100;
		//this.y = 640/2 - this.h*1.1;
	};


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}


function wrapText(context, text, x, y, maxWidth, lineHeight) {
        var cars = text.split("\n");

        for (var ii = 0; ii < cars.length; ii++) {

            var line = "";
            var words = cars[ii].split(" ");

            for (var n = 0; n < words.length; n++) {
                var testLine = line + words[n] + " ";
                var metrics = context.measureText(testLine);
                var testWidth = metrics.width;

                if (testWidth > maxWidth) {
                    context.fillText(line, x, y);
                    line = words[n] + " ";
                    y += lineHeight;
                }
                else {
                    line = testLine;
                }
            }

            context.fillText(line, x, y);
            y += lineHeight;
        }
     }
     

function log(msg) {
    setTimeout(function() {
        throw new Error(msg);
    }, 0);
}




//Updates currentUser's position once
  function getLocation()
  {
  if (geoPosition.init()) {
		geoPosition.getCurrentPosition(success, error);
	}
}
//Continuously updates currentUser's position
function watchPosition()
{
	if (geoPosition.init())
	{
		watchPosition(success,error);
	}
}
function success(p)
{
var currentUser = Parse.User.current();
var location = new Parse.GeoPoint({latitude:p.coords.latitude, longitude:p.coords.longitude});
currentUser.set("Location",location);
currentUser.save(null,null);
}
function error(){}




var mouseX = 0;
var mouseY = 0, mouseYP = 0;
var mouseDown = false;
var mouseDP = false;

document.captureEvents(Event.MOUSEMOVE);
document.onmousemove = getMouseXY;
	function getMouseXY(e) {
		//mouseYP = mouseY;
		mouseX = e.pageX; 
	    mouseY = e.pageY;
	};

window.onmousedown = function() {
	mouseDown = true;
};

window.onmouseup = function() {
	mouseDown = false;
};

