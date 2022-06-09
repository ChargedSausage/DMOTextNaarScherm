import { Component, createSignal, For } from 'solid-js'

import styles from './css/Settings.module.css'

import { WordToScreenData } from '../Types.module'

import { WordEditor } from './WordEditor'
import { ScreenTimeInput } from './ScreenTimeInput'
import { Plus } from '../icons/Plus'
import { Cross } from '../icons/Cross'
import { Cog } from '../icons/Cog'

export const Settings: Component<{
    data: WordToScreenData
    onChange: (data: WordToScreenData) => void
    onClose: () => void
}> = (props) => {
    const [animated, setAnimated] = createSignal(true)

    setTimeout(() => {
        setAnimated(false)
    }, 1200)
    return (
        <div class={styles.curtain}>
            <div class={styles.settings}>
                <div class={`${styles.header} ${styles.animated}`}>
                    <Cog></Cog>
                    <h1>Settings</h1>
                    <button onClick={props.onClose}>
                        <Cross></Cross>
                    </button>
                </div>
                <div class={styles.settingsContainer}>
                    <ScreenTimeInput
                        value={props.data.screenTime}
                        animated={animated()}
                        onChange={(e) => {
                            props.onChange({
                                words: props.data.words,
                                foutHex: props.data.foutHex,
                                foutText: props.data.foutText,
                                screenTime: Number(e.currentTarget.value),
                            })
                        }}
                    ></ScreenTimeInput>
                    <div class={styles.words}>
                        <WordEditor
                            word={'default'}
                            animated={animated()}
                            caseSensitive={false}
                            hex={props.data.foutHex || '#000000'}
                            displayText={props.data.foutText || ''}
                            deletable={false}
                            index={0}
                            onChange={(word) => {
                                props.onChange({
                                    words: props.data.words,
                                    foutHex: word.hex,
                                    foutText: word.displayText,
                                    screenTime: props.data.screenTime,
                                })
                            }}
                        ></WordEditor>
                        <For each={props.data.words}>
                            {(word, wordIndex) => (
                                <WordEditor
                                    word={word.word}
                                    animated={animated()}
                                    index={wordIndex() + 1}
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
                                            screenTime: props.data.screenTime,
                                        }
                                        props.onChange(data)
                                    }}
                                ></WordEditor>
                            )}
                        </For>
                        <button
                            class={`${styles.addButton} ${animated() ? styles.animated : ''}`}
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
        </div>
    )
}
