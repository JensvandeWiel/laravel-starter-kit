import React from 'react';

export type AlertColor = 'info' | 'success' | 'warning' | 'error';
export type AlertStyle = 'default' | 'outline' | 'dash' | 'soft';
export type AlertDirection = 'horizontal' | 'vertical';

export interface AlertAction {
    label: string;
    onClick: (id: string) => void;
    variant?: 'primary' | 'secondary' | 'ghost' | 'error';
    stayOpenOnClick?: boolean;
}

export interface AlertItem {
    id: string;
    message: string;
    color: AlertColor;
    style?: AlertStyle;
    direction?: AlertDirection;
    duration?: number; // ms, 0 = no auto-close
    title?: string;
    description?: string;
    actions?: AlertAction[];
}

interface AlertStore {
    alerts: AlertItem[];
    exitingAlerts?: Set<string>;
    addAlert: (alert: Omit<AlertItem, 'id'>) => string;
    removeAlert: (id: string) => void;
    isExiting: (id: string) => boolean;
}

const AlertStoreContext = React.createContext<AlertStore | null>(null);

export function useAlertStore(): AlertStore {
    const store = React.useContext(AlertStoreContext);
    if (!store) {
        throw new Error('useAlertStore must be used within AlertProvider');
    }
    return store;
}

export function AlertProvider({ children }: { children: React.ReactNode }) {
    const [alerts, setAlerts] = React.useState<AlertItem[]>([]);
    const [exitingAlerts, setExitingAlerts] = React.useState<Set<string>>(new Set());

    const addAlert = (alert: Omit<AlertItem, 'id'>) => {
        const id = `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const newAlert: AlertItem = { ...alert, id };

        setAlerts((prev) => [...prev, newAlert]);

        // Auto-close if duration is set and greater than 0
        if (alert.duration && alert.duration > 0) {
            setTimeout(() => {
                removeAlert(id);
            }, alert.duration);
        }

        return id;
    };

    const deleteAlert = (id: string) => {
        setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    };

    const removeAlert = (id: string) => {
        // Mark alert as exiting to trigger exit animation
        setExitingAlerts((prev) => new Set([...prev, id]));

        // Remove from DOM after animation completes
        setTimeout(() => {
            deleteAlert(id);
            setExitingAlerts((prev) => {
                const newSet = new Set(prev);
                newSet.delete(id);
                return newSet;
            });
        }, 250); // Match the duration of exit animation
    };

    const isExiting = (id: string) => {
        return exitingAlerts.has(id);
    }

    const value: AlertStore = {
        alerts,
        addAlert,
        exitingAlerts,
        removeAlert,
        isExiting,
    };

    return (
        React.createElement(
            AlertStoreContext.Provider,
            { value },
            children,
        ) as React.ReactElement
    );
}
