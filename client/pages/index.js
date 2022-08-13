import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { GlobalContext } from "../src/context/GlobalContext";
import { useContext } from 'react';

export default function Home() {
  const { user, logout } = useContext(GlobalContext);

  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
