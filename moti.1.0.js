// Moti.js © T.J. Myotte 2023

class Moti{
	constructor(x,y,scale = 1,fps = 144){
		this.tileSets = [];
		this.animations = [];
		this.gameWindow = new Screen(x,y, scale);
		this.canvas = document.getElementById('window');
		this.ctx = this.canvas.getContext('2d');
		this.ctx.imageSmoothingEnabled = false;
		this.running = false;
		this.scale = scale;
		
		this.now = Date.now();
		this.then = Date.now();
		this.fps = fps;
		this.target = 1000/fps;
		this.delta = 0;
		this.frameChange = 0;
	}
	
	drawCheck(){
		this.now = Date.now();
		this.delta =  this.now-this.then;
		this.frameChange = this.delta/1000;
		if(this.delta >= this.target){
			this.then = Date.now();
			return true;
		}
		return false;
	}
	
	addTileSet(path,x,y,xn,yn){
		this.tileSets.push(new TileSet(path,x,y,xn,yn));
		this.tileSets[this.tileSets.length - 1].setScale(this.scale);
	}
	
	addAnimation(set, startFrame, endFrame, running, loop, speed){
		this.animations.push(new Animation(set, startFrame, endFrame, running, loop, speed));
	}
	
	loadAssets(){
		var loaded = 0;
		var total = this.tileSets.length;
		for(let i=0; i<total; i++){
			this.tileSets[i].img = new Image();
			this.tileSets[i].img.onload = function(){
				loaded+=1;
				if(loaded == total){
					console.log('Sprite Load Complete!');
					this.running = true;
					this.then = Date.now();
					return main();
				}
			}
			this.tileSets[i].img.src = this.tileSets[i].path;
		}
	}
	
	drawSprite(set,tile,x,y,sx,sy){
		if(tile === -1)return;
		sx = sx || this.tileSets[set].sizeX;
		sy = sy || this.tileSets[set].sizeY;
		var startX = this.tileSets[set].tiles[tile].startX;
		var startY = this.tileSets[set].tiles[tile].startY;
		var drawX = x;
		var drawY = y;
		if(drawX > 0 - this.tileSets[set].scaledSizeX && drawX < this.gameWindow.xRes ){
			this.ctx.drawImage(this.tileSets[set].img, startX, startY, this.tileSets[set].sizeX, this.tileSets[set].sizeY, drawX, drawY, sx, sy);
		}
	}
	
	drawMap(map,set,originX,originY){
		originX = Math.round(originX*this.scale);
		originY = Math.round(originY*this.scale);
		for(var y in map){
			for(var x in map[y]){
				var tile = map[y][x];
				this.drawSprite(set,tile,originX+(this.tileSets[set].scaledSizeX*x),originY+(this.tileSets[set].scaledSizeY*y), this.tileSets[set].scaledSizeX, this.tileSets[set].scaledSizeY);
			}
		}
	}	
	
	drawAnimation(ani,x,y,sx,sy){
		x = Math.floor(x*this.scale);
		y = Math.floor(y*this.scale);
		this.drawSprite(this.animations[ani].set, Math.floor(this.animations[ani].currentFrame), x, y, this.tileSets[this.animations[ani].set].scaledSizeX, this.tileSets[this.animations[ani].set].scaledSizeX);
	}

	changeResolution(x,y,s){
		this.gameWindow.setResolution(x,y,s,this.canvas);
		this.ctx.imageSmoothingEnabled = false;
		if(s != this.scale){
			this.scale = s;
			for(x in this.tileSets){
				this.tileSets[x].setScale(s);
			}
		}
	}
	
	clearScreen(){
		this.ctx.clearRect(0,0,this.gameWindow.xRes, this.gameWindow.yRes);
	}
	
	circle(x,y,r,fill,stroke,fillCol,strokeCol){
		x = Math.floor(x*this.scale);
		y = Math.floor(y*this.scale);
		r = r*this.scale;
		if(fill)this.ctx.fillStyle = fillCol;
		if(stroke)this.ctx.strokeStyle = strokeCol;
		this.ctx.beginPath();
		this.ctx.arc(x,y,r,0,Math.PI);
		if(fill)this.ctx.fill();
		if(stroke)this.ctx.stroke();
	}
	
}




//-------------------------------------------------------------------------------------------------------------

class Screen{
	constructor(x,y,scale){
		this.intResX = x;
		this.intResY = y;
		this.xRes=x*scale;
		this.yRes=y*scale;
		this.scale = scale;
		document.body.innerHTML += "<canvas width="+x*scale+" height="+y*scale+" id='window'>";
		
	}
	
	setResolution(x,y,scale,canvas){
		this.xRes=x*scale;
		this.yRes=y*scale;
		this.scale = scale;
		canvas.width = x*scale;
		canvas.height = y*scale;
	}
}

//-------------------------------------------------------------------------------------------------------------
class TileSet{
	constructor(path,x,y,xn,yn){
		this.tiles = []
		this.path = path;
		this.sizeX = x;
		this.sizeY = y;
		this.cols = xn;
		this.rows = yn;
		this.img = new Image();
		this.scaledSizeX = 0;
		this.scaledSizeY = 0;
		this.createTiles();
	}
	
	createTiles(){
		for(let i = 0; i < this.rows; i++){
			for(let j = 0; j < this.cols; j++){
				var startY = i*this.sizeY;
				var startX = j*this.sizeX;
				this.tiles.push(new Tile(startX, startY, this.sizeX, this.sizeY));
			}
		}
	}
	
	setScale(scale){
		this.scaledSizeX = this.sizeX*scale;
		this.scaledSizeY = this.sizeY*scale;
	}
}

//-------------------------------------------------------------------------------------------------------------

class Tile{
	constructor(startX, startY, sizeX, sizeY){
		this.startX = startX;
		this.startY = startY;
		this.sizeX = sizeX;
		this.sizeY = sizeY;
	}
}

//-------------------------------------------------------------------------------------------------------------

class Animation{
	constructor(set, startFrame, endFrame, running, loop, speed){
		this.set = set;
		this.startFrame = startFrame;
		this.endFrame = endFrame;
		this.running = running;
		this.loop = loop;
		this.speed = speed;
		this.currentFrame = 0;
		
	}
}