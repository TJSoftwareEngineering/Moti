# Moti
### JavaScript Graphics Library

![Logo](motilogosmall.png?raw=true "Logo")

### Getting Started With Moti:

Moti.js is design to simplify the loading and drawing of graphics to an HTML5 canvas. To get started all you need is a basic HTML file with a blank body, moti will add the canvas for you. You will also want a seperate JavaScript files with a main() function to handle your drawing logic.

Create new window to render to by creating a new Moti(resX, resY, scale, fps). Scaler should be an integer for best results. Additionally, you can scale the canvas to the window with css. Be aware that non-multiple scaling can result in uneven lines and graphical artifacts.

`let myDemo = new Moti(256,224,2,300);`

### Adding your assets:

All image assets should be loaded before running. do do this use the addTileSet(path,tileSizeX,tileSizeY,columns,rows). For example if we have a tileset/spritesheet with 16x16 tiles and two rows with 8 images in each we could do:
`myDemo.addTileSet('images/spriteSheet.png',16,16,8,2); `

If your image is just a single image, add it with the full resolution with 1 row and column. 

*please note that tilesets should have uniform size and spacing for all tiles. 

### Animations
If your tileset is an animation, or contains an animation, you can use the addAnimation(tileset,startFrame,endframe,running,loop,fps) function to define the properties of your animation. For example:

`myDemo.addAnimation(2, 0, 7, true, true, 8);`
This creates an animation for the tileset stored in array[2] aka the 3rd tileset added, and defines an animation from frame 0 to 7 that is running (true) and looping (true) at 8 fps.

### Initialization & Drawing in Main Loop:
Once all assets are added and animations defined, initialize everything by running the loadAssets() function. Once all assets are loaded, the you need a main() function to handle your drawing logic. If it requires a loop, simply add a requestAnimationFrame loop, for example:

```
function main(){
	if(myDemo.drawCheck()){
		myDemo.clearScreen();
    myDemo.drawSprite(set,tile,x,y,sizeX,sizeY);
		myDemo.drawMap(mapArray,tileSet,x,y);
    myDemo.drawAnimation(animationNum,x,y,sizeX,sizeY);
	}
	var loop = window.requestAnimationFrame(main);
}
```
Here you can see several drawing functions

### clearScreen()
Clears the screen before drawing a new frame

### drawSprite(set,tile,x,y,sizeX,sizeY)
Draws an individual tile from a tileSet. The tile is is the number of the tile sequantially in the set, reading tiles from left to right and top to bottom.  

### drawMap(mapArray,tileSet,x,y)
You can draw an entire array of tiles as a map. A map is a multi-dimensional array, where each element of an array contains another array representing a row of tiles. All tiles used in a map should be stored in the same file.

### drawAnimation(animationNum,x,y,sizeX,sizeY)
Draw an animation at the specified coordinated and scaled size. 


## Work in progress...
