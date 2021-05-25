import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from '../components/Card'
import { data } from '../data/openings/openings'
import { Opening } from '../components/types'
import { useDispatch } from 'react-redux'
import { selectOpening } from '../redux/actions'
// import { Route } from 'react-router-dom'

const CardLayout = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    // justify-content: space-between;
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
        </div>
    )
}

export default Openings
