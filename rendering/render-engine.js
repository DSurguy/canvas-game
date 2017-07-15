export default class RenderEngine{
    canvasElement;
    renderFunc;
    requestCancelRenderLoop = false;
    constructor(canvasElement){
        this.canvasElement = canvasElement;
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