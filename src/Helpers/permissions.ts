export const checkPermissions = (
  permission: string,
  permissions?: string[]
): boolean => {
  return !!permissions?.find(
    (permissions: string) => permissions === permission
  );
};
