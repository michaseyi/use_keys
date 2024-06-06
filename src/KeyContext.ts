import { createContext } from "react"
import { createKeyStore } from "./keyStore"

export const KeyContext = createContext<ReturnType<typeof createKeyStore> | null>(null)
