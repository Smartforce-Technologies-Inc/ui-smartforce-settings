import { Shift, ShiftListItem, ShiftRequest } from '../Models';

//TODO remove
const MOCKS: ShiftListItem[] = [
  {
    id: '2',
    agency_id: '2',
    name: 'Day 1B',
    acronym: 'D1B',
    areas: ['845ef14f-ae87-4913-a58c-9ec2d70f86e3'],
    start: {
      datetime: '2023-11-10T08:00:00',
      timezone: 'America/Argentina/Buenos_Aires'
    },
    end: {
      datetime: '2023-11-10T15:00:00',
      timezone: 'America/Argentina/Buenos_Aires'
    },
    recurrence: {
      frecuency: 'weekly',
      interval: 1,
      days: ['FR', 'SA', 'SU']
    },
    staff_min: 1,
    members: ['41a35043-9d67-4995-abe7-73ce31f8a29d'],
    supervisor: '41a35043-9d67-4995-abe7-73ce31f8a29d',

    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by_user: '1',
    updated_by_user: '1'
  }
];

//TODO remove
const MOCK: Shift = {
  id: '2',
  agency_id: '2',
  name: 'Day 1B',
  acronym: 'D1B',
  areas: [
    {
      id: '845ef14f-ae87-4913-a58c-9ec2d70f86e3',
      name: 'Area 06'
    }
  ],
  start: {
    datetime: '2023-11-10T08:00:00',
    timezone: 'America/Argentina/Buenos_Aires'
  },
  end: {
    datetime: '2023-11-10T15:00:00',
    timezone: 'America/Argentina/Buenos_Aires'
  },
  recurrence: {
    frecuency: 'weekly',
    interval: 1,
    days: ['FR', 'SA', 'SU']
  },
  staff_min: 1,
  members: [
    {
      id: '41a35043-9d67-4995-abe7-73ce31f8a29d',
      name: 'Martin Weingarts'
    }
  ],
  supervisor: {
    id: '41a35043-9d67-4995-abe7-73ce31f8a29d',
    name: 'Martin Weingarts'
  },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  created_by_user: '1',
  updated_by_user: '1'
};

export function getShifts(baseUrl: string): Promise<ShiftListItem[]> {
  // TODO BE INTEGRATION
  // const url: string = `${baseUrl}/shifts`;
  // return apiGet<{data: ShiftListItem[]}>(url, getUserSession().access_token)
  // .then(resp => resp.data);
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(MOCKS);
    }, 1500);
  });
}

export function getShift(baseUrl: string, id: string): Promise<Shift> {
  // TODO BE INTEGRATION
  // const url: string = `${baseUrl}/shifts/${id}`;
  // return apiGet<Shift>(url, getUserSession().access_token);
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(MOCK);
    }, 1500);
  });
}

export function addShift(baseUrl: string, shift: ShiftRequest): Promise<Shift> {
  console.log(shift);
  // TODO BE INTEGRATION
  // const url: string = `${baseUrl}/shifts`;
  // return apiPost<Shift, ShiftRequest>(url, getUserSession().access_token);
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(MOCK);
    }, 1500);
  });
}

export function editShift(
  baseUrl: string,
  id: string,
  shift: ShiftRequest
): Promise<Shift> {
  console.log(shift);
  // TODO BE INTEGRATION
  // const url: string = `${baseUrl}/shifts/${id}`;
  // return apiPut<Shift, ShiftRequest>(url, getUserSession().access_token);
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(MOCK);
    }, 1500);
  });
}
