import { BaseError as CoreError } from '@wagmi/core'

import { getVersion } from '../utils/getVersion.js'

export class BaseError extends CoreError {
  override name = 'WagmiError'
  override get docsBaseUrl() {
    return 'https://alpha.wagmi.sh/react'
  }
  override get version() {
    return getVersion()
  }
}