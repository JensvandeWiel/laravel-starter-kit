<?php

declare(strict_types=1);

namespace App\Data\Inertia;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
final class InertiaSharedData extends Data
{
    public function __construct(
        public readonly ?InertiaAuthData $auth,
        /** @var object|array<string, object>|array<string, string>|array<string, array<string, string>> $errors */
        public array|object $errors,
    ) {}
}
