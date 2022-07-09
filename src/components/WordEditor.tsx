import { Component } from 'solid-js'

import styles from './css/WordEditor.module.css'

import { contrastColor } from '../contrastColor'
import { CaseSensitive } from '../icons/CaseSensitive'
import { Trash } from '../icons/Trash'

export const WordEditor: Component<{
    word: string
    caseSensitive: boolean
    hex: string
    displayText: string
    deletable: boolean
    index: number
    animated: boolean
    onChange: (data: { word: string; caseSensitive: boolean; hex: string; displayText: string }) => void
    onDelete?: () => void
}> = (props) => {
    return (
        <div
            class={`${styles.wordEditor} ${props.animated ? styles.animated : ''}`}
            style={`--data-delay-multiply: ${props.index}`}
        >
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
                        <>
                            <button
                                class={styles.cap}
                                onClick={() => {
                                    props.onChange({
                                        word: props.word,
                                        caseSensitive: !props.caseSensitive,
                                        hex: props.hex,
                                        displayText: props.displayText,
                                    })
                                }}
                            >
                                <CaseSensitive
                                    color={props.caseSensitive ? 'var(--colorDangerLight)' : 'var(--colorSecondary)'}
                                />
                            </button>
                            <button class={styles.delete} onClick={props.onDelete}>
                                <Trash></Trash>
                            </button>
                        </>
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
