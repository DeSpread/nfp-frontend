import {
  TransactionsApi,
  SmartContractsApi,
  AccountsApi,
  Configuration,
  InfoApi
} from '@stacks/blockchain-api-client';
import { StacksTestnet, StacksMainnet } from '@stacks/network';

export const testnet = process.env.NEXT_PUBLIC_CHAIN === 'testnet';
export const localMocknet = process.env.NEXT_PUBLIC_CHAIN === 'local'
export const mainnet = process.env.NEXT_PUBLIC_CHAIN === 'mainnet'

export const chainSuffix = `?chain=${mainnet ? 'mainnet' : testnet ? 'testnet' : 'mocknet'}`;
export const beta = process.env.NEXT_PUBLIC_AUTH_ORIGIN === 'beta';
export const localNode = localMocknet;
export const localAuth = false;
export const mocknet = localMocknet;

export const authOrigin = localAuth
  ? 'http://localhost:3000'
  : beta
    ? 'https://pr-725.app.stacks.engineering/'
    : 'https://app.blockstack.org';

export const CONTRACT_ADDRESS = mocknet
  ? 'STB44HYPYAT2BB2QE513NSP81HTMYWBJP02HPGK6' //ADDR1 from Stacks.toml
  : testnet
    ? 'STR8P3RD1EHA8AA37ERSSSZSWKS9T2GYQFGXNA4C'
    : 'SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE';
export const GENESIS_CONTRACT_ADDRESS = mocknet
  ? 'ST000000000000000000002AMW42H'
  : testnet
    ? 'ST000000000000000000002AMW42H'
    : 'SP000000000000000000002Q6VF78';
export const BNS_CONTRACT_NAME = 'bns';

export const STACK_API_URL = localNode
  ? 'http://localhost:3999'
  : mainnet
    ? 'https://stacks-node-api.mainnet.stacks.co'
    : 'https://stacks-node-api.testnet.stacks.co';
export const STACKS_API_WS_URL = localNode
  ? 'ws:localhost:3999/'
  : mainnet
    ? 'ws://stacks-node-api.mainnet.stacks.co/'
    : 'ws://stacks-node-api.testnet.stacks.co/';
export const STACKS_API_ACCOUNTS_URL = `${STACK_API_URL}/v2/accounts`;

export const NETWORK = mainnet ? new StacksMainnet() : new StacksTestnet();

const basePath = STACK_API_URL;
const config = new Configuration({ basePath });
export const accountsApi = new AccountsApi(config);
export const smartContractsApi = new SmartContractsApi(config);
export const transactionsApi = new TransactionsApi(config);
export const infoApi = new InfoApi(config);
