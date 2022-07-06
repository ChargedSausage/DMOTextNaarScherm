import { Component, createSignal, For, createUniqueId, onCleanup } from 'solid-js'
import styles from './css/DecorativeLock.module.css'

export const Lock: Component = () => {
    const lockId = createUniqueId()
    const [sentenceArray, setSentenceArray] = createSignal([
        'd-C  srod-Coesrodeworddsr  od-Coesrdeod-Coesrs-Cow  rdCe',
        'ddes-Codoesr  odewdeworddsddsrod-Co-  CodCrodewddesoce',
        'Gs-Codeword-Cod-Codeword-Cod  es-Codeword-Codw  ordewor',
        'odeworod-Cods-Co  ddes-Codeword-Codeword-CoCodess-',
        'Codesrode   oe/srod-Coorod-C  odsrd-Codes-CodCodeworodew',
        'Gs-Codeword-Cod-eword-Codes-Codeword-Codwordeword-C',
        'odew  orod-Cods-Coddes-Codeword-C  odeworddewordewewor',
        'd-Csrod-Coesrodeworddsrod-Coesrdeod-Coesrs  -CowrdCe',
        'ddes-Codo  esrodewd/ewor  ddsddsrod-Co-CodCrodewddesoce',
        'Gs-Codeword-Cod-Codeword-  Codes-Codeword-Codwordewor',
        'odew  orod-Cods  -Coddes-Codeword-Codewor  d-CoCodess-',
        'Codesrode oesrod-Coorod-Codsrd-Codes-CodCodeworodew',
        'Gs-Codeword-Cod   -eword-Codes-Codew  ord-Codwordeword-C',
        'odeworod-Cods-Codd/es-Codeword-Codeworddewordewewor',
        'd-Csrod-C  oesrodeworddsrod-Co  esrdeod-Coesrs-CowrdCe',
        'ddes-Codoesrodewdewo  rddsddsrod-Co-CodCrodewddesoce',
        'Gs-Code  word-Cod-Codeword-Codes-Codeword-Codwordewor',
        'odeworod-Cods-Coddes-Codeword-Codeword-CoCodess-',
        'Codes  rode oesrod-Coorod-Cod  srd-Codes-CodCodeworodew',
        'Gs-Codeword-Cod-ewor/d-Codes-Codeword-Codwordeword-C',
        'odeworod-Cods-Coddes-Codeword-Codeworddewordewewor',
        'd-Csrod-  Coesrodeworddsrod-Coesrde  od-Coesrs-CowrdCe',
        'ddes-Codoesrodewdeworddsddsrod-Co-CodCrodewddesoce',
        'Gs-C  odeword-Cod-Codeword-Codes-  Codeword-Codwordewor',
        'odewo  rod-Cods-Cod  /des-Codeword-Codeword-CoCodess-',
        'Codesrode oesr  od-Coorod-Codsrd-Codes-CodCod  eworodew',
        'Gs-Codeword-Cod-  eword-Codes-Codeword-Codwordew  ord-C',
        'odeworod-Cods-Coddes-Codeword-Codeworddewordewewor',
        'd-Csr  od-Coesrodewo/rd  dsrod-Coesrdeod-Coesrs-CowrdCe',
        'ddes-Codoesrodewdeworddsddsrod-Co-CodCrodewdd  esoce',
        'Gs-Codeword-Cod  -Codeword-Codes-Codeword-Codwordewor',
        'od  eworod-Cods-Coddes-Codeword-Codeword-CoCodess-',
        'Codesrode oesrod-Coorod-Codsrd-Codes-CodCodewo  rodew',
        'Gs-Codeword-C  od-eword-Codes-Codeword-Codwordeword-C',
        'odeworod-Cods-Coddes-Codeword-Codeworddewordewewor',
    ])

    const updateSentences = () => {
        let sentences = sentenceArray()
        let newSentences: string[] = []
        for (const rec in sentences) {
            const sentence = sentences[rec]
            const random = Math.floor(Math.random() * 4)
            const first = sentence.slice(0, random)
            const rest = sentence.slice(random)
            newSentences.push(rest + first)
        }
        setSentenceArray(newSentences)
    }
    updateSentences()

    const interval200 = setInterval(updateSentences, 200)

    onCleanup(() => {
        clearInterval(interval200)
    })

    return (
        <>
            <svg viewBox='0 0 500 500'>
                <mask
                    class={styles.lock}
                    id={`lockMask-${lockId}`}
                    maskUnits='userSpaceOnUse'
                    maskContentUnits='userSpaceOnUse'
                >
                    <g transform='matrix(1.21107,0,0,1,-53.2932,26.1939)'>
                        <path
                            d='M165,422C165,422 165.011,109.823 165,101C164.88,0.92 335.376,0.047 335,101C336.144,100.521 335.826,266 335.826,266'
                            style='fill:none;stroke:black;stroke-width:50.42px;'
                        />
                    </g>
                    <g transform='matrix(0.828087,0,0,1,42.5642,8)'>
                        <path
                            d='M457,252.56C457,227.415 432.347,207 401.982,207L99.018,207C68.653,207 44,227.415 44,252.56L44,429.44C44,454.585 68.653,475 99.018,475L401.982,475C432.347,475 457,454.585 457,429.44L457,252.56Z'
                            style='fill:black;'
                        />
                    </g>
                </mask>
                <g class={styles.lockText} style={`mask: url(#lockMask-${lockId})`}>
                    <For each={sentenceArray()}>
                        {(sentence, index) => (
                            <text x={0} y={`${0 + 20 * index()}px`}>
                                {sentence}
                            </text>
                        )}
                    </For>
                </g>
            </svg>
        </>
    )
}
