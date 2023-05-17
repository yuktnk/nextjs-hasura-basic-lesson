import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import 'cross-fetch/polyfill'

// export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE'

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined // 初期値のセットなし

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: 'https://notable-lacewing-49.hasura.app/v1/graphql',
      headers: {
        'x-hasura-admin-secret' : process.env.NEXT_PUBLIC_HASURA_KEY
      }
    }),
    cache: new InMemoryCache(),
  })
}

// Apolloクライアントの初期化
// - サーバー側: Apolloクライアントを初期化して返す
// - クライアント側: 既に初期化されたApolloクライアントを使用する
// Apolloクライアントがまだ作成されていない場合には、
// 作成してグローバル変数apolloClientに代入することで、再利用性を高めている
export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient()

  // 環境がサーバー側（SSG or SSR）である場合、
  // 毎回作成されたApolloクライアントを返す。
  if (typeof window === 'undefined') {
    return _apolloClient
  }

  // Apolloクライアントがまだ作成されていない場合、
  // 作成した_apolloClientをapolloClient変数に代入する。
  if (!apolloClient) {
    apolloClient = _apolloClient
  }

  return _apolloClient
}
