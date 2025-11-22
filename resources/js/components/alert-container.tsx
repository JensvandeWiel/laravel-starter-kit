import { Alert } from '@/components/alert';
import { useAlertStore } from '@/stores/alert-store';
import { X } from 'lucide-react';
import React from 'react';

export function AlertContainer() {
    const store = useAlertStore();

    const getButtonVariantClass = (variant?: 'primary' | 'secondary' | 'ghost' | 'error') => {
        switch (variant) {
            case 'primary':
                return 'btn-primary';
            case 'error':
                return 'btn-error';
            case 'ghost':
                return 'btn-ghost';
            case 'secondary':
            default:
                return '';
        }
    };

    return (
        <div className="overflow-x-hidden pointer-events-none fixed bottom-4 right-0 px-4 md:pr-4 flex flex-col gap-3 max-h-screen overflow-y-auto w-full md:w-96">
            {store.alerts.map((alert) => (
                <div
                    key={alert.id}
                    style={{
                        animation: store.isExiting(alert.id)
                            ? 'slideOutRight 0.25s ease-in-out forwards'
                            : 'slideInRight 0.3s ease-out forwards',
                    }}
                    className="pointer-events-auto"
                >
                    <Alert
                        color={alert.color}
                        style={alert.style}
                        title={alert.title}
                        description={alert.description || alert.message}
                        direction={alert.direction || 'vertical'}
                        action={
                            <div className="flex items-center gap-2">
                                {alert.actions && alert.actions.length > 0 && (
                                    <div className="flex gap-2">
                                        {alert.actions.map((action, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => {
                                                    action.onClick(alert.id);
                                                    if (action.stayOpenOnClick !== true) {
                                                        store.removeAlert(alert.id);
                                                    }
                                                }}
                                                className={`btn btn-sm ${getButtonVariantClass(action.variant)}`}
                                            >
                                                {action.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                                <button
                                    onClick={() => store.removeAlert(alert.id)}
                                    className="btn btn-ghost btn-sm btn-circle ml-auto"
                                    aria-label="Close alert"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        }
                    />
                </div>
            ))}
            <style>{`
                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(400px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                @keyframes slideOutRight {
                    from {
                        opacity: 1;
                        transform: translateX(0);
                    }
                    to {
                        opacity: 0;
                        transform: translateX(400px);
                    }
                }
            `}</style>
        </div>
    );
}
