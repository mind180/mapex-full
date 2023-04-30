import React from 'react';
import MapViewerStateProvider from './MapViewerStateProvider';
import { useParams } from 'react-router-dom';

export default function MapViewerRouted() {
  const { mapId } = useParams();

  return (
    <>
      <MapViewerStateProvider canvasId={mapId}/>
    </>
  );
}