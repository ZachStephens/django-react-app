
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

    applyForce(dTo,otherMass,k=.78,rFallOff=1.7){
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
        console.log("absorbed mass now: "+ largerEntity.mass)
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


class EntityManager  {
    constructor(window) {
        this.entityList = new Array();
        this.entityStagingList = new Array();
        this.entityDeletingList = new Array();
        var floatingSpeed = 20
         for(let i=0;i<600;i++){
             let pos={xpos: window.maxWidth*(1/2 + 5*(Math.random() - .5)), ypos: window.maxHeight*(1/2 + 5*(Math.random() - .5))}
             let vel = {xvel: floatingSpeed*(Math.random()-.5), yvel: floatingSpeed*(Math.random()-.5)}
             // let vel = {xvel: 0, yvel: 0}
             let newEntity = new MyEntity(pos,vel,1200)
             this.entityList.push(newEntity)
         } 
         // {
         // let pos={xpos: window.maxWidth*.5, ypos: window.maxHeight*.5}
         // let vel = {xvel: 0  , yvel: 0}
         // let newEntity = new MyEntity(pos,vel,1000000,'hsl(' + 5 + ', 100%, 60%)')
         // this.entityList.push(newEntity) 
         // }
    }

    update(ctx, frameCount, window){


        // this.entityDeletingList.forEach((i) => {this.entityList.splice(i, 1)});
        // if(this.entityStagingList.length > 0)
        // {
        //     for (var i = this.entityStagingList.length - 1; i > -1; i--){
        //     this.entityList.push(this.entityStagingList[0])
        //     }
        //     this.entityStagingList = []
        // }
        // this.entityStagingList = []
        // this.entityDeletingList  = []
        

        const maxWidth = window.maxWidth*20
        const minWidth = -window.maxWidth*20
        const maxHeight = window.maxHeight*20
        const minHeight = -window.maxHeight*20
        const threshholdMass = 100000


        for (var i = this.entityList.length - 1; i > -1; i--) {
            
            let entity = this.entityList[i]

            //console.log(entity)
            let newX = entity.xpos + entity.xvel
            let newY = entity.ypos + entity.yvel

            if(newX > maxWidth || newX < minWidth || newY > maxHeight || newY < minHeight || !entity.enable){
                // this.entityDeletingList.push(i)
                console.log('deleting: '+i)
                this.entityList.splice(i, 1)
                continue
            }

            this.entityList.forEach((otherEntity)=>{
                if(otherEntity != entity){
                    let dTo = entity.distanceTo(otherEntity)
                    if(dTo.mag < (entity.r + otherEntity.r))
                    {
                        entity.absorb(otherEntity)
                    }
                    entity.applyForce(dTo, otherEntity.mass)
                }
            });

            if(entity.mass > threshholdMass)
            {
                console.log("Over Threshold")
                const subEntityQuantity = 20
                const subEntityMass = Math.floor(entity.mass/subEntityQuantity)
                console.log(subEntityMass)
                const subEntityAngle = 2*Math.PI / subEntityQuantity
                const initRadius = 1000
                for (var i = 0; i < subEntityQuantity; i++)
                {
                    // console.log(entity.xpos)
                    // console.log(entity.ypos)
                    let subEntityVecX = Math.cos(subEntityAngle* i) * initRadius
                    //console.log(subEntityVecX)
                    let subEntityVecY = Math.sin(subEntityAngle* i) * initRadius
                    // console.log(subEntityVecY)
                    let pos={xpos: entity.xpos + subEntityVecX, ypos: entity.ypos + subEntityVecY}
                    console.log(pos)
                    let vel = {xvel: 100*(subEntityVecX/initRadius), yvel: 100*(subEntityVecY/initRadius)}
                    //console.log(vel)
                    let newEntity = new MyEntity(pos,vel,subEntityMass)
                    this.entityList.push(newEntity)
                    // this.entityStagingList.push(newEntity)
                }
                entity.enable = false
                this.entityList.splice(i, 1)
                
            }

            entity.updatePos(newX,newY)
            entity.draw(ctx,window)
        }
  }
}


export default EntityManager;