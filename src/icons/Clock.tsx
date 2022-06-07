import { Component } from 'solid-js'

export const Clock: Component = () => {
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
            <circle cx='12' cy='12' r='9' />
            <polyline points='12 7 12 12 15 15' />
        </svg>
    )
}
