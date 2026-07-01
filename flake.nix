{
  description = "DraughtsMind development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
    in {
      devShells.${system}.default = pkgs.mkShell {
        buildInputs = with pkgs; [
          nodejs_22
          gnumake
          gcc
          python3
          pkg-config
          electron
          glib
          gtk3
          nss
          nspr
          libdrm
          mesa
          pango
          cairo
          alsa-lib
          cups
          libexif
          libnotify
          xorg.libX11
          xorg.libXcomposite
          xorg.libXdamage
          xorg.libXext
          xorg.libXfixes
          xorg.libXrandr
          xorg.libxcb
          libxkbcommon
          dbus
          udev
          expat
        ];

        shellHook = ''
          export LD_LIBRARY_PATH="${pkgs.lib.makeLibraryPath [
            pkgs.glib
            pkgs.gtk3
            pkgs.nss
            pkgs.nspr
            pkgs.pango
            pkgs.cairo
            pkgs.alsa-lib
            pkgs.libdrm
            pkgs.mesa
            pkgs.xorg.libX11
            pkgs.xorg.libxcb
            pkgs.libxkbcommon
            pkgs.cups
            pkgs.dbus
            pkgs.udev
            pkgs.expat
            pkgs.libnotify
            pkgs.libexif
          ]}:$LD_LIBRARY_PATH"
          echo "DraughtsMind dev shell ready"
          echo "  npm install        — install deps"
          echo "  npm start          — run Electron"
          echo "  npm test           — run tests"
          echo "  cd server && npm install && node index.js — run web server"
        '';
      };
    };
}
