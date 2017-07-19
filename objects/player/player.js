class PlayerMove{
    constructor(x,y){
        this.x = x||0;
        this.y = y||0;
    }

}

function distance(x,y,xx,yy){
    return Math.sqrt(Math.pow(xx-x,2)+Math.pow(yy-y,2));
}
export var PLAYER_MOVEMENT = {
    TELEPORT: 0,
    PATHING: 1
};

export class Player{
    constructor(x,y,speed){
        this.speed = speed||150; //px/s
        this.x = x||0;
        this.y = y||0;
        this.lastUpdate = window.performance.now();
        this.currentMove = undefined;
        this.movementMode = PLAYER_MOVEMENT.PATHING;
    }
    render(ctx){
        if( this.currentMove ){
            ctx.fillStyle = 'rgb(0,200,0)';
            ctx.fillRect(this.currentMove.x-2, this.currentMove.y-2, 4, 4);
        }
        ctx.fillStyle = 'rgb(200,0,0)';
        ctx.fillRect(this.x-2, this.y-2, 4, 4);
    }
    update(objects){
        var diffTime = window.performance.now() - this.lastUpdate;
        if( this.currentMove ){
            if( this.movementMode === PLAYER_MOVEMENT.PATHING ){
                //we need to try to move to the target point
                var remainingDistance = distance(this.x,this.y,this.currentMove.x,this.currentMove.y);
                var maxMovement = this.speed*diffTime/1000;
                var newX, newY, cancelOnComplete;
                if( Math.abs(remainingDistance) > maxMovement ){
                    //we can't move far enough so just move toward the point on a straight line
                    newX = this.x - (maxMovement*(this.x-this.currentMove.x))/remainingDistance;
                    newY = this.y - (maxMovement*(this.y-this.currentMove.y))/remainingDistance; 
                }
                else{
                    //put the player at the target move point
                    newX = this.currentMove.x;
                    newY = this.currentMove.y;
                    cancelOnComplete = true;
                }
                //check if objects collide and stop moving
                var giveUp = false;
                for( var i=0; i<objects.length; i++ ){
                    if( objects[i].doesPathCollide(this.x, this.y, newX, newY) ){
                        giveUp = true;
                        break;
                    }
                }
                if( !giveUp ){
                    this.x = newX;
                    this.y = newY;
                }
                else{
                    cancelOnComplete = true;
                }

                if( cancelOnComplete ){
                    this.currentMove = undefined;
                }
            }
            else{
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
        this.currentMove = new PlayerMove(x,y);
    }
}