import RenderEngine from './rendering/render-engine.js';
import Room from './objects/structures/room.js';

var myEngine = new RenderEngine(document.querySelector('body'));

var player = {
    position: [120,120]
};

var myRoom = new Room(10,10,330,250);

setTimeout(function (){
    myEngine.startRenderLoop(function (canvas){
        var ctx = canvas.getContext('2d');

        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.fillRect(0,0,canvas.width, canvas.height);

        ctx.fillStyle = 'rgb(200, 0, 0)';
        ctx.fillRect(player.position[0]-1, player.position[1]-1, 4, 4);

        myRoom.render(ctx);
    });
}, 200);

myEngine.canvasElement.addEventListener('click', function (e){
    player.position[0] = e.offsetX;
    player.position[1] = e.offsetY;
});