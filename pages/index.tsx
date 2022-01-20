import Window from '../components/Window'
import usePersistedWindows from '../util/usePersistedWindows'

export default function IndexPage() {
    const { windows, update, remove, add } = usePersistedWindows()

    return (
        <div>
            <div
                className="frame"
                style={{
                    height: '100vh',
                    whiteSpace: 'nowrap',
                }}
            >
                {Object.entries(windows).map(([id, module]) => (
                    <Window
                        key={id}
                        id={id}
                        module={module}
                        onChange={(change) => update(id, change)}
                        onRemove={() => remove(id)}
                    />
                ))}
                <button
                    onClick={() => add()}
                    style={{
                        position: 'fixed',
                        bottom: 4,
                        right: 4,
                        fontSize: '2rem',
                    }}
                >
                    🆕
                </button>
            </div>
            <style global jsx>{`
                body,
                html {
                    margin: 0;
                    padding: 0;
                    background: #fefefe;
                }
                *,
                *:before,
                *:after {
                    box-sizing: border-box;
                }
            `}</style>
        </div>
    )
}
