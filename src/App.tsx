import { Nav } from './components/Nav'
import { Layout } from './components/atoms'

export default function App() {
  return (
    <>
      <Layout>
        <Nav />

        <main>
          <p>body</p>
        </main>

        <p>footer</p>
      </Layout>
    </>
  )
}
