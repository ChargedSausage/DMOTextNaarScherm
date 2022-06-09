export const contrastColor = (bgColor: string) => {
    if (!bgColor) {
        return undefined
    }
    return parseInt(bgColor.replace('#', ''), 16) > 0xffffff / 1.8 ? 'var(--colorBG)' : 'var(--colorWhite)'
}
