export type GroupStatus = 'Active' | 'Inactive';

export interface GroupUser {
  id: string;
  name: string;
  avatar_thumbnail_url?: string;
}

export interface GroupMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar_thumbnail_url: string;
}

export interface Group {
  id: string;
  agency_id: string;
  avatar_url?: string;
  avatar_thumbnail_url?: string;
  name: string;
  acronym: string;
  created_at: string;
  created_by_user: GroupUser;
  updated_at: string | null;
  updated_by_user: GroupUser | null;
  status: GroupStatus;
  members: GroupMember[];
}

export interface GroupHistoryChange {
  acronym?: string;
  members?: GroupUser[];
  name?: string;
  status?: string;
}

export type GroupHistoryType =
  | 'create'
  | 'update'
  | 'upload'
  | 'delete'
  | 'restore'
  | 'add_members'
  | 'remove_members'
  | 'remove_agency_members';

export interface GroupHistory {
  created_at: string;
  created_by_user: GroupUser;
  changes: GroupHistoryChange;
  group_id: string;
  id: number;
  type: GroupHistoryType;
}

export interface GroupAvatar {
  avatar_thumbnail_url: string;
  avatar_url: string;
}
