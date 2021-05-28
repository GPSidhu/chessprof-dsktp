import { ReactElement } from 'react'

// react icons
import {
    AiFillStepForward,
    AiFillFastForward,
    AiFillStepBackward,
    AiFillFastBackward
} from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdEmail, MdPhone, MdRotate90DegreesCcw, MdHelpOutline } from 'react-icons/md'
import { FaHome, FaLinkedin, FaInstagram, FaGithub, FaFacebook} from 'react-icons/fa'
import { HiOutlineLocationMarker, HiOutlineRefresh } from 'react-icons/hi'
import { VscLaw } from 'react-icons/vsc'

// src
import PieceIcons from './assets/pieces'
import NavIcons from './assets/nav'

export enum VIEW { WHITE = 1, BLACK = 2 }
export const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
export const PIECE_MAP: { [key: string]: string } = {
    K: "wK", Q: "wQ", B: "wB", N: "wN", R: "wR", P: "wP",
    k: "bK", q: "bQ", b: "bB", n: "bN", r: "bR", p: "bP",
};
export const PIECE_ICON_MAP: { [key: string]: string } = {
    K: PieceIcons.wK, Q: PieceIcons.wQ, B: PieceIcons.wB, N: PieceIcons.wN, R: PieceIcons.wR, P: PieceIcons.wP,
    k: PieceIcons.bK, q: PieceIcons.bQ, b: PieceIcons.bB, n: PieceIcons.bN, r: PieceIcons.bR, p: PieceIcons.bP,
}
export const SIZE_MAP: { [key: string]: { width: number, height: number, text: number } } = {
    "sm": { width: 34, height: 24, text: 12 },
    "md": { width: 88, height: 34, text: 18 },
    "lg": { width: 98, height: 44, text: 22 },
}
export const VARIANT_MAP: { [key: string]: { bg: string, color: string } } = {
    "primary": { bg: "#ebe9e6;", color: "rgba(0, 0, 0, 0.65)" },
    "secondary": { bg: "#666463", color: "rgba(255, 255, 255, 0.65)" },
    "tertiary": { bg: "black", color: "rgba(255, 255, 255, 0.65)" }
}
export const NAV_ICON_MAP: { [key: string]: string } = {
    opening: NavIcons.opening,
    endgame: NavIcons.endgame,
    practice: NavIcons.practice,
    puzzle: NavIcons.puzzle,
    online: NavIcons.online,
    offline: NavIcons.offline,
    info: NavIcons.info
}

export const SOCIAL_ICON__MAP = {
    email: <MdEmail />,
    phone: <MdPhone />,
    site: <FaHome />,
    facebook: <FaFacebook />,
    linkedin: <FaLinkedin />,
    github: <FaGithub />,
    instagram: <FaInstagram />
}

export const ICON_COMP_MAP: { [key: string]: { icon: ReactElement, label: string } } = {
    'rotate': {
        icon: <MdRotate90DegreesCcw />,
        label: 'Rotate'
    },
    'reset': {
        icon: <HiOutlineRefresh />,
        label: 'Reset'
    },
    'marker': {
        icon: <HiOutlineLocationMarker />,
        label: 'Marker'
    },
    'validate': {
        icon: <VscLaw />,
        label: 'Validate'
    },
    'forward': {
        icon: <AiFillStepForward />,
        label: 'Forward'
    },
    'backward': {
        icon: <AiFillStepBackward />,
        label: 'Backward'
    },
    'fast-forward': {
        icon: <AiFillFastForward />,
        label: 'Fast-forward'
    },
    'fast-backward': {
        icon: <AiFillFastBackward />,
        label: 'Fast-backward'
    },
    'info': {
        icon: <BsInfoCircle />,
        label: 'Info'
    },
    'help': {
        icon: <MdHelpOutline />,
        label: 'Help'
    }
}
