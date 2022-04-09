import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../Components/Header';
import Feed from '../Components/Feed';
import Modal from "../Components/Modal";

export default function Home(){
  return (

    <div className="bg-gray-50 h-screen overflow-y-scroll ">
      <Head>
        <title>Instagram 2.0</title>
        <link rel="icon" href="/Instagramlogo.webp" />
      </Head>
      <Header />
      <Feed/>
      <Modal/>
    </div>
  )
}