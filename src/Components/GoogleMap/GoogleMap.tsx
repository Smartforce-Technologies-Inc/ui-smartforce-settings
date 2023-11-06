import React, { Fragment, memo } from 'react';
import styles from './GoogleMap.module.scss';
import {
  defaultMapOptions,
  defaultMapStyle,
  nightModeStyle
} from './Config/MapsConfig';

import { ThemeTypeContext } from '../../Context';

const addSmartforceLegend = (ref: React.RefObject<HTMLDivElement>): void => {
  const legend: HTMLDivElement = document.createElement('div');
  legend.classList.add('sfMapLegend');
  legend.innerHTML = '<span>Powered by <strong>SmartForce®<strong></span>';
  ref?.current?.appendChild(legend);
};

export interface GoogleMapProps extends google.maps.MapOptions {
  bounds?: google.maps.LatLngBounds;
  center?: google.maps.LatLng;
  children?: React.ReactNode;
  onCreate?: (map: google.maps.Map) => void;
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onCenterChange?: (center: google.maps.LatLngLiteral | undefined) => void;
}

// Using React.memo to avoid unnecessary re renders
export const GoogleMap = memo(
  ({
    bounds,
    center,
    zoom,
    children,
    onCreate,
    onClick,
    onCenterChange
  }: GoogleMapProps): React.ReactElement<GoogleMapProps> => {
    const { themeType } = React.useContext(ThemeTypeContext);
    const mapStyles = themeType === 'night' ? nightModeStyle : defaultMapStyle;
    const [map, setMap] = React.useState<google.maps.Map>();
    const refContainer = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      if (refContainer.current && !map) {
        const map = new window.google.maps.Map(refContainer.current, {});
        setMap(map);
        addSmartforceLegend(refContainer);
        onCreate && onCreate(map);
      }
    }, [map, onCreate]);

    React.useEffect(() => {
      if (map) {
        map.setOptions({
          styles: mapStyles,
          ...defaultMapOptions,
          center,
          zoom
        });
      }
    }, [map, mapStyles, center, zoom]);

    React.useEffect(() => {
      if (map) {
        google.maps.event.clearListeners(map, 'click');

        if (onClick) {
          map.addListener('click', onClick);
        }
      }
    }, [map, onClick]);

    React.useEffect(() => {
      if (map) {
        google.maps.event.clearListeners(map, 'center_changed');

        if (onCenterChange) {
          map.addListener('center_changed', () =>
            onCenterChange(map.getCenter()?.toJSON())
          );
        }
      }
    }, [map, onCenterChange]);

    React.useEffect(() => {
      if (map && bounds) {
        map.fitBounds(bounds);
      }
    }, [map, bounds]);

    // Props to avoid dragging when user is panning
    const dragProps = {
      draggable: true,
      onDragStart: (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    return (
      <Fragment>
        <div
          ref={refContainer}
          className={styles.googleMap}
          {...dragProps}
        ></div>

        {children &&
          React.Children.map(children, (child) => {
            if (React.isValidElement<{ map: google.maps.Map }>(child)) {
              return React.cloneElement(child, { map });
            } else return null;
          })}
      </Fragment>
    );
  }
);
