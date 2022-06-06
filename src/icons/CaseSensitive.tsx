import { Component } from 'solid-js'

export const CaseSensitive: Component<{ color: string }> = (props) => {
    return (
        <svg
            viewBox='0 0 500 500'
            style='fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;'
        >
            <g transform='matrix(27.6292,0,0,27.6292,-4630.91,-5169.57)'>
                <text
                    x='169.011px'
                    y='200.715px'
                    style={`font-family: sans-serif; font-size:12px; fill: ${props.color};`}
                >
                    aA
                </text>
            </g>
            <g transform='matrix(27.6292,0,0,27.6292,-4630.91,-5169.57)'>
                <text x='169.011px' y='200.715px' style='font-family: sans-serif; opacity: .3;font-size:12px;'>
                    Aa
                </text>
            </g>
        </svg>
    )
}
