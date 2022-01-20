export const isValidModule = (module?: string) => {
    return !!module && /^@?.+@?.+$/.test(module)
}
