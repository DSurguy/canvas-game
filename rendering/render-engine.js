export default class RenderEngine{
    constructor(container, size){
        this.renderFunc = function(){};
        this.requestCancelRenderLoop = false;
        this.canvasElement = document.createElement('canvas');
        size = size || {};
        this.canvasElement.width = size.width || size.w || size.x || 640;
        this.canvasElement.height = size.height || size.h || size.y || 480;
        container.appendChild(this.canvasElement);
    }

    startRenderLoop (f){
        this.renderFunc = f;
        this.renderLoop();
    }

    renderLoop (){
        if( this.requestCancelRenderLoop ){ 
            this.requestCancelRenderLoop = false;
        }
        requestAnimationFrame(() => {
            if( this.requestCancelRenderLoop ){ 
                this.requestCancelRenderLoop = false;
            }
            this.renderFunc(this.canvasElement);
            if( this.requestCancelRenderLoop ){ 
                this.requestCancelRenderLoop = false;
            }
            this.renderLoop();
        }, 16.67);
    }
};