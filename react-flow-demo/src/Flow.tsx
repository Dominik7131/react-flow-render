import ReactFlow, { Node, NodeChange, applyNodeChanges } from 'reactflow';
import 'reactflow/dist/style.css';
import { useCallback } from 'react';

interface Props
{
  nodes: Node[]
  setNodes: any
}


const Flow: React.FC<Props> = ({ nodes, setNodes }): JSX.Element =>
{
  const onNodesChange = useCallback((changes: NodeChange[]) =>
  {
    setNodes((currentNodes: any) => applyNodeChanges(changes, currentNodes))
  },[],)
  

  return (
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
  );
}

export default Flow;