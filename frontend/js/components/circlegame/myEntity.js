

import singleGrape from '../../../res/single-grape.jpg'


function massToRadius(mass)
{
    return  Math.floor(Math.pow(mass,1/2))
}

class MyEntity  {
    constructor(pos, vel, mass, color='hsl(' + 360 * Math.random() + ', 100%, 60%)', fixed=false) {
      this.xpos  = pos.xpos
      this.ypos = pos.ypos
      this.fixed = fixed
      this.xvel  = (fixed)?0:vel.xvel
      this.yvel = (fixed)?0:vel.yvel
      this.mass = mass
      this.r = massToRadius(mass)
      this.color = color
      this.drawEnable = true
      this.enable = true
    }

    updatePos(xpos,ypos){
        if(this.fixed){
            return
        }
        this.xpos = xpos
        this.ypos = ypos
        // if(this.xpos < -50 || this.xpos > 1300 || this.ypos < -50 || this.ypos > 780 ){
        //     this.drawEnable = false
        // }
    }

    directionTo(otherEntity){
        let dx = (otherEntity.xpos + otherEntity.r) - (this.xpos + this.r)
        let dy = (otherEntity.ypos + otherEntity.r) - (this.ypos + this.r)
        return {dx,dy}
    }

    distanceTo(otherEntity)
    {
        let pos = this.directionTo(otherEntity)
        let mag = Math.hypot(pos.dx,pos.dy)
        let unit = {x: pos.dx/mag, y: pos.dy/mag}
        return {unit,mag}
    }

    applyForce(dTo,otherMass,k=.028,rFallOff=1.4){
        if(this.fixed){
            return
        }

        let f = (k * this.mass  * otherMass) /  Math.pow(dTo.mag,rFallOff)

        this.xvel += (dTo.unit.x * f) / this.mass
        this.yvel += (dTo.unit.y * f) / this.mass
    }

    absorb(otherEntity){
        let largerEntity = (this.mass > otherEntity.mass)?this:otherEntity;
        let smallerEntity = (largerEntity == this)?otherEntity:this;
        let originalMass = largerEntity.mass
        largerEntity.mass = originalMass + smallerEntity.mass
        largerEntity.xvel = ((smallerEntity.mass*smallerEntity.xvel)+(originalMass*largerEntity.xvel))/(largerEntity.mass)
        largerEntity.yvel = ((smallerEntity.mass*smallerEntity.yvel)+(originalMass*largerEntity.yvel))/(largerEntity.mass)
        largerEntity.r = massToRadius(largerEntity.mass)
        smallerEntity.enable = false
        smallerEntity.drawEnable = false
    }

    draw(ctx,win){
        if(this.drawEnable){
            ctx.beginPath();

            let offsetX = win.maxWidth*(1 - (1/win.scale))/2
            let offsetY = win.maxHeight*(1 - (1/win.scale))/2
            ctx.arc((this.xpos+this.r)/win.scale+offsetX+win.x, (this.ypos+this.r)/win.scale+offsetY+win.y, (this.r)/win.scale, 0, 2  * Math.PI)
            ctx.fillStyle = this.color
            ctx.fill();

            
            // var img = new Image();
            // img.src = singleGrape;
            // ctx.drawImage(img, this.xpos+this.r, this.ypos+this.r,this.r,this.r);


        }
    }
  }

  export default MyEntity;