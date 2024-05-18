import { useState } from 'react'
import Flow from './Flow'
import Header from './Header'
import { Node } from 'reactflow'

const initialNodes: Node[] = [
  { id: '1', data: { label: 'Hello' }, position: { x: 0, y: 0 }, },
  { id: '2', data: { label: 'World' }, position: { x: 100, y: 100 }, },
]


function App()
{
  const [nodes, setNodes] = useState<Node[]>(initialNodes)

  return (
    <>
      <Header nodes={nodes} />
      <Flow nodes={nodes} setNodes={setNodes} />
    </>
  )
}

export default App