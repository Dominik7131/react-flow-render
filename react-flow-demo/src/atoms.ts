import { atom } from "recoil";
import { Node } from 'reactflow'


const initialNodeData: any = [
    { data: { label: 'Hello' } },
    { data: { label: 'World' } },
]

const initialNodes: Node[] = [
    { id: '1', data: { label: 'Hello' }, position: { x: 0, y: 0 }, },
    { id: '2', data: { label: 'World' }, position: { x: 100, y: 100 }, },
  ]

export const nodesDataState = atom({
    key: 'nodesDataState',
    default: initialNodeData,
})

export const nodesState = atom({
    key: 'nodesState',
    default: initialNodes,
})