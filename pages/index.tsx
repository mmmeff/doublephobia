import Window from '../components/Window'

export default function IndexPage() {
    return (
        <div>
            <div
                className="frame"
                style={{
                    height: '100vh',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                }}
            >
                <Window side="left" initialModule="react@latest" />
                <Window side="right" initialModule="vue@latest" />
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
