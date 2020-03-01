import { MARVEL } from '../utils/request'
import qs from 'qs'

const datableTypes = ['post', 'put', 'patch']

const ApiMap = new Map()
ApiMap.set('marvel', MARVEL)

export class BaseProxy {
  constructor ({ api = 'marvel', endpoint, parameters = { headers: {} } }) {
    this.$http = ApiMap.get(api) || MARVEL
    this.endpoint = endpoint
    this.parameters = parameters
    this.config = {}
  }

  setHeader (key, value) {
    this.config.headers = {
      ...this.config.headers,
      [ key ]: value,
    }
    return this
  }

  setHeaders (parameters) {
    this.config.headers = { ...this.config.headers, ...parameters }
    return this
  }

  setParameter (parameter, value) {
    this.parameters[ parameter ] = value
    return this
  }

  setParameters (parameters) {
    Object.keys(parameters).forEach((key) => {
      this.parameters[ key ] = parameters[ key ]
    })

    return this
  }

  removeParameter (parameter) {
    delete this.parameters[ parameter ]

    return this
  }

  removeParameters (parameters) {
    parameters.forEach((parameter) => {
      delete this.parameters[ parameter ]
    })

    return this
  }

  submit (requestType, url, data = null) {
    return new Promise((resolve, reject) => {
      const args = [url + this.getParameterString(), this.config]
      if (datableTypes.includes(requestType)) {
        args.splice(1, 0, data)
      }
      this.$http[ requestType ](...args).then((response) => {
        resolve(response.data)
      }).catch(({ response }) => {
        if (response) {
          reject(response.data)
        } else {
          reject(response)
        }
      })
    })
  }

  all () {
    return this.submit('get', `/${this.endpoint}`)
  }

  find ({ id }) {
    return this.submit('get', `/${this.endpoint}/${id}`)
  }

  create ({ item }) {
    return this.submit('post', `/${this.endpoint}`, item)
  }

  update ({ id, item }) {
    if (id) {
      return this.submit('put', `/${this.endpoint}/${id}`, item)
    }
    return this.submit('put', `/${this.endpoint}`, item)
  }

  delete ({ id }) {
    return this.submit('delete', `/${this.endpoint}/${id}`)
  }

  getParameterString () {
    const parameterStrings = qs.stringify(this.parameters, { encodeValuesOnly: true })

    return parameterStrings.length === 0 ? '' : `?${parameterStrings}`
  }
}
