import { useEffect } from 'react'
import { useRecoilState, RecoilState, SetterOrUpdater, useSetRecoilState, useRecoilValue } from 'recoil'
import { Node, NodeChange, applyNodeChanges } from 'reactflow'

import { ModelData } from './model'
import { useModelService, ModelService } from './model-service'

/**
 * Provide functionality used by Diagram component.
 */
export const useDiagramService = (modelState: RecoilState<ModelData>, nodesState: RecoilState<Node[]>): {
  nodes: Node[],
  onNodesChange: (changes: NodeChange[]) => void,
} => {
  console.log('useDiagramService')
  const [nodes, setNodes] = useRecoilState<Node[]>(nodesState)

  initialize(modelState, setNodes)

  const onNodesChange = (changes: NodeChange[]) => {
    console.log('onNodesChange', changes)
    setNodes((currentNodes: Node[]) => applyNodeChanges(changes, currentNodes))
  };

  return {
    nodes,
    onNodesChange,
  }
}

function initialize(modelState: RecoilState<ModelData>, setNodes: SetterOrUpdater<Node[]>) {
  // This would be good place to use read-only version.
  // We use service to avoid dependency to ModelData.
  const { service } = useModelService(modelState)
  useEffect(() => {
    // Create nodes based on the initial service data.
    const nextNodes: Node[] = service.listEntities().map(entity => ({
      id: entity.identifier,
      data: {
        label: entity.label,
      },
      position: {
        x: entity.position.x,
        y: entity.position.y
      }
    }))
    setNodes(nextNodes)
  }, [])
}

export const useDiagramUpdateLabels = (nodesState: RecoilState<Node[]>): (service: ModelService) => void => {
  console.log('useDiagramUpdateLabels')
  const setNodes = useSetRecoilState<Node[]>(nodesState)

  // Since atom is updated in the next rendering we need to pass
  // the latest data here using 'service' argument. This would be
  // good place to use read-only version.
  return (service: ModelService) => {
    console.log('useDiagramUpdateLabels: call')
    setNodes((nodes) => nodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        label: service.entity(node.id)?.label ?? ''
      }
    })))
  }
}

export const useModelUpdatePositions = (nodesState: RecoilState<Node[]>): (service: ModelService) => void => {
  console.log('useModelUpdatePositions')
  const nodes = useRecoilValue(nodesState);

  return (service: ModelService) => {
    console.log('useModelUpdatePositions: call')
    nodes.forEach(node => service.setPosition(node.id, node.position.x, node.position.y))
  }
}
