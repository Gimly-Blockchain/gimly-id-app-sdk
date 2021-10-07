import { defaultDocumentLoader } from '@sphereon/rn-vc-js'
import { extendContextLoader } from 'jsonld-signatures'
import fetch from 'cross-fetch'

import customContexts from './customContexts.json'
import { Resolver as UniResolver } from '@sphereon/did-uni-client'

const documentLoaderExtension = async (url: string) => {
  if (customContexts[url]) {
    return new Promise(resolve =>
      resolve({
        contextUrl: null,
        documentUrl: url,
        document: customContexts[url]
      })
    )
  }

  if (url.includes('did:')) {
    const resolver = new UniResolver()
    return resolver.resolve(url).then(result => ({
      contextUrl: null,
      documentUrl: url,
      document: result.didDocument
    }))
  }

  return fetch(url)
    .then(res => res.json())
    .then(jsonContext => ({
      contextUrl: null,
      documentUrl: url,
      document: jsonContext
    }))
    .catch(() => defaultDocumentLoader(url))
}

const documentLoader = extendContextLoader(documentLoaderExtension)

export default documentLoader
