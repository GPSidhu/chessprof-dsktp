import React from 'react'
import Informational from '../components/Informational'
import underConstruction from '../assets/illustrations/under_construction.svg'

const Endgame = () => {
    return (
        <Informational
            heading="End Game"
            content="This module is under construction at the moment !!!"
            illustration={underConstruction}
        />
    )
}

export default Endgame
