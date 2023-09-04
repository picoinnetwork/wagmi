import { type PartializedState } from './createConfig.js'
import { deserialize as deserialize_ } from './utils/deserialize.js'
import { serialize as serialize_ } from './utils/serialize.js'

// key-values for loose autocomplete and typing
export type StorageItemMap = {
  recentConnectorId: string
  state: PartializedState
}

export type Storage<
  itemMap extends Record<string, unknown> = {},
  ///
  storageItemMap extends StorageItemMap = StorageItemMap & itemMap,
> = {
  getItem<
    key extends keyof storageItemMap,
    value extends storageItemMap[key],
    defaultValue extends value | null,
  >(
    key: key,
    defaultValue?: defaultValue,
  ): defaultValue extends null ? value | null : value
  setItem<
    key extends keyof storageItemMap,
    value extends storageItemMap[key] | null,
  >(key: key, value: value): void
  removeItem(key: keyof storageItemMap): void
}

type BaseStorage = {
  getItem: (key: string) => string | null
  setItem: (key: string, value: string) => void
  removeItem: (key: string) => void
}

export type CreateStorageParameters = {
  deserialize?: (<T>(value: string) => T) | undefined
  key?: string | undefined
  serialize?: (<T>(value: T) => string) | undefined
  storage: BaseStorage
}

export function createStorage<
  itemMap extends Record<string, unknown> = {},
  storageItemMap extends StorageItemMap = StorageItemMap & itemMap,
>(parameters: CreateStorageParameters): Storage<storageItemMap> {
  const {
    deserialize = deserialize_,
    key: prefix = 'wagmi',
    serialize = serialize_,
    storage,
  } = parameters
  return {
    ...storage,
    getItem(key, defaultValue) {
      const value = storage.getItem(`${prefix}.${key as string}`)
      try {
        if (value) return deserialize(value)
        return (defaultValue ?? null) as any
      } catch (error) {
        console.warn(error)
        return defaultValue ?? null
      }
    },
    setItem(key, value) {
      const storageKey = `${prefix}.${key as string}`
      if (value === null) {
        storage.removeItem(storageKey)
      } else {
        try {
          storage.setItem(storageKey, serialize(value))
        } catch (err) {
          console.error(err)
        }
      }
    },
    removeItem(key) {
      storage.removeItem(`${prefix}.${key as string}`)
    },
  }
}

export const noopStorage: BaseStorage = {
  getItem: (_key) => '',
  setItem: (_key, _value) => null,
  removeItem: (_key) => null,
}