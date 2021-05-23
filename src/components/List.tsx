import React, { ReactNode } from 'react'
import styled from 'styled-components'

interface Props<T> {
    children: (item: T) => ReactNode
    dir: 'horizontal' | 'vertical'
    dividers?: boolean
    items: T[]
    windowing?: boolean
}

interface IdObj {
    id: string | number
}

const ListWrapper = styled.ul`
    display: flex;
    flex-direction: column;
    list-style: none;
`

const ListItem = styled.li`
    margin: 8px 0;
`

const List = <T extends IdObj>({
    children,
    dir,
    dividers,
    items,
}: Props<T>) => {
    // const className = genClassName()
    // const visibleItems = useWindowing(items, windowing)
    return (
        <ListWrapper className='list-group'>
            {
                items.map((item) => (
                    <ListItem key={item.id} className="list-item">
                        {children(item)}
                    </ListItem>
                ))
            }
        </ListWrapper>
    )
}

export default List
