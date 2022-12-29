import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { DepartureList } from '../components/departureList'

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Entur Case</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Entur Case
        </h1>
        <h3>Jernbanetorget bussholdeplass</h3>
        <DepartureList />
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}