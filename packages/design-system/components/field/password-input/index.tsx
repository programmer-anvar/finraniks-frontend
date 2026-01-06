import React, { forwardRef } from 'react';
import { Input, InputProps } from '../input';
import { Eye, EyeClosed } from 'lucide-react';
import { Button } from '../../Button';

// Define the component's controlled props
type TPasswordInputProps = {
    // Note: If possible, adopt the structure in section 1B instead of nesting props.
    inputProps: InputProps
}

const PasswordInput = forwardRef<HTMLInputElement, TPasswordInputProps>(
    (
        {
            inputProps
        },
        forwardedRef
    ) => {
        const [show, setShow] = React.useState(false);

        // Best Practice: Stable function for toggling state
        const toggleVisibility = React.useCallback(() => {
            setShow(prevShow => !prevShow);
        }, []);

        const toggleButton = (
            <Button
                onClick={toggleVisibility}
                size='sm'
                // Use aria-label for screen reader clarity
                aria-label={show ? "Hide password" : "Show password"}
                // A11y Improvement: Prevent the button from being focused via tab key
                tabIndex={-1}
                variant="ghost"
            >
                {/* Ensure icons have explicit sizes for consistency */}
                {show ? <Eye className='h-4 w-4' /> : <EyeClosed className='h-4 w-4' />}
            </Button>
        );

        return (
            // The wrapping div is only needed if you need custom layout beyond the Input component's scope
            // If Input is a simple wrapper around <input>, this div is redundant.
            <div>
                <Input
                    ref={forwardedRef}
                    {...inputProps}
                    // Control the input type based on the 'show' state
                    type={show ? "text" : "password"}
                    // Pass the configured button as the append element
                    append={toggleButton}
                />
            </div>
        );
    }
);

PasswordInput.displayName = 'PasswordInput'; // Good practice for debugging and HOCs

export default PasswordInput 