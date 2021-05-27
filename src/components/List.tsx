import React, { ReactNode } from 'react'
import styled from 'styled-components'

interface Props<T> {
    children: (item: T) => ReactNode
    dir?: 'horizontal' | 'vertical'
    alternateColor?: boolean
    listStyle?: "number"
    items: T[]
    windowing?: boolean
}

interface IdObj {
    id: string | number
}

interface ListItemProps {
    index: number
    listStyle?: "number"
    alternateColor?: boolean
}

const ListWrapper = styled.div`
    display: flex;
    width: 100%;
    height: auto;
    flex-direction: column;
    list-style: none;
    background: grey;
    padding: 0;
    counter-reset: item; 
`

const ListItem = styled.div`
    margin: 0;
    line-height: 2rem;
    width: 100%;
    height: 100%;
    background: ${(props: ListItemProps) => props.alternateColor ? (props.index % 2 === 0 ? '#878686' : '#706f6f') : '#5c5c5c'};
    ${(props: ListItemProps) => props.listStyle === 'number' ?
        `::before {
        counter-increment: item;
        content: counter(item) ".";
        font-weight: bold;
        color: #c7c5c1;
        margin-left: 4px;
    }` : ``}
}
`

const List = <T extends IdObj>({
    children,
    items,
    alternateColor,
    listStyle,
    dir,
}: Props<T>) => {
    return (
        <ListWrapper className='list-group'>
            {
                items.map((item, index) => (
                    <ListItem key={item.id} className="list-item" index={index} listStyle={listStyle} alternateColor={alternateColor}>
                        {children(item)}
                    </ListItem>
                ))
            }
        </ListWrapper>
    )
}

export default List
