#!/usr/bin/env bash

# install gpg
brew install gpg

# install asdf
git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.4.1
echo -e '\n. $HOME/.asdf/asdf.sh' >> ~/.bash_profile
echo -e '\n. $HOME/.asdf/completions/asdf.bash' >> ~/.bash_profile

# install the asdf nodejs plugin
asdf plugin-add nodejs https://github.com/asdf-vm/asdf-nodejs.git
bash ~/.asdf/plugins/nodejs/bin/import-release-team-keyring

# install the latest nodejs 6 stable release and use it locally
asdf install nodejs 6.12.3
asdf local nodejs 6.12.3