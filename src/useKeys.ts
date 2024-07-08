import { useContext, useLayoutEffect } from "react"
import { KeyContext } from "./KeyContext"
import { Rule } from "./keyStore"

export function useKeys(rule?: Rule) {
	const keyContext = useContext(KeyContext)

	if (!keyContext) throw new Error("KeyContext.Provider missing in tree")

	const addRule = keyContext.use.addRule()

	useLayoutEffect(() => {
		if (rule) {
			return addRule(rule)
		}
	}, [])

	return keyContext
}
