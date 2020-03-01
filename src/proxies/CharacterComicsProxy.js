import { BaseProxy } from './BaseProxy'

export class CharacterComicsProxy extends BaseProxy {
  constructor ({ characterId, parameters = {} } = {}) {
    super({
      endpoint: `v1/public/characters/${characterId}/comics`,
      parameters,
    })
  }
}
