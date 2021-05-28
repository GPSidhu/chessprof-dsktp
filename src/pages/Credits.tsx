import React from 'react'
import styled from 'styled-components'

// src
import Informational from '../components/Informational'
import helpfulSign from '../assets/illustrations/helpful_sign.svg'
import { SOCIAL_ICON__MAP } from '../constants'
import Tooltip from '../components/Tooltip'

const Table = styled.table`
    border: 1px solid #000;
    font-family: "Mali";
    min-width: 540px;
    max-width: 700px;
    td, th, tr {
        border: 1px dotted #000;
        > * {
            margin-right: 4px;
        }
    }
    th {
        color: #524f49;
    }
    a {
        padding: 8px;
        color: #F9A826; //#3d52a6;
    }
    .cell-text {
        font-weight: bold;
        color: #ebe9e6;
    }
`
const CellDiv = styled.div`
    display: flex;
    justify-content: space-evenly;
    a {
        font-size: 24px;
    }
`

const Credits = () => {
    return (
        <Informational heading={"Credits"} illustration={helpfulSign}>
            <Table>
                <tbody style={{ maxWidth: "540px" }}>
                    <tr>
                        <th>Designed and developed by</th>
                        <td>
                            <CellDiv className="cell-text">Gurpreet Singh</CellDiv>
                            <CellDiv className="icons">
                                <a href={"https://guri-sidhu.com"} target="_blank" aria-label={"Personal Website"} rel="noreferrer noopener">
                                    <Tooltip text={"Site"}>{SOCIAL_ICON__MAP['site']}</Tooltip>
                                </a>
                                <a href={"mailto: ss.guri1991@gmail.com"} target="_blank" aria-label={"Email"} rel="noreferrer noopener">
                                    <Tooltip text={"Email"}>{SOCIAL_ICON__MAP['email']}</Tooltip>
                                </a>
                                <a href={"https://www.linkedin.com/in/gurpreet-singh-75266446/"} target="_blank" aria-label={"LinkedIn"} rel="noreferrer noopener">
                                    <Tooltip text={"Linkedin"}>{SOCIAL_ICON__MAP['linkedin']}</Tooltip>
                                </a>
                                <a href={"https://github.com/GPSidhu"} target="_blank" aria-label={"Github"} rel="noreferrer noopener">
                                    <Tooltip text={"Github"}>{SOCIAL_ICON__MAP['github']}</Tooltip>
                                </a>
                            </CellDiv>
                        </td>
                    </tr>
                    <tr>
                        <th>Chess Move Validations</th>
                        <td>
                            <a href="https://github.com/jhlywa/chess.js" target="_blank" rel="noreferrer noopener">chess.js</a>
                        </td>
                    </tr>
                    <tr>
                        <th>Icons</th>
                        <td><a href="https://freeicons.io/" target="_blank" rel="noreferrer noopener">freeicons.io</a></td>
                    </tr>
                    <tr>
                        <th>Illustrations</th>
                        <td><a href="https://undraw.co/" target="_blank" rel="noreferrer noopener">undraw.co</a></td>
                    </tr>
                    <tr>
                        <th>Chess Openings</th>
                        <td>All the openings are compiled and collected from various free to use web sources like youtube videos, blogs, etc</td>
                    </tr>
                </tbody>
            </Table>
        </Informational>
    )
}

export default Credits
