import { useState } from 'react'
import Flow from './Flow'
import Header from './Header'
import { Node, ReactFlowProvider } from 'reactflow'

function App()
{
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: '1',
      data: { label: 'Hello' },
      position: { x: 0, y: 0 },
      type: 'input',
    },
    {
      id: '2',
      data: { label: 'World' },
      position: { x: 100, y: 100 },
    },
  ])

  return (
    <ReactFlowProvider>

      <Header nodes={nodes} />

      <Flow nodes={nodes} setNodes={setNodes} />

    </ReactFlowProvider>
  )
}

export default App