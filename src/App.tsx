import { Component, createEffect, createMemo, createSignal, For, Show } from 'solid-js'

import logo from './logo.svg'
import styles from './App.module.css'

const contrastColor = (bgColor: string) => {
    if (!bgColor) { return undefined; }
    return (parseInt(bgColor.replace('#', ''), 16) > 0xffffff / 1.8) ? 'var(--colorBG)' : 'var(--colorWhite)';
}

type ResultScreenData = {
    text?: string
    hex?: string
}

type Word = {
    word: string
    hex?: string
    text?: string
}

type WordToScreenData = {
    words: Word[]
    foutHex?: string
    foutText?: string
}

const TextInput: Component<{
    value: string
    onSubmit: (value: string) => void
    onInputChange: (event: InputEvent & {
        currentTarget: HTMLInputElement;
        target: Element;
    }) => void
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
        <div class={styles.result} style={{background: props.data?.hex}}>
            <h1 style={{color: contrastColor(props.data?.hex || '')}}>{props.data?.text || ''}</h1>
        </div>
    )
}

const Settings: Component<{ data: WordToScreenData; onChange: (data: WordToScreenData) => void; onClose: () => void}> = (props) => {

    return (
        <div class={styles.curtain}>
            <div class={styles.settings}>
                <div class={styles.header}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-settings" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                    <h1>Settings</h1>
                    <button onClick={props.onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-settings" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M2 2l20 20" />
                            <path d="M2 22l20 -20" />
                        </svg>
                    </button>
                </div>
                <div class={styles.settingsContainer}>

                    <div class={styles.table}>
                        <div class={styles.mandatory}><b>Woord</b></div>
                        <div class={styles.mandatory}><b>Kleur</b></div>
                        <div><b>Display Text</b></div>
                        <div></div>
                        <div><b>Fout</b></div>
                        <div><input type='color' style={{background: contrastColor(props.data.foutHex || '')}} value={props.data.foutHex} onChange={(e) => {
                            const data = {...props.data};
                            data.foutHex = e.currentTarget.value;
                            props.onChange(data);
                        }}/></div>
                        <div><input type='text' value={props.data.foutText} onChange={(e) => {
                            const data = {...props.data};
                            data.foutText = e.currentTarget.value;
                            props.onChange(data);
                        }}/></div>
                        <div></div>
                        <For each={props.data.words}>
                            {(word, wordIndex) => (<>
                                <div><input type='text' value={word.word} onChange={(e) => {
                                    const data = {...props.data}
                                    data.words[wordIndex()].word = e.currentTarget.value;
                                    props.onChange(data);
                                }}/></div>
                                <div><input style={{background: contrastColor(props.data.words[wordIndex()].hex || '')}} type='color' value={word.hex} onChange={(e) => {
                                    const data = {...props.data};
                                    data.words[wordIndex()].hex = e.currentTarget.value;
                                    props.onChange(data);
                                }}/></div>
                                <div><input type='text' value={word.text} onChange={(e) => {
                                    const data = {...props.data};
                                    data.words[wordIndex()].text = e.currentTarget.value;
                                    props.onChange(data);
                                }}/></div>
                                <button onClick={() => {
                                    const wordArray = props.data.words;
                                    wordArray.splice(wordIndex(), 1)
                                    const data = {
                                        words: wordArray,
                                        foutText: props.data.foutText,
                                        foutHex: props.data.foutHex
                                    }
                                    props.onChange(data);
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <line x1="4" y1="7" x2="20" y2="7" />
                                        <line x1="10" y1="11" x2="10" y2="17" />
                                        <line x1="14" y1="11" x2="14" y2="17" />
                                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                    </svg>
                                </button>
                            </>)}
                        </For>
                        <button class={styles.addButton} onClick={() => {
                            const data = {...props.data};
                            data.words.push({
                                word: '',
                                text: ''
                            });
                            props.onChange(data);
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                        </button>
                    </div>
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
    const [showSettings, setShowSettings] = createSignal(false);

    const valueRef = createMemo(() => value())

    createEffect(() => {
        localStorage.setItem('words', JSON.stringify(words()));
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
                        return;
                    }

                    setValue('')

                    if (val == '!SETTINGS!') {
                        setShowSettings(true);
                        return;
                    }

                    for (const i in words().words) {
                        const word = words().words[i];
                        if (val.toLowerCase() == word.word.toLowerCase()) {
                            setScreens([{ text: word.text, hex: word.hex }])
                            result = true
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
                <Settings data={words()} onChange={(words) => setWords(words)} onClose={() => setShowSettings(false)}></Settings>
            </Show>
        </div>
    )
}

export default App
