<?php

declare(strict_types=1);

namespace Tests\Unit\Data;

use App\Data\Inertia\InertiaAuthData;
use Tests\TestCase;

final class InertiaAuthDataTest extends TestCase
{
    public function test_can_instantiate_inertia_auth_data(): void
    {
        $data = new InertiaAuthData(null);
        $this->assertInstanceOf(InertiaAuthData::class, $data);
    }
}
