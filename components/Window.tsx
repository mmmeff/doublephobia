import type { ID, Module } from '../util/types'

import { useState } from 'react'
import useDebouncedEffect from 'use-debounced-effect-hook'

import makeBundlephobiaUrl from '../util/makeBundlephobiaUrl'
import { isValidModule } from '../util/isValidModule'

export interface WindowProps {
    id: ID
    module: Module
    onChange: (module: string) => void
    onRemove: () => void
}
const Window = ({ id, module, onChange, onRemove }: WindowProps) => {
    const [lastGoodSrc, setLastGoodSrc] = useState<string | undefined>(
        isValidModule(module) ? makeBundlephobiaUrl(module) : undefined
    )

    useDebouncedEffect(
        () => {
            if (!isValidModule(module)) return

            setLastGoodSrc(makeBundlephobiaUrl(module))
        },
        [module],
        800
    )

    return (
        <div
            className="window"
            style={{
                position: 'relative',
                display: 'inline-grid',
                gridTemplateRows: '3rem 1fr',
                height: '100%',
                width: '50%',
                minWidth: 420,
            }}
        >
            <input
                type="text"
                value={module}
                onChange={(e) => onChange(e.target.value)}
                placeholder="module@1.0.0"
                style={{
                    width: '100%',
                    height: 'auto',
                    paddingLeft: '1rem',
                    boxShadow: 'none',
                    border: '1px solid #7a7a7a',
                }}
            />
            <iframe
                title={`Bundlephobia ${id}: ${module}`}
                src={lastGoodSrc}
                style={{ width: '100%', height: '100%' }}
            />
            <button
                onClick={onRemove}
                title="delete window"
                style={{
                    position: 'absolute',
                    top: 4,
                    right: 6,
                    fontSize: '1.5rem',
                }}
            >
                ❌
            </button>
        </div>
    )
}
export default Window
