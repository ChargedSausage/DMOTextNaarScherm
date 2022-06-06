import { Component, createEffect, createMemo, createSignal, For, Show } from 'solid-js'
import { Cog } from './icons/Cog'
import { Cross } from './icons/Cross'
import { Plus } from './icons/Plus'
import { CaseSensitive } from './icons/CaseSensitive'

import styles from './App.module.css'
import { Trash } from './icons/Trash'

const contrastColor = (bgColor: string) => {
    if (!bgColor) {
        return undefined
    }
    return parseInt(bgColor.replace('#', ''), 16) > 0xffffff / 1.8 ? 'var(--colorBG)' : 'var(--colorWhite)'
}

type ResultScreenData = {
    text?: string
    hex?: string
}

type Word = {
    word: string
    caseSensitive?: boolean
    hex: string
    displayText?: string
}

type WordToScreenData = {
    words: Word[]
    foutHex?: string
    foutText?: string
}

const TextInput: Component<{
    value: string
    onSubmit: (value: string) => void
    onInputChange: (
        event: InputEvent & {
            currentTarget: HTMLInputElement
            target: Element
        }
    ) => void
}> = (props) => {
    const [word, setWord] = createSignal(props.value)

    return (
        <div class={styles.textInput}>
            <input
                value={props.value}
                onInput={(e) => {
                    setWord(e.currentTarget.value)
                    props.onInputChange(e)
                }}
            ></input>
            <button
                onClick={() => {
                    props.onSubmit(word())
                }}
            >
                Probeer
            </button>
        </div>
    )
}

const ResultScreen: Component<{ data?: ResultScreenData; customDelay?: number; onTimerDone: () => void }> = (props) => {
    setTimeout(
        () => {
            props.onTimerDone()
        },
        props.customDelay ? props.customDelay : 5000
    )

    return (
        <div class={styles.result} style={{ background: props.data?.hex }}>
            <h1 style={{ color: contrastColor(props.data?.hex || '') }}>{props.data?.text || ''}</h1>
        </div>
    )
}

const WordEditor: Component<{
    word: string
    caseSensitive: boolean
    hex: string
    displayText: string
    deletable: boolean
    onChange: (data: { word: string; caseSensitive: boolean; hex: string; displayText: string }) => void
    onDelete?: () => void
}> = (props) => {
    return (
        <div class={styles.wordEditor}>
            <div class={styles.wordHeader}>
                {props.deletable ? (
                    <input
                        type='text'
                        value={props.word}
                        onChange={(e) => {
                            props.onChange({
                                word: e.currentTarget.value,
                                caseSensitive: props.caseSensitive,
                                hex: props.hex,
                                displayText: props.displayText,
                            })
                        }}
                    />
                ) : (
                    <span>{props.word}</span>
                )}

                <div class={styles.buttons}>
                    {props.deletable ? (
                        <button onClick={props.onDelete}>
                            <Trash></Trash>
                        </button>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            <div class={styles.wordInfo}>
                <input
                    style={{ color: contrastColor(props.hex) }}
                    type='color'
                    value={props.hex}
                    onChange={(e) => {
                        props.onChange({
                            word: props.word,
                            caseSensitive: props.caseSensitive,
                            hex: e.currentTarget.value,
                            displayText: props.displayText,
                        })
                    }}
                ></input>
                {props.deletable ? (
                    <button
                        onClick={() => {
                            props.onChange({
                                word: props.word,
                                caseSensitive: !props.caseSensitive,
                                hex: props.hex,
                                displayText: props.displayText,
                            })
                        }}
                    >
                        <CaseSensitive color={props.caseSensitive ? 'var(--colorDanger)' : 'var(--colorSecondary)'} />
                    </button>
                ) : (
                    <></>
                )}

                <input
                    type='text'
                    value={props.displayText}
                    onChange={(e) => {
                        props.onChange({
                            word: props.word,
                            caseSensitive: props.caseSensitive,
                            hex: props.hex,
                            displayText: e.currentTarget.value,
                        })
                    }}
                ></input>
            </div>
        </div>
    )
}

const Settings: Component<{
    data: WordToScreenData
    onChange: (data: WordToScreenData) => void
    onClose: () => void
}> = (props) => {
    return (
        <div class={styles.curtain}>
            <div class={styles.settings}>
                <div class={styles.header}>
                    <Cog></Cog>
                    <h1>Settings</h1>
                    <button onClick={props.onClose}>
                        <Cross></Cross>
                    </button>
                </div>
                <div class={styles.settingsContainer}>
                    <WordEditor
                        word={'default'}
                        caseSensitive={false}
                        hex={props.data.foutHex || '#000000'}
                        displayText={props.data.foutText || ''}
                        deletable={false}
                        onChange={(word) => {
                            props.onChange({
                                words: props.data.words,
                                foutHex: word.hex,
                                foutText: word.displayText,
                            })
                        }}
                    ></WordEditor>
                    <For each={props.data.words}>
                        {(word, wordIndex) => (
                            <WordEditor
                                word={word.word}
                                caseSensitive={word.caseSensitive || false}
                                hex={word.hex}
                                displayText={word.displayText || ''}
                                deletable={true}
                                onChange={(word) => {
                                    const data = { ...props.data }
                                    data.words[wordIndex()] = word
                                    props.onChange(data)
                                }}
                                onDelete={() => {
                                    const wordArray = props.data.words
                                    wordArray.splice(wordIndex(), 1)
                                    const data = {
                                        words: wordArray,
                                        foutText: props.data.foutText,
                                        foutHex: props.data.foutHex,
                                    }
                                    props.onChange(data)
                                }}
                            ></WordEditor>
                        )}
                    </For>
                    <button
                        class={styles.addButton}
                        onClick={() => {
                            const data = { ...props.data }
                            data.words.push({
                                word: '',
                                displayText: '',
                                hex: '#ffffff',
                            })
                            props.onChange(data)
                        }}
                    >
                        <Plus></Plus>
                    </button>
                </div>
            </div>
        </div>
    )
}

const App: Component = () => {
    const [value, setValue] = createSignal('')
    const settings: WordToScreenData = JSON.parse(localStorage.getItem('words') || '{"words":[]}')
    const [words, setWords] = createSignal<WordToScreenData>(settings)
    const [screens, setScreens] = createSignal<ResultScreenData[]>()
    const [showSettings, setShowSettings] = createSignal(false)

    const valueRef = createMemo(() => value())

    createEffect(() => {
        localStorage.setItem('words', JSON.stringify(words()))
    })

    return (
        <div class={styles.app}>
            <div>{}</div>
            <TextInput
                value={valueRef()}
                onInputChange={(e) => {
                    setValue(e.target.value || '')
                }}
                onSubmit={(val) => {
                    let result = false

                    if (val == '') {
                        return
                    }

                    setValue('')

                    if (val == '!SETTINGS!') {
                        setShowSettings(true)
                        return
                    }

                    for (const i in words().words) {
                        const word = words().words[i]
                        if (word.caseSensitive) {
                            if (val == word.word) {
                                setScreens([{ text: word.displayText, hex: word.hex }])
                                result = true
                            }
                        } else {
                            if (val.toLowerCase() == word.word.toLowerCase()) {
                                setScreens([{ text: word.displayText, hex: word.hex }])
                                result = true
                            }
                        }
                    }

                    if (!result) {
                        console.log(words().foutHex)
                        setScreens([{ text: words().foutText, hex: words().foutHex }])
                    }
                }}
            />
            <For each={screens()}>
                {(screen) => (
                    <ResultScreen
                        data={screen}
                        customDelay={3000}
                        onTimerDone={() => {
                            setScreens([])
                        }}
                    />
                )}
            </For>
            <Show when={showSettings()}>
                <Settings
                    data={words()}
                    onChange={(words) => {
                        setWords(words)
                    }}
                    onClose={() => setShowSettings(false)}
                ></Settings>
            </Show>
        </div>
    )
}

export default App
