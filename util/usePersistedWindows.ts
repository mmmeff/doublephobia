import type { ID, Module } from './types'

import { useState, useEffect, useCallback } from 'react'
import produce from 'immer'
import { useRouter } from 'next/router'
import { nanoid } from 'nanoid'

const id = () => nanoid(6)

type WindowStore = Record<ID, Module>
const DEFAULTS: WindowStore = {
    [id()]: 'react@16',
    [id()]: 'react@17',
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
                })
            )
        },
        [windows]
    )

    const add = useCallback(() => {
        setWindows(
            produce(windows, (draft) => {
                draft[id()] = 'left-pad@latest'
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
        setWindows(Object.entries(newStore).length > 0 ? newStore : DEFAULTS)
    }, [])

    // persist windowStore to search params
    useEffect(() => {
        if (!Object.keys(windows).length) return

        const url = new URL(window.location.toString().split('?')[0])
        Object.entries(windows).forEach(([key, val]) =>
            url.searchParams.set(key, val)
        )
        const goto = url.pathname + url.search
        console.log('goto', goto)
        router.replace(url.pathname + url.search)
    }, [windows])

    return { windows, update, remove, add }
}

export default usePersistedWindows
