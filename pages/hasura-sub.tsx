import { VFC } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { GET_USERS_LOCAL } from '../queries/queries'
import { GetUsersQuery } from '../types/generated/graphql'
import { Layout } from '../components/Layout'

const FetchSub: VFC = () => {
  const { data } = useQuery<GetUsersQuery>(GET_USERS_LOCAL)

  return (
    <Layout title="Hasura fetchPolicy read cache">
      <p className="font-bold">キャッシュから参照</p>
      <p className="mb-6">（Networkタブで確認）</p>
      {data?.users.map((user) => {
        return (
          <p className="my-1" key={user.id}>
            {user.name}
          </p>
        )
      })}
      <Link href="/hasura-main">
        <a className="mt-6">hasura-main</a>
      </Link>
    </Layout>
  )
}

export default FetchSub
