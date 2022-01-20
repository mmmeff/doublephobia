import type { ChangeEvent } from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import useDebouncedEffect from 'use-debounced-effect-hook'

import makeBundlephobiaUrl from '../util/makeBundlephobiaUrl'

interface WindowProps {
    side: 'left' | 'right'
    initialModule: string
}
const Window = ({ side, initialModule }: WindowProps) => {
    const router = useRouter()
    const [module, setModule] = useState<string | undefined>()
    const [src, setSrc] = useState<string | undefined>(
        makeBundlephobiaUrl(initialModule)
    )

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setModule(e.target.value)
    }

    useDebouncedEffect(
        () => {
            if (!module) return

            setSrc(makeBundlephobiaUrl(module))
            const url = new URL(window.location.toString())
            url.searchParams.set(side, module)
            router.replace(url)
        },
        [module, side],
        5000
    )

    // on load, set module
    useEffect(() => {
        const sideParam = new URL(window.location.toString()).searchParams.get(
            side
        )
        setModule(sideParam ?? initialModule)
    }, [])

    return (
        <div
            className="window"
            style={{
                position: 'relative',
                display: 'grid',
                gridTemplateRows: '3rem 1fr',
            }}
        >
            <input
                type="text"
                value={module}
                onChange={onChange}
                style={{ width: '100%' }}
            />
            <iframe
                title={`Bundlephobia (${side})`}
                src={src}
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    )
}
export default Window
