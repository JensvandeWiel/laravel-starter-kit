<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Data\UserData;
use App\Models\User;

it('can instantiate a UserData object from a User model', function () {
    $data = UserData::from(User::factory()->create());

    $this->assertInstanceOf(UserData::class, $data);
});
