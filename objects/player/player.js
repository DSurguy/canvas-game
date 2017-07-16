class PlayerMove{
    constructor(x,y){
        this.x = x||0;
        this.y = y||0;
    }

}

function distance(x,y,xx,yy){
    return Math.sqrt(Math.pow(xx-x,2)+Math.pow(yy-y,2));
}

export default class Player{
    constructor(x,y,speed){
        this.speed = speed||150; //px/s
        this.x = x||0;
        this.y = y||0;
        this.lastUpdate = window.performance.now();
        this.currentMove = undefined;
    }
    render(ctx){
        if( this.currentMove ){
            ctx.fillStyle = 'rgb(0,200,0)';
            ctx.fillRect(this.currentMove.x-2, this.currentMove.y-2, 4, 4);
        }
        ctx.fillStyle = 'rgb(200,0,0)';
        ctx.fillRect(this.x-2, this.y-2, 4, 4);
    }
    update(){
        var diffTime = window.performance.now() - this.lastUpdate;
        if( this.currentMove ){
            //we need to try to move to the target point
            var remainingDistance = distance(this.x,this.y,this.currentMove.x,this.currentMove.y);
            var maxMovement = this.speed*diffTime/1000;
            if( Math.abs(remainingDistance) > maxMovement ){
                //we can't move far enough so just move toward the point on a straight line
                this.x = this.x - (maxMovement*(this.x-this.currentMove.x))/remainingDistance;
                this.y = this.y - (maxMovement*(this.y-this.currentMove.y))/remainingDistance; 
            }
            else{
                //put the player at the target move point
                this.x = this.currentMove.x;
                this.y = this.currentMove.y;
                this.currentMove = undefined;
            }
        }
        this.lastUpdate = window.performance.now();
    }
    move(x,y){
        this.x = x;
        this.y = y;
    }
    pathMove(x,y){
        //TODO: collision avoidance
        this.currentMove = new PlayerMove(x,y);
    }
}