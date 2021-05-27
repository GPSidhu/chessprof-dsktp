import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

// redux
import { useDispatch } from 'react-redux'
import { selectOpening } from '../redux/actions'

// src
import Card from '../components/Card'
import { data } from '../data/openings/openings'
import { Opening } from '../components/types'
import Informational from '../components/Informational'

const CardLayout = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    > * {
        margin: 1rem;
    }
`
const Openings = () => {
    const dispatch = useDispatch();
    const [openings, setOpenings] = useState<Opening[] | null>(null);
    useEffect(() => {
        // parse openings
        let obj = JSON.parse(JSON.stringify(data));
        setOpenings(obj)
    }, []);
    return (
        <div>
            <CardLayout>
                {
                    openings && openings.map((opening: Opening) => (
                        <Card
                            key={opening.id}
                            title={opening.title}
                            style={{ width: '300px' }}
                            onClick={() => dispatch(selectOpening(opening))}
                            to={`/openings/${opening.id}`}
                        >
                        </Card>
                    ))
                }
            </CardLayout>
            <div style={{margin: '3rem auto', width: '100%', height: '500px'}}>
                <Informational heading={"More openings ...coming soon"} />
            </div>
        </div>
    )
}

export default Openings
