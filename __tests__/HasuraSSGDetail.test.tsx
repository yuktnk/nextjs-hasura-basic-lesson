import { render, screen, cleanup, findByText } from '@testing-library/react' // Reactコンポーネントをレンダリングし、コンポーネントのDOMをスクリーン上に表示するためのユーティリティ関数
import '@testing-library/jest-dom/extend-expect'
import { getPage, initTestHelpers } from 'next-page-tester' // Next.jsアプリケーションのページをテストするために使用
import { setupServer } from 'msw/node'
import { handlers } from '../mock/handlers'
import userEvent from '@testing-library/user-event'

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

describe('UserDetail Test Cases', () => {
  it('Should render the user detail pre-fetched by getStaticProps', async () => {
    const { page } = await getPage({
      route: '/user/b6137849-7f1d-c2db-e609-22056fb86db3',
    })
    render(page)
    expect(await screen.findByText('User detail')).toBeInTheDocument()
    expect(
      await screen.findByText('2021-01-13T18:06:46.412969+00:00')
    ).toBeInTheDocument()

    userEvent.click(screen.getByTestId('back-to-main'))
    expect(await screen.findByText('SSG + ISR')).toBeInTheDocument()

    userEvent.click(
      screen.getByTestId('link-2b07950f-9959-1bc7-834d-5656e4aeaac2')
    )
    expect(await screen.findByText('User detail')).toBeInTheDocument()
    expect(
      await screen.findByText('2021-02-13T18:06:46.412969+00:00')
    ).toBeInTheDocument()
  })
})
