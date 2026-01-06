import type { ThemeProviderProps } from "next-themes";
import { ThemeProvider } from "./providers/theme";
import { TooltipProvider } from "./components/tooltip";
import { ConfirmDialogProvider } from "./components/confirm-dialog";
import { Toaster } from "./components/sonner";
import { ToasterProps } from "sonner";

type DesignSystemProviderProperties = ThemeProviderProps & {
  privacyUrl?: string;
  termsUrl?: string;
  helpUrl?: string;
  toastPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
};

export const DesignSystemProvider = ({
  children,
  privacyUrl,
  termsUrl,
  helpUrl,
  toastPosition = 'top-right',
  ...properties
}: DesignSystemProviderProperties) => (
  <ThemeProvider {...properties}>
    <TooltipProvider>
      <ConfirmDialogProvider>{children}</ConfirmDialogProvider>
    </TooltipProvider>
    <Toaster position={toastPosition} />
  </ThemeProvider>
);
