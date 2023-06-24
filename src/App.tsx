import { Nav } from './components/Nav'
import { Layout } from './components/atoms'
import { Hero } from './components/hero'

export default function App() {
  return (
    <>
      <Layout>
        <Nav />

        <main>
          <Hero />
        </main>

        <p>footer</p>
      </Layout>
    </>
  )
}
