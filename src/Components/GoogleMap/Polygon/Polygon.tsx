import React from 'react';

const CHANGE_EVENTS: string[] = ['insert_at', 'remove_at', 'set_at'];

export interface PolygonProps extends google.maps.PolygonOptions {
  initialPaths: google.maps.LatLngLiteral[];
  onChange?: (value: google.maps.LatLngLiteral[]) => void;
}

export const Polygon: React.FC<PolygonProps> = ({
  initialPaths,
  onChange,
  ...props
}: PolygonProps) => {
  const [polygon, setPolygon] = React.useState<google.maps.Polygon>();

  React.useEffect(() => {
    if (!polygon) {
      setPolygon(new google.maps.Polygon());
    }

    // remove polygon from map on unmount
    return () => {
      if (polygon) {
        polygon.setMap(null);
      }
    };
  }, [polygon]);

  React.useEffect(() => {
    let paths: google.maps.MVCArray;

    if (polygon) {
      paths = new google.maps.MVCArray(
        initialPaths.map((p) => new google.maps.LatLng(p))
      );

      polygon.setPaths(paths);

      CHANGE_EVENTS.forEach((eventName: string) => {
        paths.addListener(eventName, () => {
          onChange && onChange(paths.getArray().map((e) => e.toJSON()));
        });
      });
    }

    return () => {
      if (paths) {
        CHANGE_EVENTS.forEach((eventName) => {
          google.maps.event.clearListeners(paths, eventName);
        });
      }
    };
  }, [initialPaths, polygon, onChange]);

  React.useEffect(() => {
    if (polygon) {
      polygon.setOptions(props);
    }
  }, [polygon, props]);

  return null;
};
