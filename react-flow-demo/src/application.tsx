import { atom, RecoilRoot } from 'recoil'
import { Node } from 'reactflow'

import Diagram from './diagram'
import Header from './header'

import { ModelData } from './model'

import './application.css'
import { useEffect } from 'react'

// We store all service data in here.
const modelState = atom({
  key: 'modelState',
  default: createDefaultModelServiceData(),
})

function createDefaultModelServiceData(): ModelData {
  return {
    entities: {
      '001': {
        identifier: '001',
        label: 'Person ',
        position: { x: 0, y: 0 }
      },
      '002': {
        identifier: '002',
        label: 'Content ',
        position: { x: 400, y: 0 }
      }
    }
  }
}

const nodesState = atom<Node[]>({
  key: 'diagramNodesState',
  default: []
})

function Application() {
  // We pass the atom down the tree using props. As the atom is not changing
  // there is no change in the props. This approach allows us to re-use
  // the same component with different state.

  return (
    <RecoilRoot>
      <Header model={modelState} nodes={nodesState} />
      <Diagram model={modelState} nodes={nodesState} />
    </RecoilRoot>
  )
}

export default Application
