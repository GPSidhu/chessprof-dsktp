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
    img {
        width: 60%;
        border: 1px solid black;
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
                            variant="primary"
                            key={opening.id}
                            title={opening.title}
                            style={{ width: '250px' }}
                            onClick={() => dispatch(selectOpening(opening))}
                            to={`/openings/${opening.id}`}
                        >
                        <img src={`/images/thumbnails/openings/${opening.thumbnail}`} alt={opening.title}/>
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
