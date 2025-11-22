import type { AlertAction, AlertColor, AlertStyle, AlertDirection } from '@/stores/alert-store';
import { useAlertStore } from '@/stores/alert-store';

interface UseAlertOptions {
    color?: AlertColor;
    style?: AlertStyle;
    direction?: AlertDirection;
    duration?: number;
    title?: string;
    description?: string;
    actions?: AlertAction[];
}

/**
 * Composable hook for managing alerts
 * @example
 * const alert = useAlert();
 * alert.info('Information message');
 * alert.success('Success message', { duration: 3000 });
 * alert.warning('Warning message');
 * alert.error('Error message');
 *
 * // With actions
 * alert.warning('Accept cookies?', {
 *   title: 'Cookies',
 *   actions: [
 *     { label: 'Deny', onClick: () => console.log('Denied') },
 *     { label: 'Accept', onClick: () => console.log('Accepted'), variant: 'primary' }
 *   ]
 * });
 */
export function useAlert() {
    const store = useAlertStore();

    return {
        info: (message: string, options?: UseAlertOptions) => {
            return store.addAlert({
                message,
                color: 'info',
                direction: 'horizontal',
                duration: 5000,
                ...options,
            });
        },
        success: (message: string, options?: UseAlertOptions) => {
            return store.addAlert({
                message,
                color: 'success',
                direction: 'horizontal',
                duration: 4000,
                ...options,
            });
        },
        warning: (message: string, options?: UseAlertOptions) => {
            return store.addAlert({
                message,
                color: 'warning',
                direction: 'horizontal',
                duration: 6000,
                ...options,
            });
        },
        error: (message: string, options?: UseAlertOptions) => {
            return store.addAlert({
                message,
                color: 'error',
                direction: 'horizontal',
                duration: 7000,
                ...options,
            });
        },
        dismiss: (id: string) => {
            store.removeAlert(id);
        },
        dismissAll: () => {
            store.alerts.forEach((alert) => {
                store.removeAlert(alert.id);
            });
        },
    };
}
