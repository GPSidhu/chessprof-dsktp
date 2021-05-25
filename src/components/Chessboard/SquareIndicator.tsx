import styled from 'styled-components'

export interface SquareIndicatorProps {
    x: number
    y: number
    type?: "move" | "piece" | "hover"
    clickable?: boolean
    color?: string
}

const SquareIndicator = styled.div`
    position: absolute;
    width: ${(props: SquareIndicatorProps) => `calc(12.5% + ${(props.type === "hover" ? -4 : 1)}px)`};
    height: ${(props: SquareIndicatorProps) => `calc(12.5% + ${(props.type === "hover" ? -4 : 1)}px)`};
    left: ${(props: SquareIndicatorProps) => (100 / 8 * props.x) + '%'};
    top: ${(props: SquareIndicatorProps) => (100 / 8 * props.y) + '%'};
    margin-top: -3px;
    background: ${(props: SquareIndicatorProps) => props.color ? props.color : (props.type === "move" ? '#f0eb97' : (props.type === "piece" ? 'yellow' : 'none'))};
    border: ${(props: SquareIndicatorProps) => props.type === "hover" ? '3px solid #fcdb03' : 'none'};
    cursor: ${(props: SquareIndicatorProps) => props.clickable ? 'pointer' : 'auto'};
    z-index: 2;
    opacity: 0.5;
`
export default SquareIndicator
