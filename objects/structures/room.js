export default class Room{
    constructor(x,y,xx,yy){
        //x,y,xx,yy
        this.bounds = [x||0,y||y,xx||0,yy||0];
        this.changed = true;
    }
    render(ctx){
        //TODO: Convert to path and stroke
        //draw borders with 2px width
        ctx.fillStyle = 'rgb(0,0,0)';
        //top
        ctx.fillRect(this.bounds[0]-1, this.bounds[1]-1, this.bounds[2]-this.bounds[0]+1, 2);
        //right
        ctx.fillRect(this.bounds[2]-1, this.bounds[1]-1, 2, this.bounds[3]-this.bounds[1]+1);
        //bottom
        ctx.fillRect(this.bounds[0]-1, this.bounds[3]-1, this.bounds[2]-this.bounds[0]+1, 2);
        //left
        ctx.fillRect(this.bounds[0]-1, this.bounds[1]-1, 2, this.bounds[3]-this.bounds[1]+1);
    }
    update(){}
    doesPathCollide(x,y,xx,yy){
        //check if the start point is inside and end point is outside
        // or vice versa
        var startInside = this.isPointInside(x,y),
            endInside = this.isPointInside(xx,yy);
        if( (startInside && !endInside) || (!startInside && endInside) ){
            return true;
        }
        return false;
    }
    isPointInside(x,y){
        var xInside = false, yInside = false;
        if( (this.bounds[0] <= x && x <= this.bounds[2])
        || (this.bounds[0] >= x && x >= this.bounds[2]) ){
            xInside = true;
        }
        if( (this.bounds[1] <= y && y <= this.bounds[3])
        || (this.bounds[1] >= y && y >= this.bounds[3]) ){
            yInside = true;
        }
        return xInside && yInside;
    }
}