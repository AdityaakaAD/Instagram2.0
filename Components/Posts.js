import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Post from './Post';
import { db } from '../firebase';


function Posts() {
  const [posts, setPosts] =useState([]);

  useEffect(() =>{
    const unsubscribe = onSnapshot(query(collection(db, 'posts'),orderBy('timestamp','desc')),snapshot =>{
      setPosts(snapshot.docs);
    });
    return unsubscribe;
  }, [db])

  // useEffect(
  //   ()=>
  //   onSnapshot(
  //     query(collection(db, 'posts'), orderBy("timeStamp", "desc")),
  //     (snapshot)=>{
  //       setPosts(snapshot.docs);
  //     }
  //   ),
  //   [db]
  // );

  // console.log(posts);
  return (
    <div>
      {posts.map((post)=>(
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          userimg = {post.data().profileImg}
          img= {post.data().image}
          caption = {post.data().caption}
        />
      ))}
    </div>
  );
}

export default Posts;


  // const posts= [
  //   {
  //     id: '123',
  //     username: 'AdityaakaAD',
  //     userimg: 'https://library.kissclipart.com/20180917/e/kissclipart-instagram-clipart-computer-icons-user-instagram-a658b4d8bd29eadb.jpg',
  //     img: 'https://www.yankodesign.com/images/design_news/2020/06/all-black-desk-setups-that-will-inspire-you-to-adapt-this-modern-minimal-trend/01-Black-Desk-Setup_-minimal_modern_hero3.jpg',
  //     caption: 'Dope',
  //   },
  //   {
  //     id: '123',
  //     username: 'AdityaakaAD',
  //     userimg: 'https://library.kissclipart.com/20180917/e/kissclipart-instagram-clipart-computer-icons-user-instagram-a658b4d8bd29eadb.jpg',
  //     img: 'https://cdn.wallpapersafari.com/83/38/WydtrM.jpg',
  //     caption: 'Dope',
  //   },
  //   {
  //     id: '123',
  //     username: 'AdityaakaAD',
  //     userimg: 'https://library.kissclipart.com/20180917/e/kissclipart-instagram-clipart-computer-icons-user-instagram-a658b4d8bd29eadb.jpg',
  //     img: 'https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg?cs=srgb&dl=pexels-pixabay-247431.jpg&fm=jpg',
  //     caption: 'Dope',
  //   },
  //   {
  //     id: '123',
  //     username: 'AdityaakaAD',
  //     userimg: 'https://library.kissclipart.com/20180917/e/kissclipart-instagram-clipart-computer-icons-user-instagram-a658b4d8bd29eadb.jpg',
  //     img: 'https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  //     caption: 'Dope',
  //   },
  // ];