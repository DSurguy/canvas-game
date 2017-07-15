import RenderEngine from './rendering/render-engine.js';

var myEngine = new RenderEngine(document.querySelector('body'));

setTimeout(function (){
    var point = [0,0];
    myEngine.startRenderLoop(function (canvas){
        var ctx = canvas.getContext('2d');

        ctx.fillStyle = 'rgb(200, 0, 0)';
        ctx.fillRect(point[0]++, point[1]++, 50, 50);
    });
}, 200);