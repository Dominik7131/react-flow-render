import { RecoilState, noWait } from 'recoil'
import { Node } from 'reactflow'

import { ModelData } from './model'
import { ModelService, useModelService } from './model-service'
import { useDiagramUpdateLabels, useModelUpdatePositions } from './diagram-service'

const Header = (props: {
    model: RecoilState<ModelData>,
    nodes: RecoilState<Node[]>,
}): JSX.Element => {
    console.warn('Header: render')
    const { service } = useModelService(props.model)
    const updateLabelsFromModel = useDiagramUpdateLabels(props.nodes)

    const handleChangeNodeNames = () => {
        console.log("handleChangeNodeNames ...")
        // CONSIDER We can add something like begin/commit, 
        // as we do perform a lot of operations in one place.
        // The purpose would be to delay update of the state.
        for (const node of service.listEntities()) {
            console.log('>', node)
            service.setLabel(node.identifier, node.label + '.')
        }
        updateLabelsFromModel(service)
    }

    return (
        <div className='header'>
            <PrintNodesButton service={service} nodes={props.nodes} />
            <button onClick={handleChangeNodeNames}>
                Change node names
            </button>
        </div>
    )
}

export default Header

// We extract this component as we need to update it when we change 
// the positions, so quite often. The idea is to limit what needs
// to be re-rendered.
function PrintNodesButton(props: {
    service: ModelService,
    nodes: RecoilState<Node[]>,
}) {
    console.log('PrintNodesButton: render')
    const updatePositionsFromNodes = useModelUpdatePositions(props.nodes);

    const handlePrintNodeNames = () => {
        console.log('handlePrintNodeNames ...')
        updatePositionsFromNodes(props.service)
        for (const node of props.service.listEntities()) {
            console.log(`  '${node.identifier}':'${node.label}' at [${node.position.x}, ${node.position.y}]`)
        }
    }

    return (
        <button onClick={handlePrintNodeNames}>
            Print node names
        </button>

    )
}
