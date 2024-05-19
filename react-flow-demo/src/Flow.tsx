import ReactFlow, { Node, NodeChange, ReactFlowProvider, applyNodeChanges } from 'reactflow';
import 'reactflow/dist/style.css';
import { useCallback } from 'react';
import { nodesState } from './atoms';
import { useRecoilState } from 'recoil';


const Flow: React.FC = (): JSX.Element =>
{
  const [nodes, setNodes] = useRecoilState(nodesState)

  const onNodesChange = useCallback((changes: NodeChange[]) =>
  {
    setNodes((currentNodes: Node[]) => applyNodeChanges(changes, currentNodes))
  },[],)


  return (
    <ReactFlowProvider>
      <div style={{ width: "1000px", height: '800px' }}>
        <ReactFlow
          nodes={nodes}
          // edges={edges}
          onNodesChange={onNodesChange}
          // onEdgesChange={onEdgesChange}
          // onConnect={onConnect}
          fitView
        />
      </div>
    </ReactFlowProvider>
  )
}

export default Flow;