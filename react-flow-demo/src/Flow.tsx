import ReactFlow, { Node, NodeChange, ReactFlowProvider, applyNodeChanges } from 'reactflow';
import 'reactflow/dist/style.css';
import { Dispatch, useCallback } from 'react';

interface Props
{
  nodes: Node[]
  setNodes: Dispatch<React.SetStateAction<Node[]>>
}


const Flow: React.FC<Props> = ({ nodes, setNodes }): JSX.Element =>
{
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
  );
}

export default Flow;