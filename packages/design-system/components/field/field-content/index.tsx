import { cn } from "@finranks/design-system/lib/utils"

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="field-content"
            className={cn(
                "group/field-content flex flex-1 flex-col gap-1.5 leading-snug",
                className
            )}
            {...props}
        />
    )
}

export { FieldContent }