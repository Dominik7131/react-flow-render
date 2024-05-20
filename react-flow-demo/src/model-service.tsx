import { useState, useEffect } from 'react'
import { useRecoilState, SetterOrUpdater, RecoilState, useRecoilValue } from 'recoil'

import { Entity, EntityIdentifier, ModelData } from './model'
import { setEntityLabel, setEntityPosition } from './model-actions'

/**
 * Interface with operations we can perform with entities. The idea is 
 * to hide work with the state.
 */
export interface ModelService {

  setLabel(identifier: EntityIdentifier, label: string): void

  setPosition(identifier: EntityIdentifier, x: number, y: number): void

  // It may be better to split into read-write interface.

  entity(identifier: EntityIdentifier): Entity | null;

  listEntities(): Entity[]

  currentDataSnapshot(): ModelData

}

/**
 * Wrap the original service and call setter every time a function is called.
 * The objective is to make sure that we update the atome after every operation.
 */
class RecoilModelService implements ModelService {

  /**
   * Holds latest version of the data. This can be from the Recoil or local
   * copy as multiple operations can be called before Recoil atom updates.
   */
  data: ModelData

  setData: SetterOrUpdater<ModelData>

  constructor(data: ModelData, setData: SetterOrUpdater<ModelData>) {
    this.data = data
    this.setData = setData
  }

  setLabel(identifier: EntityIdentifier, label: string): void {
    this.data = setEntityLabel(this.data, identifier, label)
    this.setData(this.data)
  }

  setPosition(identifier: EntityIdentifier, x: number, y: number): void {
    this.data = setEntityPosition(this.data, identifier, x, y)
    this.setData(this.data)
  }

  entity(identifier: EntityIdentifier): Entity | null {
    return this.data.entities[identifier] ?? null;
  }

  listEntities(): Entity[] {
    return Object.values(this.data.entities)
  }

  currentDataSnapshot(): ModelData {
    return this.data
  }

}

export function useModelService(state: RecoilState<ModelData>): {
  service: ModelService,
} {
  console.log('useModelService')
  const [data, setData] = useRecoilState(state)
  const [service, setService] = useState<ModelService>(new RecoilModelService(data, setData))
  // We update the service where there is any change in data.
  useEffect(() => {
    console.log('useModelService: useEffect')
    setService(new RecoilModelService(data, setData))
  }, [data])
  return {
    service: service
  }
}
