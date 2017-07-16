import RenderEngine from './rendering/render-engine.js';
import Room from './objects/structures/room.js';
import {Player, PLAYER_MOVEMENT} from './objects/player/player.js';

var myEngine = new RenderEngine(document.querySelector('body'));

var myPlayer = new Player(120,120);

var myRoom = new Room(160, 120, 480, 360);

setTimeout(function (){
    myEngine.setUpdateFunction(function (){
        myPlayer.update([myRoom]);
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
    e.preventDefault();
    e.stopPropagation();
});

document.querySelectorAll('input').forEach(function (element){
    element.addEventListener('change', function (e){
        if( this.checked && this.value == "0" ){
            myPlayer.movementMode = PLAYER_MOVEMENT.TELEPORT;
        }
        else if( this.checked && this.value == "1" ){
            myPlayer.movementMode = PLAYER_MOVEMENT.PATHING;
        }
    });
});