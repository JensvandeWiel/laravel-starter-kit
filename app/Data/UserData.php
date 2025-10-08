<?php

declare(strict_types=1);

namespace App\Data;

use Carbon\CarbonInterface;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
final class UserData extends Data
{
    public function __construct(
        public readonly int $id,
        public readonly string $name,
        public readonly string $email,
        public readonly ?CarbonInterface $email_verified_at,
        public readonly string $password,
        public readonly ?string $remember_token,
        public readonly CarbonInterface $created_at,
        public readonly CarbonInterface $updated_at,
    ) {}
}
