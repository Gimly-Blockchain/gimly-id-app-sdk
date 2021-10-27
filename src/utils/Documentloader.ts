import { defaultDocumentLoader } from '@sphereon/rn-vc-js'
import { extendContextLoader } from 'jsonld-signatures'
import fetch from 'cross-fetch'

import customContexts from '../resources/customContexts.json'
import { Resolver as UniResolver } from '@sphereon/did-uni-client'

interface CustomContexts {
  [custom: string]: {
    [custom: string]: string
  }
}

const customContextTyped = customContexts as unknown as CustomContexts

const documentLoaderExtension = async (url: string) => {
  if (customContextTyped[url]) {
    return new Promise(resolve =>
      resolve({
        contextUrl: null,
        documentUrl: url,
        document: customContextTyped[url]
      })
    )
  }

  if (url.includes('did:')) {
    const resolver = new UniResolver()
    const { didDocument } = await resolver.resolve(url)
    return {
      contextUrl: null,
      documentUrl: url,
      document: didDocument
    }
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
