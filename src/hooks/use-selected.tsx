import { useMemo, useCallback } from "react";
import { IdMap } from "../utils";

export const useSelected = (ids: string[], selectedIds: string[]) => {
  const selectMap = useMemo(
    () => IdMap.fromIds(ids, selectedIds),
    [ids, selectedIds]
  );

  const isSelected = useCallback((id) => selectMap[id] ?? false, [selectMap]);

  const toggleSelected = useCallback(
    (id: string, value: boolean) => {
      const newMap = { ...selectMap, [id]: value };
      return IdMap.toActivedIds(ids, newMap);
    },
    [selectMap, ids]
  );

  return {
    isSelected,
    toggleSelected,
  };
};
