import { Component } from 'solid-js'
import styles from './css/ResultScreen.module.css'

import { contrastColor } from '../contrastColor'
import { ResultScreenData } from '../Types.module'

export const ResultScreen: Component<{ data?: ResultScreenData; customDelay?: number; onTimerDone: () => void }> = (
    props
) => {
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
