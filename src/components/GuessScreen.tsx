import { Component, createEffect, createMemo, createSignal, For, Show } from 'solid-js'

import { ResultScreenData, WordToScreenData } from '../Types.module'
import { getWindowDimensions } from '../windowDimensions'

import { TextInput } from '../components/TextInput'
import { ResultScreen } from '../components/ResultScreen'
import { Settings } from '../components/Settings'

import styles from './css/GuessScreen.module.css'

export const GuessScreen: Component<{
    type: 'local' | 'online'
    code: string
}> = (props) => {
    const [value, setValue] = createSignal('')
    const settings: WordToScreenData = JSON.parse(
        localStorage.getItem(props.code) || '{"words":[], "foutHex": "#ff0000", "foutText": "Fout", "screenTime": 3000}'
    )
    const [words, setWords] = createSignal<WordToScreenData>(settings)
    const [screens, setScreens] = createSignal<ResultScreenData[]>()
    const [showSettings, setShowSettings] = createSignal(false)

    const [windowDimensions, setWindowDimensions] = createSignal(getWindowDimensions())

    window.addEventListener('resize', () => setWindowDimensions(getWindowDimensions()))

    const valueRef = createMemo(() => value())

    if ((props.type = 'local')) {
        createEffect(() => {
            localStorage.setItem(props.code, JSON.stringify(words()))
        })
    }

    return (
        <div
            style={`--screen-height: ${windowDimensions().height}; --screen-width: ${windowDimensions().width};`}
            class={styles.guessScreen}
        >
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
