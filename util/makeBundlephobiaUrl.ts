const makeBundlephobiaUrl = (module?: string) => {
    if (!module) return undefined

    if (/^@?.+@?.+$/.test(module) === false)
        console.error('invalid module format: ' + module)

    return `https://bundlephobia.com/package/${module}`
}

export default makeBundlephobiaUrl
