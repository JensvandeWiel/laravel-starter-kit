<?php

declare(strict_types=1);

use App\Http\Middleware\HandleInertiaRequests;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

test('version returns string or null', function () {
    $middleware = new HandleInertiaRequests();
    $request = Request::create('/', 'GET');
    $result = $middleware->version($request);
    expect($result === null || is_string($result))->toBeTrue();
});

test('share returns inertia shared data', function () {
    $middleware = new HandleInertiaRequests();
    $request = Request::create('/', 'GET');
    $result = $middleware->share($request);
    expect($result)->toBeArray();
    expect($result)->toHaveKeys(['auth', 'errors']);
});

test('share with authenticated user', function () {
    $user = User::factory()->create();
    Auth::shouldReceive('user')->andReturn($user);

    $middleware = new HandleInertiaRequests();
    $request = Request::create('/', 'GET');
    $request->setUserResolver(fn () => $user);

    $result = $middleware->share($request);

    expect($result)->toBeArray();
    expect($result['auth'])->not->toBeNull();
    expect($result['auth']['user']['name'])->toBe($user->name);
    expect($result['auth']['user']['email'])->toBe($user->email);
});

test('share with unauthenticated user', function () {
    Auth::shouldReceive('user')->andReturn(null);

    $middleware = new HandleInertiaRequests();
    $request = Request::create('/', 'GET');
    $request->setUserResolver(fn () => null);

    $result = $middleware->share($request);

    expect($result)->toBeArray();
    expect($result['auth'])->toBeNull();
});
