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

        {/* Footer placeholder */}
        <div style={{ height: '3rem' }} />
      </Layout>
    </>
  )
}
