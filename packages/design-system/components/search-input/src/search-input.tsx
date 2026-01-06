import { Search, X } from "lucide-react";
import { memo } from "react";
import { type UseSearchInputProps, useSearchInput } from "./use-search-input";
import { Input } from "../../field/input";

export type SearchInputProps = UseSearchInputProps;
export const SearchInput = memo((props: SearchInputProps) => {
  const {
    shouldShowClearButton,
    getWrapperProps,
    getInputProps,
    getSearchIconProps,
  } = useSearchInput(props);

  return (
    <div {...getWrapperProps()}>
      <Search {...getSearchIconProps()} />
      <Input {...getInputProps()} ref={props?.ref} isClearable={shouldShowClearButton} />
    </div>
  );
});
