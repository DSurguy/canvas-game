import RenderEngine from './rendering/render-engine.js';
import Room from './objects/structures/room.js';
import Player from './objects/player/player.js';

var myEngine = new RenderEngine(document.querySelector('body'));

var myPlayer = new Player(120,120);

var myRoom = new Room(10,10,330,250);

setTimeout(function (){
    myEngine.setUpdateFunction(function (){
        myPlayer.update();
        myRoom.update();
    });
    myEngine.setRenderFunction(function (canvas){
        var ctx = canvas.getContext('2d');

        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.fillRect(0,0,canvas.width, canvas.height);

        myPlayer.render(ctx);

        myRoom.render(ctx);
    })
    myEngine.start();
}, 200);

myEngine.canvasElement.addEventListener('click', function (e){
    myPlayer.pathMove(e.offsetX, e.offsetY);
});