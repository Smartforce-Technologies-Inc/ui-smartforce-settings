import React from 'react';

export interface MarkerProps extends google.maps.MarkerOptions {
  onClick?: (e: google.maps.MapMouseEvent) => void;
}

export const Marker: React.FC<MarkerProps> = ({ onClick, ...options }) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  React.useEffect(() => {
    if (marker) {
      google.maps.event.clearListeners(marker, 'click');

      if (onClick) {
        marker.addListener('click', onClick);
      }
    }
  }, [marker, onClick]);

  return null;
};
