{
    description = "Laravel dev flake";

    inputs = {
        nixpkgs.url = "nixpkgs/nixos-unstable";
        flake-utils.url = "github:numtide/flake-utils";
    };

    outputs = { self, nixpkgs, flake-utils }:
        flake-utils.lib.eachDefaultSystem (system:
            let
                pkgs = import nixpkgs { inherit system; };

                # Define the aliases script
                sail = pkgs.writeShellScriptBin "sail" ''
                    exec ./vendor/bin/sail $@'';
                dev = pkgs.writeShellScriptBin "dev" ''
                    exec composer dev'';
                run-test = pkgs.writeShellScriptBin "run-test" ''
                    exec sail composer test'';
                install-deps = pkgs.writeShellScriptBin "install-deps" ''
                    composer install
                    bun install
                    bunx -b playwright install
                '';
                update-deps = pkgs.writeShellScriptBin "update-deps" ''
                    sail composer update:requirements
                    sail bunx -b playwright install
                '';
                lint = pkgs.writeShellScriptBin "lint" ''
                    exec sail composer lint'';
            in {
                # Define devShell with aliases
                devShell = pkgs.mkShell {
                    name = "laravel-dev-shell";
                    buildInputs = with pkgs; [
                        docker
                        docker-compose
                        bun
                        php84
                        php84Packages.composer
                        postgresql
                        sail
                        dev
                        run-test
                        install-deps
                        lint
                        update-deps
                    ];

                    shellHook = ''
                        export PLAYWRIGHT_BROWSERS_PATH=0
                        export PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=true
                        alias pint="sail artisan pint"
                        echo 'Laravel dev environment loaded'
                    '';
                };

                nixosModule = {
                    config = {
                        services.docker.enable = true;
                        virtualisation.docker.enable = true;

                        # Ensure Docker Compose is accessible system-wide
                        environment.systemPackages = with pkgs; [
                            docker-compose
                        ];
                    };
                };
        });
}
