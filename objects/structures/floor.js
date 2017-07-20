import Room from './room.js';

/* General Floor Generation Algorithm
   
    1. Generate an initial room
    [Loop]
    2. Choose an unprocessed room wall
    3. Choose a point at least {doorSize}+1 away from each side
        3a. If point selection fails, mark processed and goto [Loop]
    4. Randomly choose a size for the new room based on constraints (not exceeding sides of map, minimum area of 20 when generated)
    5. Extend the rect away from the current wall randomly up or down (or left/right depending on perspective)
    [Loop 2]
    6. Check the new rect to see if it overlaps any other rects (fully inside another, fully enveloping another or overlapping)
        sharing walls is fine
        6a. If overlapping, reduce size of current rect to overlap point closest to rect origin point, return to [Loop 2]
    7. If the new room would be too close to the map boundary based on the buffer, reduce size to fix that.
    8. If the new room that got generated is below the min size for a room, mark the current wall as processed and discard the new room
    9. If there are unprocessed walls, return to [Loop]
    10. Once all walls on room[0] are processed, move to room[1] and go to [Loop] until all room walls are processed

    This isn't even close to perfect, but it's a good starting point.
*/

export class Floor{
    constructor(width, height, minSize, buffer, doorSize){
        this.width = width||10;
        this.height = height||10;
        this.buffer = buffer||10;
        this.minSize = minSize||20;
        this.doorSize = doorSize||5;
        this.rooms = [];
    }

    generateLayout(){
        //we aim for 50% coverage
        var maxArea = this.width*this.height;
        var curArea = 0;
        //start at the center
        var rectOrigin = {
            x: this.width/2,
            y: this.height/2
        };

        var tempRooms = [];

        while ( true ){
            //we plan to generate a rect from the current point
            //check to see which direction this point can go
            break;
        }
    }
}