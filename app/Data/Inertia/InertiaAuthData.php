<?php

declare(strict_types=1);

namespace App\Data\Inertia;

use App\Data\UserData;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
final class InertiaAuthData extends Data
{
    public function __construct(
        public ?UserData $user,
    ) {}
}
