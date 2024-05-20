import { EntityIdentifier, ModelData } from './model'

export function setEntityLabel(
  data: ModelData, identifier: EntityIdentifier, label: string
): ModelData {
  const entity = data.entities[identifier]
  if (entity === undefined) {
    return data
  }
  return {
    entities: {
      ...data.entities,
      [identifier]: {
        ...entity,
        label
      }
    }
  }
}

export function setEntityPosition(
  data: ModelData, identifier: EntityIdentifier, x: number, y: number
): ModelData {
  const entity = data.entities[identifier]
  if (entity === undefined) {
    return data
  }
  return {
    entities: {
      ...data.entities,
      [identifier]: {
        ...entity,
        position: { x, y }
      }
    }
  }
}

