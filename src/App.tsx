import { Component, createEffect, createMemo, createSignal, For, Show } from 'solid-js'
import { Routes, Route, useParams } from 'solid-app-router'

import styles from './App.module.css'

import { GuessScreen } from './components/GuessScreen'

import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'
import { Home } from './components/Home'

const firebaseConfig = {
    apiKey: 'AIzaSyDQxNfB3LrtPIdzJCPgLTW7Cnr277NfaDI',
    authDomain: 'guess-codeword.firebaseapp.com',
    projectId: 'guess-codeword',
    storageBucket: 'guess-codeword.appspot.com',
    messagingSenderId: '778285136708',
    appId: '1:778285136708:web:e63666e15669de71487511',
    measurementId: 'G-N7RS19YX2E',
}

const firebaseApp = initializeApp(firebaseConfig)
const analytics = getAnalytics(firebaseApp)
const db = getFirestore(firebaseApp)
const words = collection(db, 'words')

const App: Component = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route
                path='/local/:id'
                element={() => {
                    const params = useParams()
                    return <GuessScreen type={'local'} code={params.id} />
                }}
            ></Route>
        </Routes>
    )
}

export default App
