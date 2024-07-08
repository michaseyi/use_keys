import { useCallback, useLayoutEffect, useRef } from "react"
import { KeyState } from "./Key.types"
import { keyCodeToKeyMap } from "./keyCodeToKeyMap"
import { createKeyStore } from "./keyStore"
import { KeyContext } from "./KeyContext"

export function KeyProvider({ children }: { children?: React.ReactNode }) {
	const store = useRef(createKeyStore()).current
	const setKeyState = store.use.setKeyState()

	const onKeyDown = useCallback((ev: KeyboardEvent) => {
		setKeyState(keyCodeToKeyMap[ev.code], KeyState.Pressed)

		const state = store.getState()

		for (const rule of state.rules) {
			if (rule(state)) {
				ev.preventDefault()
				return
			}
		}
	}, [])
	const onKeyUp = useCallback((ev: KeyboardEvent) => {
		setKeyState(keyCodeToKeyMap[ev.code], KeyState.Released)
	}, [])

	useLayoutEffect(() => {
		document.addEventListener("keydown", onKeyDown)
		document.addEventListener("keyup", onKeyUp)
		return () => {
			document.removeEventListener("keydown", onKeyDown)
			document.removeEventListener("keyup", onKeyUp)
		}
	}, [])

	return <KeyContext.Provider value={store}> {children} </KeyContext.Provider>
}
