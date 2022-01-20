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
                <div
                    style={{
                        position: 'fixed',
                        bottom: 4,
                        right: 4,
                        fontSize: '2rem',
                    }}
                >
                    <button
                        title="add new window"
                        style={{ fontSize: 'inherit' }}
                        onClick={() => add()}
                    >
                        🆕
                    </button>
                    <button
                        style={{ fontSize: 'inherit' }}
                        title="copy URL to clipboard"
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.href)
                        }}
                    >
                        📋
                    </button>
                </div>
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
