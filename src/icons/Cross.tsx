import { Component } from 'solid-js'

export const Cross: Component = () => {
    return (
        <svg
            width='44'
            height='44'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='#ffffff'
            fill='none'
            stroke-linecap='round'
            stroke-linejoin='round'
        >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M2 2l20 20' />
            <path d='M2 22l20 -20' />
        </svg>
    )
}
