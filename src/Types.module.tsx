export type ResultScreenData = {
    text?: string
    hex?: string
}

export type Word = {
    word: string
    caseSensitive?: boolean
    hex: string
    displayText?: string
}

export type WordToScreenData = {
    words: Word[]
    foutHex?: string
    foutText?: string
    screenTime?: number
}
