
export type EntityIdentifier = string;

/**
 * Represents an entity in the model.
 */
export interface Entity {
  identifier: EntityIdentifier
  label: string
  position: {
    x: number
    y: number
  }
}

/**
 * Represent primary model state.
 */
export interface ModelData {
  entities: Record<EntityIdentifier, Entity>
}
