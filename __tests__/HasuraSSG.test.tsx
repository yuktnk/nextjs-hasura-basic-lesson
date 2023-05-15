import { render, screen, cleanup, findByText } from '@testing-library/react' // Reactコンポーネントをレンダリングし、コンポーネントのDOMをスクリーン上に表示するためのユーティリティ関数
import '@testing-library/jest-dom/extend-expect'
import { getPage, initTestHelpers } from 'next-page-tester' // Next.jsアプリケーションのページをテストするために使用
import { setupServer } from 'msw/node'
import { handlers } from '../mock/handlers'

initTestHelpers() // Jestのグローバル環境を設定

const server = setupServer(...handlers)

beforeAll(() => {
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
  cleanup()
})

afterAll(() => {
  server.close()
})

describe('SSG Test Cases', () => {
  it('Should render the list of users pre-fetched by getStaticProps', async () => {
    const { page } = await getPage({
      route: '/hasura-ssg',
    })
    render(page)

    expect(await screen.findByText('SSG + ISR')).toBeInTheDocument()
    expect(await screen.findByText('Test user A')).toBeInTheDocument()
    expect(await screen.findByText('Test user B')).toBeInTheDocument()
    expect(await screen.findByText('Test user C')).toBeInTheDocument()
  })
})
