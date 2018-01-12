# PITCH

Token contract:
- ERC-223 or ERC-20 standard.
- Admin address may "activate" transfers (and this will be done after the ICO.)
- Transfer function blocked prior to activation by contract "admin".  Exception is that admin can send.
- Must trigger function inside recipient contract described below.


Token Sale Contract:
- Send ETH to contract address (default function).
- Receive back correct amount of tokens at address that sent ETH.
- Maybe reject addresses that are not on whitelist.

Token Accepting Contract and attached app:
- Takes in tokens.
- When it receives tokens from specific address, it 1:1 credits a specific username on the Pitch Investors Live centralized app using the API for this app.


## Dev

1. Install Ganache http://truffleframework.com/ganache/
2. Run `./dev-macos-setup.sh` or read it and do the equivalent
3. Close your terminal window and open a new one in the project
4. Run `npm install -g truffle`
5. Run `truffle develop` or `truffle develop log`
6. Open a new tab in terminal.
7. Run `truffle test`
