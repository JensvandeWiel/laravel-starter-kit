<?php

declare(strict_types=1);

namespace Tests\Unit\Data;

use App\Data\Inertia\InertiaAuthData;

it('can instantiate inertia auth data', function (): void {
    $data = new InertiaAuthData(
        user: null,
    );

    expect($data)->toBeInstanceOf(InertiaAuthData::class);
});
