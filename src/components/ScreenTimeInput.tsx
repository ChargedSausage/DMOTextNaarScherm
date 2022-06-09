import { Component } from 'solid-js'

import styles from './css/ScreenTimeInput.module.css'

import { Clock } from '../icons/Clock'

export const ScreenTimeInput: Component<{
    value?: number
    animated: boolean
    onChange?: (
        e: Event & {
            currentTarget: HTMLInputElement
            target: Element
        }
    ) => void
}> = (props) => {
    return (
        <div class={`${styles.screenTimeInput} ${props.animated ? styles.animated : ''}`}>
            <Clock />
            <input
                type='number'
                value={props.value}
                onChange={(e) => (props.onChange ? props.onChange(e) : '')}
            ></input>
            <span>ms</span>
        </div>
    )
}
