import React from 'react';
import CanvasStateProvider from '../../wrappers/CanvasStateProvider'
import { useParams } from 'react-router-dom'

export default function Board() {
  const { mapId } = useParams();

  return (
    <>
      <CanvasStateProvider canvasId={mapId}/>
    </>
  );
}