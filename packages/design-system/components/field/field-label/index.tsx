import { cn } from "@finranks/design-system/lib/utils";
import { Label } from "../../label";

function FieldLabel({
    className,
    isInvalid,
    ...props
}: React.ComponentProps<typeof Label> & {
    isInvalid?: boolean;
}) {
    return (
        <Label
            data-slot="field-label" 
            data-error={isInvalid}
            className={cn(
                "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50",
                "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4",
                "",
                isInvalid && "text-[var(--support-error)]!", 
                className
            )}
            {...props} 
        />
    )
}
export { FieldLabel }