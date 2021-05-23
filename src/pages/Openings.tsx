import React from 'react'
import styled from 'styled-components'
import Card from '../components/Card'

const list = [
    { id: 1, name: 'John Carter' },
    { id: 2, name: 'John Wick' },
    { id: 3, name: 'Liam Neesam' },
    { id: 4, name: 'Tom Cruise' }
]
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
    return (
        <div>
            <CardLayout>
                {
                    list.map((item) => (
                        <Card
                            key={item.id}
                            title={item.name}
                            subTitle={item.name}
                            style={{width: '200px'}}>
                        </Card>
                    ))
                }
            </CardLayout>
        </div>
    )
}

export default Openings
