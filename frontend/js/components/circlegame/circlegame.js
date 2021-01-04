import { update } from 'lodash';
import EntityManager from './myEntity'

class CircleGameDrawer {

    constructor() {
       this.window = {x: 0, y: 0, scale: 15, maxWidth: 2560, maxHeight: 1440}
       this.entityManager = new EntityManager(this.window)
       this.keyPressMap  = {}
    }

    onScrollHandler(e){
        if(e.deltaY > 0)
        {
            this.window.scale += 5
        }
        else{
            this.window.scale -= 5
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

    draw(ctx, frameCount){

        this.applyWindowDirection()

        this.entityManager.update(ctx,frameCount,this.window)
  }
}



export default CircleGameDrawer;