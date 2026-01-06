"use client";
import React, {
  useState,
  useCallback,
  useMemo,
  useContext,
  createContext,
  memo,
  useEffect,
} from "react";
import { type ReactNode, type ComponentPropsWithRef } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
} from "@finranks/design-system/components/alert-dialog";
import { Kbd } from "../../kbd";
import { Button } from "../../Button";

export interface CustomActionsProps {
  confirm: () => void;
  cancel: () => void;
  config: ConfirmOptions;
  setConfig: ConfigUpdater;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

export type ConfigUpdater = (
  config: ConfirmOptions | ((prev: ConfirmOptions) => ConfirmOptions)
) => void;

export type LegacyCustomActions = (
  onConfirm: () => void,
  onCancel: () => void
) => ReactNode;

export type EnhancedCustomActions = (props: CustomActionsProps) => ReactNode;

export interface ConfirmResult {
  confirmed: boolean;
  close: () => void;
}

/**
 * Configuration options for a confirm dialog.
 */
export interface ConfirmOptions {
  /** Dialog title */
  title?: ReactNode;
  /** Optional description under the title */
  description?: ReactNode;
  /** Custom content inside the dialog */
  contentSlot?: ReactNode;
  /** Text for the confirm button */
  confirmText?: string;
  /** Text for the cancel button */
  cancelText?: string;
  /** Optional icon to render next to the title */
  icon?: ReactNode;
  /** Whether the confirm button is in loading state */
  isLoading?: boolean;
  /** Text displayed when confirm is loading */
  loadingText?: string;
  /** Custom loading icon for confirm button */
  loadingIcon?: ReactNode;
  /** Disable the cancel button while loading */
  disableCancelOnLoading?: boolean;
  /** Custom actions (legacy or enhanced) */
  customActions?: LegacyCustomActions | EnhancedCustomActions;
  /** Props passed to the confirm button */
  confirmButton?: ComponentPropsWithRef<typeof Button>;
  /** Props passed to the cancel button, or null to hide */
  cancelButton?: ComponentPropsWithRef<typeof Button> | null;
  /** Props for customizing AlertDialog parts */
  alertDialogOverlay?: ComponentPropsWithRef<typeof AlertDialogOverlay>;
  alertDialogContent?: ComponentPropsWithRef<typeof AlertDialogContent>;
  alertDialogHeader?: ComponentPropsWithRef<typeof AlertDialogHeader>;
  alertDialogTitle?: ComponentPropsWithRef<typeof AlertDialogTitle>;
  alertDialogDescription?: ComponentPropsWithRef<typeof AlertDialogDescription>;
  alertDialogFooter?: ComponentPropsWithRef<typeof AlertDialogFooter>;
}

/**
 * Internal state of the confirm dialog.
 */
export interface ConfirmDialogState {
  /** Whether the dialog is open */
  isOpen: boolean;
  /** Current configuration of the dialog */
  config: ConfirmOptions;
  /** Resolver for the promise returned by confirm() */
  resolver: ((value: ConfirmResult) => void) | null;
  /** Whether the confirm action is loading */
  isLoading: boolean;
}

/**
 * Value stored in the ConfirmDialog context.
 */
export interface ConfirmContextValue {
  /** Opens the confirm dialog and returns a promise for the result */
  confirm: ConfirmFunction;
  /** Updates the dialog configuration */
  updateConfig: ConfigUpdater;
  /** Sets the loading state manually */
  setLoading: (loading: boolean) => void;
}

/**
 * The confirm function signature.
 * Returns a promise resolving with the result of the dialog.
 */
export interface ConfirmFunction {
  (options: ConfirmOptions): Promise<ConfirmResult>;
  /** Update the dialog configuration after opening */
  updateConfig?: ConfigUpdater;
  /** Set the loading state */
  setLoading?: (loading: boolean) => void;
}

export const ConfirmContext = createContext<ConfirmContextValue | undefined>(
  undefined
);

const baseDefaultOptions: ConfirmOptions = {
  title: "",
  description: "",
  confirmText: "Confirm",
  cancelText: "Cancel",
  loadingText: "Loading...",
  loadingIcon: null,
  disableCancelOnLoading: true,
  confirmButton: {},
  cancelButton: {},
  alertDialogContent: {},
  alertDialogHeader: {},
  alertDialogTitle: {},
  alertDialogDescription: {},
  alertDialogFooter: {},
};

function isLegacyCustomActions(
  fn: LegacyCustomActions | EnhancedCustomActions
): fn is LegacyCustomActions {
  return fn.length === 2;
}

const ConfirmDialogContent: React.FC<{
  config: ConfirmOptions;
  onConfirm: () => void;
  onCancel: () => void;
  setConfig: (
    config: ConfirmOptions | ((prev: ConfirmOptions) => ConfirmOptions)
  ) => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}> = memo(
  ({ config, onConfirm, onCancel, setConfig, isLoading, setLoading }) => {
    const {
      title,
      description,
      cancelButton,
      confirmButton,
      confirmText,
      cancelText,
      loadingText,
      loadingIcon,
      disableCancelOnLoading,
      icon,
      contentSlot,
      customActions,
      alertDialogOverlay,
      alertDialogContent,
      alertDialogHeader,
      alertDialogTitle,
      alertDialogDescription,
      alertDialogFooter,
    } = config;

    const effectiveLoading = isLoading || config.isLoading || false;
    const shouldDisableCancel = effectiveLoading && disableCancelOnLoading;

    const renderActions = () => {
      if (!customActions) {
        return (
          <>
            {cancelButton !== null && (
              <Button
                onClick={onCancel}
                disabled={shouldDisableCancel}
                variant="outline"
                size="sm"
                append={
                  <Kbd size="xs" variant="outline">
                    ESC
                  </Kbd>
                }
                {...cancelButton}
              >
                {cancelText}
              </Button>
            )}
            <Button
              onClick={onConfirm}
              disabled={effectiveLoading}
              variant="default"
              size="sm"
              isLoading={effectiveLoading}
              loadingContent={loadingText}
              loadingIndicator={loadingIcon}
              {...confirmButton}
            >
              {confirmText}
            </Button>
          </>
        );
      }

      if (isLegacyCustomActions(customActions)) {
        return customActions(onConfirm, onCancel);
      }

      return customActions({
        confirm: onConfirm,
        cancel: onCancel,
        config,
        setConfig,
        isLoading: effectiveLoading,
        setLoading,
      });
    };

    const renderTitle = () => {
      if (!title && !icon) {
        return null;
      }

      return (
        <AlertDialogTitle {...alertDialogTitle}>
          {icon}
          {title}
        </AlertDialogTitle>
      );
    };

    return (
      <AlertDialogPortal>
        <AlertDialogOverlay {...alertDialogOverlay} />
        <AlertDialogContent className="p-0.5 backdrop-blur-md rounded-[13px]" {...alertDialogContent}> 
          <div className="border border-border p-4 rounded-[13px] glass_background text-white">
            <AlertDialogHeader {...alertDialogHeader}>
              {renderTitle()}
              {description && (
                <AlertDialogDescription {...alertDialogDescription} className="pb-4">
                  {description}
                </AlertDialogDescription>
              )}
              {contentSlot}
            </AlertDialogHeader>
            <AlertDialogFooter {...alertDialogFooter}>
              {renderActions()}
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialogPortal>
    );
  }
);

ConfirmDialogContent.displayName = "ConfirmDialogContent";

const ConfirmDialog: React.FC<{
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  config: ConfirmOptions;
  onConfirm: () => void;
  onCancel: () => void;
  setConfig: (
    config: ConfirmOptions | ((prev: ConfirmOptions) => ConfirmOptions)
  ) => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}> = memo(
  ({
    isOpen,
    onOpenChange,
    config,
    onConfirm,
    onCancel,
    setConfig,
    isLoading,
    setLoading,
  }) => (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <ConfirmDialogContent
        config={config}
        onConfirm={onConfirm}
        onCancel={onCancel}
        setConfig={setConfig}
        isLoading={isLoading}
        setLoading={setLoading}
      />
    </AlertDialog>
  )
);

ConfirmDialog.displayName = "ConfirmDialog";

export const ConfirmDialogProvider: React.FC<{
  defaultOptions?: ConfirmOptions;
  children: React.ReactNode;
}> = ({ defaultOptions = {}, children }) => {
  const [dialogState, setDialogState] = useState<ConfirmDialogState>({
    isOpen: false,
    config: baseDefaultOptions,
    resolver: null,
    isLoading: false,
  });

  const mergedDefaultOptions = useMemo(
    () => ({
      ...baseDefaultOptions,
      ...defaultOptions,
    }),
    [defaultOptions]
  );

  const updateConfig = useCallback(
    (
      newConfig: ConfirmOptions | ((prev: ConfirmOptions) => ConfirmOptions)
    ) => {
      setDialogState((prev) => ({
        ...prev,
        config:
          typeof newConfig === "function"
            ? newConfig(prev.config)
            : { ...prev.config, ...newConfig },
      }));
    },
    []
  );

  const setLoading = useCallback((loading: boolean) => {
    setDialogState((prev) => ({
      ...prev,
      isLoading: loading,
    }));
  }, []);

  const closeDialog = useCallback(() => {
    setDialogState((prev) => ({
      ...prev,
      isOpen: false,
      resolver: null,
      isLoading: false,
    }));
  }, []);

  const confirm = useCallback(
    (options: ConfirmOptions) => {
      setDialogState((prev) => ({
        isOpen: true,
        config: { ...mergedDefaultOptions, ...options },
        resolver: prev.resolver,
        isLoading: false,
      }));
      return new Promise<ConfirmResult>((resolve) => {
        setDialogState((prev) => ({
          ...prev,
          resolver: resolve,
        }));
      });
    },
    [mergedDefaultOptions]
  );

  const handleConfirm = useCallback(() => {
    setDialogState((prev) => {
      if (prev.resolver) {
        prev.resolver({
          confirmed: true,
          close: closeDialog,
        });
      }
      return prev; // Don't close automatically - let user control it
    });
  }, [closeDialog]);

  const handleCancel = useCallback(() => {
    setDialogState((prev) => {
      if (prev.resolver) {
        prev.resolver({
          confirmed: false,
          close: closeDialog,
        });
      }
      return {
        ...prev,
        isOpen: false,
        resolver: null,
        isLoading: false,
      };
    });
  }, [closeDialog]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open && !dialogState.isLoading) {
        handleCancel();
      }
    },
    [handleCancel, dialogState.isLoading]
  );

  const contextValue = useMemo(
    () => ({
      confirm,
      updateConfig,
      setLoading,
    }),
    [confirm, updateConfig, setLoading]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleConfirm();
      }
      if (e.key === "Escape") {
        e.preventDefault();
        handleCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleConfirm, handleCancel]);

  return (
    <ConfirmContext.Provider value={contextValue}>
      {children}
      <ConfirmDialog
        isOpen={dialogState.isOpen}
        onOpenChange={handleOpenChange}
        config={dialogState.config}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        setConfig={updateConfig}
        isLoading={dialogState.isLoading}
        setLoading={setLoading}
      />
    </ConfirmContext.Provider>
  );
};



/**
 * Hook to open a confirm dialog from anywhere in the app.
 *
 * @example
 * ```tsx
 * const confirm = useConfirm();
 *
 * const handleDelete = async () => {
 *   const result = await confirm({
 *     title: "Delete item?",
 *     description: "This action cannot be undone.",
 *     confirmText: "Delete",
 *   });
 *
 *   if (result.confirmed) {
 *     await deleteItem();
 *     result.close(); // close dialog programmatically
 *   }
 * };
 * ```
 */
export const useConfirm = () => {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error("useConfirm must be used within a ConfirmDialogProvider");
  }

  const { confirm, updateConfig, setLoading } = context;

  const enhancedConfirm = confirm;
  enhancedConfirm.updateConfig = updateConfig;
  enhancedConfirm.setLoading = setLoading;

  return enhancedConfirm as ConfirmFunction & {
    updateConfig: ConfirmContextValue["updateConfig"];
    setLoading: ConfirmContextValue["setLoading"];
  };
};
