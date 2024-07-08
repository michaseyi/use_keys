import { KeyState } from "./types"

export function isPressed(keyState: KeyState) {
	return keyState === KeyState.Pressed
}
export function isReleased(keyState: KeyState) {
	return keyState === KeyState.Released
}
