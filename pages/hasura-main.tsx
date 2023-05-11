import { VFC } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { GET_USERS } from '../queries/queries'
import { GetUsersQuery } from '../types/generated/graphql'
import { Layout } from '../components/Layout'

const FetchMain: VFC = () => {
  const { data, error } = useQuery<GetUsersQuery>(GET_USERS, {
    fetchPolicy: 'network-only',
  })

  if (error) {
    return (
      <Layout title="Hasura fetchPolicy">
        <p>Error: {error.message}</p>
      </Layout>
    )
  }

  return (
    <Layout title="Hasura fetchPolicy">
      <p className="font-bold">HasuraへFetchを行なう</p>
      <p className="mb-6">（Networkタブで確認）</p>

      {console.log(data)}
      {data?.users.map((user) => {
        return (
          <p className="my-1" key={user.id}>
            {user.name}
          </p>
        )
      })}
      <Link href="/hasura-sub">
        <a className="mt-6">hasura-sub</a>
      </Link>
    </Layout>
  )
}

export default FetchMain
