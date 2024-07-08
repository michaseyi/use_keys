import { create } from "zustand"
import { createKeyComboSelector, createSelectors } from "./createSelectors"
import { Key, KeyState } from "./types"

export type Rule = (state: KeyStore) => boolean

export type KeyStore = {
	[K in Key]: KeyState
} & {
	rules: Set<Rule>
}

export type KeyAction = {
	setKeyState: (key: Key, state: KeyState) => void
	addRule: (rule: Rule) => () => void
}

const DEFAULT_KEY_STATES: KeyStore = {
	rules: new Set(),
	[Key.Backspace]: KeyState.Released,
	[Key.Tab]: KeyState.Released,
	[Key.Enter]: KeyState.Released,
	[Key.Shift]: KeyState.Released,
	[Key.Ctrl]: KeyState.Released,
	[Key.Alt]: KeyState.Released,
	[Key.Pause]: KeyState.Released,
	[Key.CapsLock]: KeyState.Released,
	[Key.Escape]: KeyState.Released,
	[Key.Space]: KeyState.Released,
	[Key.PageUp]: KeyState.Released,
	[Key.PageDown]: KeyState.Released,
	[Key.End]: KeyState.Released,
	[Key.Home]: KeyState.Released,
	[Key.ArrowLeft]: KeyState.Released,
	[Key.ArrowUp]: KeyState.Released,
	[Key.ArrowRight]: KeyState.Released,
	[Key.ArrowDown]: KeyState.Released,
	[Key.PrintScreen]: KeyState.Released,
	[Key.Insert]: KeyState.Released,
	[Key.Delete]: KeyState.Released,
	[Key.Digit0]: KeyState.Released,
	[Key.Digit1]: KeyState.Released,
	[Key.Digit2]: KeyState.Released,
	[Key.Digit3]: KeyState.Released,
	[Key.Digit4]: KeyState.Released,
	[Key.Digit5]: KeyState.Released,
	[Key.Digit6]: KeyState.Released,
	[Key.Digit7]: KeyState.Released,
	[Key.Digit8]: KeyState.Released,
	[Key.Digit9]: KeyState.Released,
	[Key.KeyA]: KeyState.Released,
	[Key.KeyB]: KeyState.Released,
	[Key.KeyC]: KeyState.Released,
	[Key.KeyD]: KeyState.Released,
	[Key.KeyE]: KeyState.Released,
	[Key.KeyF]: KeyState.Released,
	[Key.KeyG]: KeyState.Released,
	[Key.KeyH]: KeyState.Released,
	[Key.KeyI]: KeyState.Released,
	[Key.KeyJ]: KeyState.Released,
	[Key.KeyK]: KeyState.Released,
	[Key.KeyL]: KeyState.Released,
	[Key.KeyM]: KeyState.Released,
	[Key.KeyN]: KeyState.Released,
	[Key.KeyO]: KeyState.Released,
	[Key.KeyP]: KeyState.Released,
	[Key.KeyQ]: KeyState.Released,
	[Key.KeyR]: KeyState.Released,
	[Key.KeyS]: KeyState.Released,
	[Key.KeyT]: KeyState.Released,
	[Key.KeyU]: KeyState.Released,
	[Key.KeyV]: KeyState.Released,
	[Key.KeyW]: KeyState.Released,
	[Key.KeyX]: KeyState.Released,
	[Key.KeyY]: KeyState.Released,
	[Key.KeyZ]: KeyState.Released,
	[Key.Meta]: KeyState.Released,
	[Key.ContextMenu]: KeyState.Released,
	[Key.Numpad0]: KeyState.Released,
	[Key.Numpad1]: KeyState.Released,
	[Key.Numpad2]: KeyState.Released,
	[Key.Numpad3]: KeyState.Released,
	[Key.Numpad4]: KeyState.Released,
	[Key.Numpad5]: KeyState.Released,
	[Key.Numpad6]: KeyState.Released,
	[Key.Numpad7]: KeyState.Released,
	[Key.Numpad8]: KeyState.Released,
	[Key.Numpad9]: KeyState.Released,
	[Key.NumpadMultiply]: KeyState.Released,
	[Key.NumpadAdd]: KeyState.Released,
	[Key.NumpadSubtract]: KeyState.Released,
	[Key.NumpadDecimal]: KeyState.Released,
	[Key.NumpadDivide]: KeyState.Released,
	[Key.F1]: KeyState.Released,
	[Key.F2]: KeyState.Released,
	[Key.F3]: KeyState.Released,
	[Key.F4]: KeyState.Released,
	[Key.F5]: KeyState.Released,
	[Key.F6]: KeyState.Released,
	[Key.F7]: KeyState.Released,
	[Key.F8]: KeyState.Released,
	[Key.F9]: KeyState.Released,
	[Key.F10]: KeyState.Released,
	[Key.F11]: KeyState.Released,
	[Key.F12]: KeyState.Released,
	[Key.NumLock]: KeyState.Released,
	[Key.ScrollLock]: KeyState.Released,
	[Key.Semicolon]: KeyState.Released,
	[Key.Equal]: KeyState.Released,
	[Key.Comma]: KeyState.Released,
	[Key.Minus]: KeyState.Released,
	[Key.Period]: KeyState.Released,
	[Key.Slash]: KeyState.Released,
	[Key.Backquote]: KeyState.Released,
	[Key.BracketLeft]: KeyState.Released,
	[Key.Backslash]: KeyState.Released,
	[Key.BracketRight]: KeyState.Released,
	[Key.Quote]: KeyState.Released,
}

export function createKeyStore() {
	const store = create<KeyStore & KeyAction>()((set) => ({
		...DEFAULT_KEY_STATES,
		setKeyState: (key, state) => set({ [key]: state }),
		addRule: (rule) => {
			set((state) => {
				const rules = new Set(state.rules)
				rules.add(rule)
				return { rules }
			})
			return () => {
				set((state) => {
					const rules = new Set(state.rules)
					rules.delete(rule)
					return { rules }
				})
			}
		},
	}))

	return createKeyComboSelector(createSelectors(store))
}
