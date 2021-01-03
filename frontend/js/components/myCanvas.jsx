
import React, { useRef, useEffect } from 'react'

import '../../sass/components/myCanvas-styles.scss'

const MyCanvas = props => {

    const { drawer, onKeyPress, ...rest } = props
    const canvasRef = useRef(null)

    useEffect(() => {

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        canvas.focus()

        let frameCount = 0
        let animationFrameId

        const render = () => {

            frameCount++
            context.clearRect(0, 0, canvas.width, canvas.height);

            drawer.draw(context, frameCount)
            animationFrameId = window.requestAnimationFrame(render)
        }

        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [drawer])



    return <>
        <canvas tabIndex='0' onKeyDown={(e) => { drawer.onKeyDownHandler(e) }} onKeyUp={(e) => { drawer.onKeyUpHandler(e) }} onWheel={(e) => { drawer.onScrollHandler(e) }} width={drawer.window.maxWidth + 'px'} height={drawer.window.maxHeight + 'px'} ref={canvasRef} />
    </>
}

export default MyCanvas