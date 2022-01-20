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
                    display: 'flex',
                    overflow: 'visible',
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
                        onClick={() => {
                            add()
                            setTimeout(() => {
                                window.scrollTo(9000, 0)
                            }, 100)
                        }}
                    >
                        ➕
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
                    <a
                        href="https://github.com/mmmeff/doublephobia//"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <button
                            style={{ fontSize: 'inherit' }}
                            title="More info @ Github"
                        >
                            ℹ️
                        </button>
                    </a>
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
                button {
                    border: none;
                    outline: none;
                    margin: 2px;
                    border: 1px solid #7a7a7a;
                    cursor: pointer;
                }
            `}</style>
        </div>
    )
}
