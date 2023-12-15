import {
  SFBlueMainDark,
  SFBlueMainLight,
  SFTextBlack,
  SFThemeType
} from 'sfui';
import { Customer, GeoLocationCoords, State } from '../Models';
import { getStateCoords } from './states';
import TurfDestination from '@turf/destination';
import { point as TurfPoint } from '@turf/helpers';
import { DEFAULT_SQUARE_DIAG_KM_DISTANCE } from '../Constants';

export function getBoundsFromCoords(
  coords: google.maps.LatLngLiteral[]
): google.maps.LatLngBounds {
  const bounds = new google.maps.LatLngBounds();

  coords.forEach((coord: google.maps.LatLngLiteral) => {
    bounds.extend(coord);
  });

  return bounds;
}

export function getActivePolygonStyles(
  themeType: SFThemeType
): Partial<google.maps.PolygonOptions> {
  if (themeType === 'day') {
    return {
      strokeWeight: 4,
      strokeColor: SFBlueMainLight,
      fillColor: 'rgb(204, 235, 255)',
      fillOpacity: 0.4
    };
  } else {
    return {
      strokeWeight: 4,
      strokeColor: SFBlueMainDark,
      fillColor: 'rgb(128, 198, 255)',
      fillOpacity: 0.2
    };
  }
}

export function getPolygonStyles(): Partial<google.maps.PolygonOptions> {
  return {
    strokeWeight: 4,
    strokeColor: SFTextBlack,
    fillColor: 'rgb(204, 204, 204)',
    fillOpacity: 0.3
  };
}

// distance is the diagonal from the center to the vertixes, in kilometers
function getSquare(
  center: GeoLocationCoords,
  distance: number
): google.maps.LatLngLiteral[] {
  const turfCenter = TurfPoint([center.longitude, center.latitude]);
  const topLeftVertix = TurfDestination(turfCenter, distance, -45);
  const topRightVertix = TurfDestination(turfCenter, distance, 45);
  const bottomRightVertix = TurfDestination(turfCenter, distance, 135);
  const bottomLeftVertix = TurfDestination(turfCenter, distance, -135);

  return [
    {
      lat: topLeftVertix.geometry.coordinates[1],
      lng: topLeftVertix.geometry.coordinates[0]
    },
    {
      lat: topRightVertix.geometry.coordinates[1],
      lng: topRightVertix.geometry.coordinates[0]
    },
    {
      lat: bottomRightVertix.geometry.coordinates[1],
      lng: bottomRightVertix.geometry.coordinates[0]
    },
    {
      lat: bottomLeftVertix.geometry.coordinates[1],
      lng: bottomLeftVertix.geometry.coordinates[0]
    }
  ];
}

export function getPolygonDefaultPaths(
  customer: Customer,
  statesList: State[]
): google.maps.LatLngLiteral[] {
  const center =
    customer.address?.coords ?? getStateCoords(statesList, customer.state_name);
  return getSquare(center, DEFAULT_SQUARE_DIAG_KM_DISTANCE);
}
