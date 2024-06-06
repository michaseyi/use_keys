import { useContext } from "react"
import { KeyContext } from "./KeyContext"

export function useKeys() {
	const keyContext = useContext(KeyContext)

	if (!keyContext) throw new Error("KeyContext.Provider missing in tree")

	return keyContext
}
