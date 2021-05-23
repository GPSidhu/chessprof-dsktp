import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from '../components/Card'
import { data, Opening, ConditionalMove } from '../data/openings/openings'

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
    const [openings, setOpenings] = useState<Opening[] | null>(null);
    const onClick = (item: string) => {
        alert(item)
    }

    useEffect(() => {
        // parse openings
        let obj = JSON.parse(JSON.stringify(data));
        debugger
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
                            // subTitle={item.name}
                            style={{ width: '300px' }}
                            onClick={() => onClick(opening.title)}
                        >
                        </Card>
                    ))
                }
            </CardLayout>
        </div>
    )
}

export default Openings
