import type { ID, Module } from './types'

import { useState, useEffect, useCallback } from 'react'
import produce from 'immer'
import { useRouter } from 'next/router'

type WindowStore = Record<ID, Module>
const DEFAULTS: WindowStore = {
    '0': 'react@16',
    '1': 'react@17',
}

const usePersistedWindows = () => {
    const router = useRouter()
    const [windows, setWindows] = useState<WindowStore>({})

    const update = useCallback(
        (id: ID, module: Module) => {
            setWindows(
                produce(windows, (draft) => {
                    draft[id] = module
                })
            )
        },
        [windows]
    )

    const remove = useCallback(
        (id: ID) => {
            setWindows(
                produce(windows, (draft) => {
                    // remove the entry
                    delete draft[id]
                    // re-index remaining entries
                    const result: WindowStore = {}
                    Object.entries(draft).forEach(([, value], i) => {
                        result[i.toString()] = value
                    })
                    draft = result
                })
            )
        },
        [windows]
    )

    const add = useCallback(() => {
        setWindows(
            produce(windows, (draft) => {
                draft[Object.entries(draft).length.toString()] =
                    'left-pad@latest'
            })
        )
    }, [windows])

    // on load, set modules to window query
    useEffect(() => {
        const newStore = produce(windows, (draft) => {
            new URL(window.location.toString()).searchParams.forEach(
                (value, key) => {
                    draft[key] = value
                }
            )
        })
        setWindows(Object.entries(newStore).length > 1 ? newStore : DEFAULTS)
    }, [])

    // persist windowStore to search params
    useEffect(() => {
        const url = new URL(window.location.toString())
        url.searchParams.forEach((val, key) => url.searchParams.delete(key))
        Object.entries(windows).forEach(([key, val]) =>
            url.searchParams.set(key, val)
        )
        router.replace(url)
    }, [windows])

    return { windows, update, remove, add }
}

export default usePersistedWindows
