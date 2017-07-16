export default class RenderEngine{
    constructor(container, size){
        this.renderFunc = function (){};
        this.updateFunc = function (){};
        this.requestCancelRenderLoop = false;
        this.canvasElement = document.createElement('canvas');
        size = size || {};
        this.canvasElement.width = size.width || size.w || size.x || 640;
        this.canvasElement.height = size.height || size.h || size.y || 480;
        container.appendChild(this.canvasElement);
        this.lastFrameTime = undefined;
    }

    setUpdateFunction(f){
        this.updateFunc = f;
    }
    setRenderFunction(f){
        this.renderFunc = f;
    }

    start (){
        this.renderLoop();
    }

    renderLoop (){
        requestAnimationFrame((frameTime) => {
            if( this.lastFrameTime === undefined ){
                this.lastFrameTime = frameTime;
            }
            else if( frameTime > this.lastFrameTime + (1000 / 60) ){
                this.renderFunc(this.canvasElement);
                this.lastFrameTime = frameTime;
            }
            else{
                this.updateFunc();
            }
            this.renderLoop();
        });
    }
};