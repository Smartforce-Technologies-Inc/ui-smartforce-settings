import React, { Fragment, useContext, useEffect, useState } from 'react';
import { SettingsError, Shift, ShiftListItem } from '../../Models';
import { SettingsContentRender } from '../SettingsContentRender';
import { ListManagment } from '../../Components/ListManagment/ListManagment';
import { ApiContext } from '../../Context';
import { getShift, getShifts } from '../../Services';
import { ShiftFormModal } from './ShiftFormModal/ShiftFormModal';
import { ShiftInfoModal } from './ShiftInfoModal/ShiftInfoModal';
import { AgencyShiftItem } from './AgencyShiftItem/AgencyShiftItem';

function sortShifts(groups: ShiftListItem[]): ShiftListItem[] {
  return groups.sort((a: ShiftListItem, b: ShiftListItem): number =>
    a.name.localeCompare(b.name)
  );
}

function getFilteredShifts(
  shifts: ShiftListItem[],
  filter: string
): ShiftListItem[] {
  if (filter.length < 3) {
    return shifts;
  } else {
    const filterLower = filter.toLowerCase();
    return shifts.filter((s: ShiftListItem) =>
      s.name.toLowerCase().includes(filterLower)
    );
  }
}

export interface AgencyShiftsProps {
  onClose: () => void;
  onError: (e: SettingsError) => void;
}

export const AgencyShifts = ({
  onError,
  onClose
}: AgencyShiftsProps): React.ReactElement<AgencyShiftsProps> => {
  const apiBaseUrl = useContext(ApiContext).shifts;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [shifts, setShifts] = useState<ShiftListItem[]>([]);
  const [selected, setSelected] = useState<Shift | undefined>();
  const [isLoadingShift, setIsLoadingShift] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [modalValue, setModalValue] = useState<Shift>();

  useEffect(() => {
    let isSubscribed: boolean = true;

    const init = async () => {
      setIsLoading(true);
      try {
        const shifts = await getShifts(apiBaseUrl);

        if (isSubscribed) {
          setShifts(sortShifts(shifts));
          setIsLoading(false);
        }
      } catch (e: any) {
        onError(e);
      }
    };

    init();

    // Unsuscribed when cleaning up
    return () => {
      isSubscribed = false;
    };
  }, [apiBaseUrl, onError]);

  const onUpdate = async () => {
    setIsLoading(true);
    try {
      const shifts = await getShifts(apiBaseUrl);
      setShifts(sortShifts(shifts));
      setIsLoading(false);
    } catch (e: any) {
      setIsLoading(false);
      onError(e);
    }
  };

  const onCreate = () => {
    setSelected(undefined);
    setIsCreateModalOpen(true);
  };

  const onInfo = async (shiftPreview: ShiftListItem) => {
    try {
      setIsLoadingShift(true);
      setIsViewModalOpen(true);
      const shift = await getShift(apiBaseUrl, shiftPreview.id);
      setModalValue(shift);
      setIsLoadingShift(false);
    } catch (e: any) {
      setIsLoadingShift(false);
      onError(e);
    }
  };

  const onEdit = async (shiftPreview: ShiftListItem) => {
    try {
      setIsLoadingShift(true);
      setIsCreateModalOpen(true);
      const shift = await getShift(apiBaseUrl, shiftPreview.id);
      setSelected(shift);
      setIsLoadingShift(false);
    } catch (e: any) {
      setIsLoadingShift(false);
      onError(e);
    }
  };

  return (
    <SettingsContentRender
      renderContent={() => (
        <Fragment>
          <ShiftFormModal
            shift={selected}
            isOpen={isCreateModalOpen}
            isLoading={isLoadingShift}
            onError={onError}
            onSave={onUpdate}
            onClose={() => setIsCreateModalOpen(false)}
          />
          <ShiftInfoModal
            isOpen={isViewModalOpen}
            isLoading={isLoadingShift}
            onClose={() => {
              onClose();
              setIsViewModalOpen(false);
            }}
            onBack={() => setIsViewModalOpen(false)}
            onError={onError}
            shift={modalValue}
          />
          <ListManagment<ShiftListItem>
            actionButtonLabel="Create Shift"
            emptyMessage="There are no shifts created yet."
            label="Shift"
            list={shifts}
            isLoading={isLoading}
            filter={getFilteredShifts}
            onCreate={onCreate}
            onClick={onInfo}
            options={[
              {
                label: 'Edit shift',
                onClick: onEdit
              },
              {
                label: 'See shift information',
                onClick: onInfo
              }
            ]}
            renderItem={(item) => <AgencyShiftItem shift={item} />}
          />
        </Fragment>
      )}
    />
  );
};
