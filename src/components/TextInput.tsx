import { Component, createSignal } from 'solid-js'
import styles from './css/TextInput.module.css'

export const TextInput: Component<{
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
                onKeyDown={(e) => {
                    if (e.key == 'Enter') {
                        props.onSubmit(word())
                        setWord('')
                        e.currentTarget.blur()
                    }
                }}
            ></input>
            <button
                onClick={() => {
                    props.onSubmit(word())
                    setWord('')
                }}
            >
                Gerard
            </button>
        </div>
    )
}
