<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Data\Inertia\InertiaSharedData;
use App\Data\UserData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Inertia\Middleware;

final class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return InertiaSharedData::from(
            array_merge(
                parent::share($request),
                $this->authData($request),
                [
                    'locale' => App::getLocale(),
                    'fallbackLocale' => App::getFallbackLocale(),
                ],
            )
        )->toArray();
    }

    /**
     * Get the authentication data for the current request.
     *
     * @return array<string, mixed>
     */
    private function authData(Request $request): array
    {
        if ($user = $request->user()) {
            return [
                'auth' => [
                    'user' => UserData::from($user),
                ],
            ];
        }

        return ['auth' => null];
    }
}
