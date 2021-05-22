import styled from 'styled-components'

export interface SquareIndicatorProps {
    x: number
    y: number
    size: number
    type?: "move" | "piece" | "hover"
    color?: string
}

const SquareIndicator = styled.div`
    position: absolute;
    width: ${(props: SquareIndicatorProps) => (props.size + (props.type === "hover" ? -4 : 2)) + 'px'};
    height: ${(props: SquareIndicatorProps) => (props.size + (props.type === "hover" ? -4 : 2)) + 'px'};
    left: ${(props: SquareIndicatorProps) => props.x + 'px'};
    top: ${(props: SquareIndicatorProps) => props.y + 'px'};
    background: ${(props: SquareIndicatorProps) => props.color ? props.color : (props.type === "move" ? '#f0eb97' : (props.type === "piece" ? 'yellow' : 'none'))};
    border: ${(props: SquareIndicatorProps) => props.type === "hover" ? '3px solid #d9d98b' : 'none'};
    z-index: 0;
`
export default SquareIndicator
