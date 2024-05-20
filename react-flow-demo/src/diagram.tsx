import { RecoilState } from 'recoil'
import ReactFlow, { ReactFlowProvider, Node } from 'reactflow'

import { ModelData } from './model'
import { useDiagramService } from './diagram-service'

import 'reactflow/dist/style.css'

const Diagram = (props: {
  model: RecoilState<ModelData>,
  nodes: RecoilState<Node[]>,
}): JSX.Element => {
  console.log('Diagram: render')

  const { nodes, onNodesChange } = useDiagramService(props.model, props.nodes)

  return (
    <ReactFlowProvider>
      <div className='diagram'>
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          fitView
        />
      </div>
    </ReactFlowProvider>
  )
}

export default Diagram;
