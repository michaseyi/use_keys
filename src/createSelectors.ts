import { StoreApi, UseBoundStore } from "zustand"
import { Key, KeyState } from "./Key.types"
import { KeyAction, KeyStore } from "./keyStore"
import { useKeys } from "./useKeys"
import { useEffect, useState } from "react"
import { isPressed } from "./helpers"

export type WithSelectors<S> = S extends { getState: () => infer T }
	? S & {
			use: {
				[K in keyof T]: () => T[K]
			}
	  }
	: never

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(_store: S) => {
	let store = _store as WithSelectors<typeof _store>
	store.use = {}
	for (let k of Object.keys(store.getState())) {
		;(store.use as any)[k] = () => store((s) => s[k as keyof typeof s])
	}

	return store
}

export type WithKeyComboSelector<S> = S extends { getState: () => infer T }
	? S & {
			use: {
				Combo: (...keys: Key[]) => KeyState
			}
	  }
	: never


export function createKeyComboSelector(
	_store: ReturnType<typeof createSelectors<UseBoundStore<StoreApi<KeyStore & KeyAction>>>>
) {
	let store = _store as WithKeyComboSelector<typeof _store>

	const useCombo = (...comboKeys: Key[]): KeyState => {
		const keys = useKeys()

		const keyStates = comboKeys.map((key) => keys.use[key]())

		const [comboState, setComboState] = useState(KeyState.Released)

		useEffect(() => {
			if (keyStates.every(isPressed)) {
				setComboState(KeyState.Pressed)
			} else {
				setComboState(KeyState.Released)
			}
		}, keyStates)

		return comboState
	}

	store.use.Combo = useCombo
	return store
}
