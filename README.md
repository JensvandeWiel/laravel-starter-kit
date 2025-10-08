# Laravel Starter Kit
Based on [Laravel Starter Kit (Nunomaduro)](https://github.com/nunomaduro/laravel-starter-kit) with additional tools and configurations.

## Features
- **100% Type Coverage**: Every method, property, and parameter is explicitly typed
- **Zero Tolerance for Code Smells**: Rector and PHPStan at maximum strictness catch issues before they become bugs
- **Immutable-First Architecture**: Data structures favor immutability to prevent unexpected mutations
- **Fail-Fast Philosophy**: Errors are caught at compile-time, not runtime
- **Automated Code Quality**: Pre-configured tools ensure consistent, pristine code across your entire team
- **Just Better Laravel Defaults**: Thanks to **[Essentials](https://github.com/nunomaduro/essentials)** / strict models, auto eager loading, immutable dates, and more...
- **Type-Safe Frontend Integration**: Automatic generation of TypeScript types from PHP models using laravel-data for seamless backend-frontend communication
- **Strict Typescript Inertia + React frontend**: A fully typed Inertia + React frontend setup with Vite, ESLint, Prettier, and TailwindCSS
- **Nix flake + Direnv**: Reproducible development environments with Nix and Direnv
- **Dockerized with Laravel Sail**: Easy setup and deployment with Docker and Laravel Sail

This isn't just another Laravel boilerplate—it's a statement that PHP applications can and should be built with the same rigor as strongly-typed languages like Rust or TypeScript.

### Initial Setup

Navigate to your project and complete the setup:

```bash
cd example-app

# Enable nix flake using direnv
cp .envrc.example .envrc
direnv allow

# Install all dependencies
install-deps

# Copy the example environment file
cp .env.example .env

# Create the application key
php artisan key:generate
# Startup laravel sail
dev
# Migrate the database
php artisan migrate
```

### Verify Installation

Run the test suite to ensure everything is configured correctly:

```bash
run-test
```

You should see 100% test coverage and all quality checks passing.

## Available Tooling (shell (preferred))
### Development
- `dev` - Starts Laravel server, queue worker, log monitoring, and Vite dev server concurrently
- `artisan` - Shortcut to `sail artisan`
- `generate-types` - Generates PHP Data Types to typescript types

### Code Quality
- `lint` - Runs Rector (refactoring), Pint (PHP formatting), and Prettier (JS/TS formatting)
- `test-lint` - Dry-run mode for CI/CD pipelines

### Testing
- `run-test` - Runs the complete test suite (type coverage, unit tests, linting, static analysis)

### Maintenance
- `update-deps` - Updates all PHP and NPM dependencies to latest versions and also the puppeteer browsers

## Available Tooling (composer)

### Development
- `composer dev` - Starts Laravel server, queue worker, log monitoring, and Vite dev server concurrently
- `composer generate:types` - Generates PHP Data Types to typescript types

### Code Quality
- `composer lint` - Runs Rector (refactoring), Pint (PHP formatting), and Prettier (JS/TS formatting)
- `composer test:lint` - Dry-run mode for CI/CD pipelines

### Testing
- `composer test:type-coverage` - Ensures 100% type coverage with Pest
- `composer test:types` - Runs PHPStan at level 9 (maximum strictness)
- `composer test:unit` - Runs Pest tests with 100% code coverage requirement
- `composer test` - Runs the complete test suite (type coverage, unit tests, linting, static analysis)

### Maintenance
- `composer update:requirements` - Updates all PHP and NPM dependencies to latest versions

## License

**Laravel Starter Kit** was created by **Jens van de Wiel** under the **[MIT license](https://opensource.org/licenses/MIT)**.
