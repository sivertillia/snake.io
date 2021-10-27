import React  from 'react'

export const Canvas = ({ width, height, canvasRef, moveSnake }) => {

  return (
    <canvas tabIndex="0" onKeyDown={moveSnake} style={styleCanvas} ref={canvasRef} width={width} height={height}/>
  )
}

const styleCanvas = {
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'block',
}