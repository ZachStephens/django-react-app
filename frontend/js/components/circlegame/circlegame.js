import { update } from 'lodash';
import MyEntity from './myEntity'

class CircleGameDrawer {

    constructor() {
       this.entityList = new Array();

       this.window = {x: 0, y: 0, scale: 25, maxWidth: 2560, maxHeight: 1440}
       this.keyPressMap  = {}
       var floatingSpeed = 70
        for(let i=0;i<849;i++){
            // let  r = 700
            // let x = r*(Math.random())
            // let r_squared = Math.pow(r,2)
            // let y = Math.sqrt(r_squared - Math.pow(x,2)) + 190
            let pos={xpos: this.window.maxWidth*(1/2 + 5*(Math.random() - .5)), ypos: this.window.maxHeight*(1/2 + 5*(Math.random() - .5))}
            // let vel = {xvel: 0  , yvel: 0}

            let diffPos = {xpos: this.window.maxWidth/2 - pos.xpos, ypos: this.window.maxHeight/2 - pos.ypos}

            let vel = {xvel: floatingSpeed*(Math.random()-.5), yvel: floatingSpeed*(Math.random()-.5)}
            // let vel = {xvel: 0, yvel: 0}
            let newEntity = new MyEntity(pos,vel,1060)
            this.entityList.push(newEntity)
        } 
        // {
        // let pos={xpos: this.window.maxWidth*.5, ypos: this.window.maxHeight*.5}
        // let vel = {xvel: 0  , yvel: 0}
        // let newEntity = new MyEntity(pos,vel,1000000,'hsl(' + 5 + ', 100%, 60%)')
        // this.entityList.push(newEntity) 
        // }

    }

    onScrollHandler(e){
        if(e.deltaY > 0)
        {
            this.window.scale += .5
        }
        else{
            this.window.scale -= .5
        }
    }


    onKeyUpHandler(e){ 
        this.keyPressMap[e.key] = false
    }

    onKeyDownHandler(e){ 
        this.keyPressMap[e.key] = true
    }


    applyWindowDirection()
    {
        let panMagnitude = 20
        if(this.keyPressMap['a'] || this.keyPressMap['ArrowLeft'])
        {
            console.log('left')
            this.window.x += panMagnitude
        }

        if(this.keyPressMap['d'] || this.keyPressMap['ArrowRight'])
        {
            console.log('right')
            this.window.x += -panMagnitude
        }

        if(this.keyPressMap['s'] || this.keyPressMap['ArrowDown'])
        {
            console.log('down')
            this.window.y += -panMagnitude
        }

        if(this.keyPressMap['w'] || this.keyPressMap['ArrowUp'])
        {
            console.log('up')
            this.window.y += panMagnitude
        }

    }

    applyBoundaryForces(entity)
    {
        // // // Bounds implemented as forces
        // let boundaryMass = 100000
        // let boundaryK = .000001
        // let boundaryRRunoff = 2


        let displacementX = this.window.maxWidth - entity.xpos
        let displacementY = this.window.maxHeight - entity.ypos


        if(displacementX < 0){ 
            displacementX = 2
            entity.xvel = -Math.abs(entity.xvel)
        }
        if(displacementY < 0){
            displacementY = 2
            entity.yvel = -Math.abs(entity.yvel)
        }
        if(entity.xpos < 0){ 
            displacementX = 2
            entity.xvel = Math.abs(entity.xvel)
        }
        if(entity.ypos < 0){
            displacementY = 2
            entity.yvel = Math.abs(entity.yvel)
        }

        // // negative horizontal force from the right
        // entity.applyForce({mag: displacementX, unit:{x: -1, y:0}}, boundaryMass,boundaryK,boundaryRRunoff)

        // // positve horizontal force from the left
        // entity.applyForce({mag: entity.xpos, unit:{x: 1, y:0}}, boundaryMass,boundaryK,boundaryRRunoff)

        // // negative vertical force from the bottom
        // entity.applyForce({mag: entity.ypos, unit:{x: 0, y: 1}}, boundaryMass,boundaryK,boundaryRRunoff)

        // // positve vertical force from the top
        // entity.applyForce({mag: displacementY, unit:{x: 0, y:-1}}, boundaryMass,boundaryK,boundaryRRunoff)

    }

    draw(ctx, frameCount){

        const maxWidth = this.window.maxWidth*20
        const minWidth = -this.window.maxWidth*20
        const maxHeight = this.window.maxHeight*20
        const minHeight = -this.window.maxHeight*20

        this.applyWindowDirection()

        for (var i = this.entityList.length - 1; i > -1; i--) {
            
            let entity = this.entityList[i]

            let newX = entity.xpos + entity.xvel
            let newY = entity.ypos + entity.yvel

            if(newX > maxWidth || newX < minWidth || newY > maxHeight || newY < minHeight || !entity.enable){
                this.entityList.splice(i, 1);
                continue
            }

            // if(entity.mass > 900){
            //     this.applyBoundaryForces(entity)
            // }


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


            entity.updatePos(newX,newY)
            entity.draw(ctx,this.window)
        }
  }
}



export default CircleGameDrawer;