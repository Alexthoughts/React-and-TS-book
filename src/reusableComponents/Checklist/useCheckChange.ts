import { useEffect, useState } from "react";
import { IdValue } from "./types";

type Params = {
  checkedIds?: IdValue[];
  onCheckedIdsChange?: (checkedIds: IdValue[]) => void;
};

export const useCheckChange = ({ checkedIds, onCheckedIdsChange }: Params) => {
  const [resolvedCheckedIds, setResolvedCheckedIds] = useState<IdValue[]>(
    checkedIds || []
  );

  useEffect(() => {
    const isControlled = checkedIds !== undefined;
    if (isControlled) {
      setResolvedCheckedIds(checkedIds);
    }
  }, [checkedIds]);

  // on onChange={handleCheckChange(idValue)} we need to send idValue, so we need a function that return action on onChange.
  // without curring you can use onChange only like this: onChange={handleCheckChange}
  const handleCheckChange = (checkedId: IdValue) => () => {
    const isChecked = resolvedCheckedIds.includes(checkedId);
    let newCheckedIds = isChecked
      ? resolvedCheckedIds.filter((itemCheckedId) => itemCheckedId !== checkedId) //remove check
      : resolvedCheckedIds.concat(checkedId); //add check to list
    if (onCheckedIdsChange) {
      onCheckedIdsChange(newCheckedIds);
    } else {
      setResolvedCheckedIds(newCheckedIds);
    }
  };

  return { resolvedCheckedIds, handleCheckChange };
};
