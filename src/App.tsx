import { Component, createMemo, createSignal, For } from 'solid-js'

import logo from './logo.svg'
import styles from './App.module.css'

type ResultScreenData = {
    text?: string
    backgroundClass?: string
}

type Word = {
    word: string
    backgroundClass: string
    text?: string
}

type WordToScreenData = {
    words: Word[]
    foutBackgroundClass: string
    foutText?: string
}

const TextInput: Component<{
    value: string
    onSubmit: (value: string) => void
    onInputChange: (event: InputEvent) => void
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
        <div class={styles.result}>
            <h1>{props.data?.text || ''}</h1>
        </div>
    )
}

const Settings: Component = () => {
    return (
        <div class={styles.curtain}>
            <div class={styles.settings}></div>
        </div>
    )
}

const App: Component = () => {
    const [value, setValue] = createSignal('')
    const [words, setWords] = createSignal<WordToScreenData>({
        words: [
            {
                word: 'Banaan',
                backgroundClass: '',
                text: 'Geel',
            },
            {
                word: 'Aardappel',
                backgroundClass: '',
                text: 'Rood',
            },
            {
                word: 'Limoen',
                backgroundClass: '',
                text: 'Groen',
            },
        ],
        foutBackgroundClass: '',
        foutText: '-€50',
    })
    const [screens, setScreens] = createSignal<ResultScreenData[]>()

    const valueRef = createMemo(() => value())

    return (
        <div class={styles.app}>
            <div>{}</div>
            <TextInput
                value={valueRef()}
                onInputChange={(e) => {
                    setValue(e.target.value)
                }}
                onSubmit={(val) => {
                    let result = false
                    setValue('')

                    for (const i in words().words) {
                        const word = words().words[i]
                        if (val.toLowerCase() == word.word.toLowerCase()) {
                            setScreens([{ text: word.text, backgroundClass: word.backgroundClass }])
                            result = true
                        }
                    }

                    if (!result) {
                        setScreens([{ text: words().foutText, backgroundClass: words().foutBackgroundClass }])
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
            {/* <Settings></Settings> */}
        </div>
    )
}

export default App
