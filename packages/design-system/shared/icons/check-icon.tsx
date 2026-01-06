import React from 'react'
import { cn } from '@finranks/design-system/lib/utils';
import { IconSvgProps } from '@finranks/design-system/types/shared';

export const CheckIcon = ({ className }: IconSvgProps) => {
  return (
    <div className="flex items-center justify-center bg-purple-500 rounded-full size-3.5">
      <svg
        width="2"
        height="2"
        viewBox="0 0 8 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("group-data-[state=indeterminate]:hidden group-data-[state=checked]:text-white w-3 h-3", className)}
      >
        <path
          d="M1.5 4L2.45056 5.36575C2.83958 5.92468 3.66129 5.93978 4.07057 5.39552L7 1.5"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    </div>
  )
}

