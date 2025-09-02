import { ComponentPropsWithoutRef, ReactNode } from "react";
import { useCheckChange } from "./useCheckChange";
import { IdValue } from "./types";

type Props<Data> = {
  //Data is a generic type
  data: Data[]; //Data that drives items in the list
  id: keyof Data;
  primary: keyof Data; //main text
  secondary: keyof Data; //secondary text
  renderItem?: (item: Data) => ReactNode; //render props pattern (when you can't use children)
  checkedIds?: IdValue[];
  onCheckedIdsChange?: (checkedIds: IdValue[]) => void;
} & ComponentPropsWithoutRef<"ul">; //adding props from ul element (adding height and width)
// keyof ->  queries the type specified after it for the property names and constructs a union type from them, so
// the type for id, primary, and secondary will be a union type of all the property names for each data item.

// export function Checklist<Data>({ data, id, primary, secondary }: Props<Data>) {
export const Checklist = <Data,>({
  data,
  id,
  primary,
  secondary,
  renderItem,
  checkedIds,
  onCheckedIdsChange,
  ...ulProps //props spreading pattern
}: Props<Data>) => {
  const { resolvedCheckedIds, handleCheckChange } = useCheckChange({
    checkedIds,
    onCheckedIdsChange,
  });

  return (
    <ul className="bg-gray-300 rounded p-10" {...ulProps}>
      {data.map((item) => {
        if (renderItem) {
          //render prop
          return renderItem(item);
        }

        const idValue = item[id] as unknown; //item[id] -> used when we don't know the name of the propety

        if (typeof idValue !== "string" && typeof idValue !== "number") {
          return null;
        }
        const primaryText = item[primary] as unknown;
        if (typeof primaryText !== "string") {
          return null;
        }
        const secondaryText = item[secondary] as unknown;

        return (
          <li
            key={idValue}
            className="bg-white p-6 shadow rounded mb-4
        last:mb-0"
          >
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={resolvedCheckedIds.includes(idValue)}
                onChange={handleCheckChange(idValue)}
                data-testid={`Checklist__input__${idValue.toString()}`}
              />
              <div className="ml-2">
                <div className="text-xl text-gray-800 pb-1">{primaryText}</div>
                {typeof secondaryText === "string" && (
                  <div className="text-sm text-gray-500">{secondaryText}</div>
                )}
              </div>
            </label>
          </li>
        );
      })}
    </ul>
  );
};
