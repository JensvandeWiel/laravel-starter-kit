import { PageProps } from '@/types/global';
import { router } from '@inertiajs/react';
import { useAlert } from '@/composables/use-alert';

export default function Welcome({ auth }: PageProps) {
    const alert = useAlert();

    const handleInfoAlert = () => {
        alert.info('This is an informational message');
    };

    const handleSuccessAlert = () => {
        alert.success('Operation completed successfully!');
    };

    const handleWarningAlert = () => {
        alert.warning('Please be careful with this action', {
            duration: 8000,
        });
    };

    const handleErrorAlert = () => {
        alert.error('Something went wrong', {
            title: 'Error Occurred',
            description: 'Please try again or contact support',
            duration: 0, // Don't auto-close
        });
    };

    const handleCustomAlert = () => {
        alert.success('Custom alert with longer duration', {
            title: 'Success!',
            description: 'This alert has a custom title and description',
            duration: 10000,
        });
    };

    const handleAlertWithActions = () => {
        alert.warning('Do you want to accept cookies?', {
            title: 'Cookie Policy',
            description: 'We use cookies to improve your experience',
            duration: 0,
            actions: [
                {
                    label: 'Deny',
                    onClick: () => console.log('Cookies denied'),
                },
                {
                    label: 'Accept',
                    onClick: () => console.log('Cookies accepted'),
                    variant: 'primary',
                },
            ],
        });
    };

    const handleAlertWithSingleAction = () => {
        alert.info('New message received', {
            title: 'Message',
            description: 'You have a new message from John',
            duration: 0,
            actions: [
                {
                    label: 'View',
                    onClick: () => console.log('Viewing message'),
                    variant: 'primary',
                },
            ],
        });
    };

    const handleOutlineStyleAlerts = () => {
        alert.info('Info with outline style', {
            style: 'outline',
            duration: 5000,
        });
        setTimeout(() => {
            alert.success('Success with outline style', {
                style: 'outline',
                duration: 5000,
            });
        }, 200);
        setTimeout(() => {
            alert.warning('Warning with outline style', {
                style: 'outline',
                duration: 5000,
            });
        }, 400);
        setTimeout(() => {
            alert.error('Error with outline style', {
                style: 'outline',
                duration: 5000,
            });
        }, 600);
    };

    const handleDashStyleAlerts = () => {
        alert.info('Info with dash style', {
            style: 'dash',
            duration: 5000,
        });
        setTimeout(() => {
            alert.success('Success with dash style', {
                style: 'dash',
                duration: 5000,
            });
        }, 200);
        setTimeout(() => {
            alert.warning('Warning with dash style', {
                style: 'dash',
                duration: 5000,
            });
        }, 400);
        setTimeout(() => {
            alert.error('Error with dash style', {
                style: 'dash',
                duration: 5000,
            });
        }, 600);
    };

    const handleSoftStyleAlerts = () => {
        alert.info('Info with soft style', {
            style: 'soft',
            duration: 5000,
        });
        setTimeout(() => {
            alert.success('Success with soft style', {
                style: 'soft',
                duration: 5000,
            });
        }, 200);
        setTimeout(() => {
            alert.warning('Warning with soft style', {
                style: 'soft',
                duration: 5000,
            });
        }, 400);
        setTimeout(() => {
            alert.error('Error with soft style', {
                style: 'soft',
                duration: 5000,
            });
        }, 600);
    };

    const handleDismissAll = () => {
        alert.dismissAll();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-slate-800 rounded-lg shadow-2xl p-8 border border-slate-700">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Welcome {auth ? auth.user?.name : 'Guest'}
                    </h1>
                    <p className="text-slate-400 mb-8">
                        Use the buttons below to test the alert composable system
                    </p>

                    <div className="space-y-4 mb-8">
                        <button
                            onClick={handleInfoAlert}
                            className="btn btn-info w-full"
                        >
                            Show Info Alert
                        </button>

                        <button
                            onClick={handleSuccessAlert}
                            className="btn btn-success w-full"
                        >
                            Show Success Alert
                        </button>

                        <button
                            onClick={handleWarningAlert}
                            className="btn btn-warning w-full"
                        >
                            Show Warning Alert
                        </button>

                        <button
                            onClick={handleErrorAlert}
                            className="btn btn-error w-full"
                        >
                            Show Error Alert (Manual Close)
                        </button>

                        <button
                            onClick={handleCustomAlert}
                            className="btn btn-primary w-full"
                        >
                            Show Custom Alert
                        </button>

                        <button
                            onClick={handleAlertWithActions}
                            className="btn btn-secondary w-full"
                        >
                            Alert with Multiple Actions
                        </button>

                        <button
                            onClick={handleAlertWithSingleAction}
                            className="btn btn-secondary w-full"
                        >
                            Alert with Single Action
                        </button>

                        <button
                            onClick={handleDismissAll}
                            className="btn btn-outline w-full"
                        >
                            Dismiss All Alerts
                        </button>

                        <button
                            onClick={handleOutlineStyleAlerts}
                            className="btn btn-outline w-full"
                        >
                            Show Outline Style Alerts
                        </button>

                        <button
                            onClick={handleDashStyleAlerts}
                            className="btn btn-outline w-full"
                        >
                            Show Dash Style Alerts
                        </button>

                        <button
                            onClick={handleSoftStyleAlerts}
                            className="btn btn-outline w-full"
                        >
                            Show Soft Style Alerts
                        </button>
                    </div>

                    <div className="bg-slate-700 rounded-lg p-4 mb-8 border border-slate-600">
                        <h2 className="text-lg font-semibold text-white mb-3">
                            Usage Example:
                        </h2>
                        <pre className="text-sm text-slate-300 overflow-x-auto">
{`import { useAlert } from '@/composables/use-alert';

export function MyComponent() {
  const alert = useAlert();

  return (
    <>
      <button onClick={() => alert.success('Done!')}>
        Success
      </button>
      <button onClick={() => alert.warning('Accept?', {
        actions: [
          { label: 'No', onClick: () => {} },
          { label: 'Yes', onClick: () => {}, variant: 'primary' }
        ]
      })}>
        With Actions
      </button>
    </>
  );
}`}
                        </pre>
                    </div>

                    {auth && (
                        <button
                            onClick={() => router.post('logout')}
                            className="btn btn-ghost w-full text-slate-400 hover:text-white"
                        >
                            Logout
                        </button>
                    )}
                </div>

                <div className="mt-8 bg-slate-800 rounded-lg shadow-2xl p-8 border border-slate-700">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Alert Composable Features
                    </h2>
                    <ul className="text-slate-300 space-y-2">
                        <li className="flex items-start">
                            <span className="text-success mr-3">✓</span>
                            <span>
                                <strong>Bottom-right positioning:</strong> Alerts appear in the fixed bottom-right corner
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-success mr-3">✓</span>
                            <span>
                                <strong>Static width:</strong> All alerts maintain a consistent 384px width
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-success mr-3">✓</span>
                            <span>
                                <strong>Vertical growth:</strong> Multiple alerts stack vertically as needed
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-success mr-3">✓</span>
                            <span>
                                <strong>Auto-dismiss:</strong> Alerts automatically close after a configurable duration
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-success mr-3">✓</span>
                            <span>
                                <strong>Lucide icons:</strong> Built-in icons for each alert type (info, success, warning, error)
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-success mr-3">✓</span>
                            <span>
                                <strong>Manual dismiss:</strong> Users can close alerts with the X button
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-success mr-3">✓</span>
                            <span>
                                <strong>Customizable:</strong> Support for titles, descriptions, durations, and styles
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-success mr-3">✓</span>
                            <span>
                                <strong>Action buttons:</strong> Add interactive buttons with custom callbacks (Deny/Accept, View, etc.)
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-success mr-3">✓</span>
                            <span>
                                <strong>Button variants:</strong> Support for primary, secondary, ghost, and error button styles
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-success mr-3">✓</span>
                            <span>
                                <strong>Smooth animations:</strong> Alerts slide in from the right and fade in/out smoothly
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
