import { Component } from 'solid-js'
import { Lock } from './DecorativeLock'

import styles from './css/Home.module.css'

export const Home: Component = () => {
    return (
        <>
            <header>
                <div class={styles.left}>
                    <h1>
                        <span class={styles.shadow}>/</span>Home
                    </h1>
                </div>
                <div class={styles.middle}></div>
                <div class={styles.right}>
                    <div>
                        <button>Taal</button>
                        <div class={styles.taalSelectContainer}></div>
                    </div>
                    <div>
                        <button>Login</button>
                        <div class={styles.loginContainer}></div>
                    </div>
                </div>
            </header>
            <main class={styles.home}>
                <div class={styles.welcome}>
                    <div>
                        <div class={styles.left}>
                            <Lock></Lock>
                        </div>
                        <div class={styles.topRight}>
                            <h2>
                                Guess the
                                <br /> <span>Codeword</span>
                            </h2>
                        </div>
                        <div class={styles.bottomRight}>
                            <label>Join een online lobby:</label>
                            <input type='text' placeholder='CODE' />
                            <label>━━━━━ Of ━━━━━</label>
                            <button>Maak er een</button>
                        </div>
                    </div>
                </div>
                <div class={styles.what}></div>
                <div class={styles.why}></div>
                <div class={styles.contact}></div>
            </main>
        </>
    )
}
