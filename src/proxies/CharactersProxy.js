import { BaseProxy } from './BaseProxy'

export class CharactersProxy extends BaseProxy {
  constructor ({ parameters = {} } = {}) {
    super({
      endpoint: 'v1/public/characters',
      parameters,
    })
  }
}
