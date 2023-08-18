import { chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getFeeDataQueryOptions } from './getFeeData.js'

test('default', () => {
  expect(getFeeDataQueryOptions(config)).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "feeData",
        {},
      ],
    }
  `)
})

test('parameters: chainId', () => {
  expect(
    getFeeDataQueryOptions(config, { chainId: chain.mainnet.id }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "feeData",
        {
          "chainId": 1,
        },
      ],
    }
  `)
})
