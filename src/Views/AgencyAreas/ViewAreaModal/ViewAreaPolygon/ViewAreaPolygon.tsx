import React, { useContext } from 'react';
import { SFAlert } from 'sfui';
import styles from './ViewAreaPolygon.module.scss';
import { GoogleMap, Polygon } from '../../../../Components/GoogleMap';
import {
  getActivePolygonStyles,
  getBoundsFromCoords,
  getPolygonDefaultPaths,
  getPolygonStyles
} from '../../../../Helpers';
import {
  AreasContext,
  CustomerContext,
  StatesListConfigContext,
  ThemeTypeContext
} from '../../../../Context';
import { Area, Customer, State } from '../../../../Models';

function getBounds(
  areaPaths: google.maps.LatLngLiteral[],
  customer: Customer,
  statesList: State[]
) {
  const paths =
    areaPaths.length > 0
      ? areaPaths
      : getPolygonDefaultPaths(customer, statesList);
  return getBoundsFromCoords(paths);
}

export interface ViewAreaPolygonProps {
  area: Area;
}

export const ViewAreaPolygon = ({
  area
}: ViewAreaPolygonProps): React.ReactElement<ViewAreaPolygonProps> => {
  const customer = useContext(CustomerContext).customer as Customer;
  const statesList = useContext(StatesListConfigContext).statesList;
  const areas = useContext(AreasContext).areas;
  const { themeType } = useContext(ThemeTypeContext);
  const hasPolygon: boolean = area.paths.length > 0;

  return (
    <div className={styles.viewAreaPolygon}>
      {!hasPolygon && (
        <SFAlert
          type="info"
          title="This area does not have a defined zone yet."
        >
          To define a zone on the map, please select "Edit area" from the Area
          menu.
        </SFAlert>
      )}

      <GoogleMap bounds={getBounds(area.paths, customer, statesList)}>
        {hasPolygon && (
          <Polygon
            initialPaths={area.paths}
            zIndex={1}
            {...getActivePolygonStyles(themeType)}
          />
        )}

        {areas
          .filter((a: Area) => a.id !== area?.id && a.paths.length > 0)
          .map((a: Area) => (
            <Polygon
              key={a.id}
              initialPaths={a.paths as google.maps.LatLngLiteral[]}
              {...getPolygonStyles()}
            />
          ))}
      </GoogleMap>
    </div>
  );
};
