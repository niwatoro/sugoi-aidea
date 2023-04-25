import { Listbox } from "@headlessui/react";
import { FC } from "react";

export type ListItemProps = {
  id: string;
  name: string;
  unavailable?: boolean;
};
type Props = {
  items: ListItemProps[];
  value: ListItemProps;
  onChange: (value: ListItemProps) => void;
};
const Select: FC<Props> = ({ items, value, onChange }) => {
  return (
    <Listbox value={value} onChange={onChange} as={"div"}>
      <Listbox.Button className={"border border-slate-200 rounded-full w-36 p-2 text-sm"}>{value.name}</Listbox.Button>
      <Listbox.Options className={"absolute z-30 divide-y w-36 text-center shadow-md rounded-md ring-1 bg-white ring-slate-200 px-2 py-1 text-sm"}>
        {items.map(
          (item) =>
            item.unavailable || (
              <Listbox.Option key={item.id} value={item} disabled={item.unavailable} className={"p-2 cursor-pointer"}>
                {item.name}
              </Listbox.Option>
            )
        )}
      </Listbox.Options>
    </Listbox>
  );
};

export default Select;
