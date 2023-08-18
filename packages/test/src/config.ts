import { createConfig } from '@wagmi/core'
import { http } from 'viem'

import { mainnet, mainnet2, optimism } from './chains.js'
import { testConnector } from './connector.js'
import { accounts } from './constants.js'

export const config = createConfig({
  chains: [mainnet, mainnet2, optimism],
  connectors: [
    testConnector({ accounts }),
    testConnector({ accounts: reverse(accounts) }),
  ],
  pollingInterval: 100,
  reconnectOnMount: false,
  storage: null,
  transports: {
    [mainnet.id]: http(),
    [mainnet2.id]: http(),
    [optimism.id]: http(),
  },
})

type Reverse<
  list extends readonly unknown[],
  ///
  result extends readonly unknown[] = [],
> = list extends readonly [infer head, ...infer tail]
  ? Reverse<tail, [head, ...result]>
  : result

function reverse<list extends readonly unknown[]>(list: list): Reverse<list> {
  return [...list].reverse() as Reverse<list>
}
