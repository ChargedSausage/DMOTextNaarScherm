import { Component, createEffect, createMemo, createSignal, For, Show } from 'solid-js'

import { ResultScreenData, WordToScreenData } from './Types.module'

import styles from './App.module.css'

import { TextInput } from './components/TextInput'
import { ResultScreen } from './components/ResultScreen'
import { Settings } from './components/Settings'

const App: Component = () => {
    const [value, setValue] = createSignal('')
    const settings: WordToScreenData = JSON.parse(
        localStorage.getItem('words') || '{"words":[], "foutHex": "#ff0000", "foutText": "Fout", "screenTime": 3000}'
    )
    const [words, setWords] = createSignal<WordToScreenData>(settings)
    const [screens, setScreens] = createSignal<ResultScreenData[]>()
    const [showSettings, setShowSettings] = createSignal(false)

    const valueRef = createMemo(() => value())

    createEffect(() => {
        localStorage.setItem('words', JSON.stringify(words()))
    })

    return (
        <div class={styles.app}>
            <TextInput
                value={valueRef()}
                onInputChange={(e) => {
                    setValue(e.currentTarget.value || '')
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
                        setScreens([{ text: words().foutText, hex: words().foutHex }])
                    }
                }}
            />
            <For each={screens()}>
                {(screen) => (
                    <ResultScreen
                        data={screen}
                        customDelay={words().screenTime || 3000}
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
