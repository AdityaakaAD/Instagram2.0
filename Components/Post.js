import React, { useEffect, useState } from 'react'
import { 
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon,
  } from "@heroicons/react/outline";
  
  import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { useSession } from 'next-auth/react';
import { addDoc,doc, collection, onSnapshot, orderBy, query, serverTimestamp, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Moment from 'react-moment';

function Post({id, username, userimg, img, caption}) {
  const {data : session } = useSession();
  const[comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasliked, setHasLiked] = useState(false);

  useEffect(()=>{
    const commentssection =  onSnapshot(query(collection(db, 'posts', id, 'comments' ),
    orderBy('timestamp', 'desc')),
    (snapshot)=> setComments(snapshot.docs) 
    );
    return commentssection;
  },[db,id])

  useEffect(() =>{
    const likessection = onSnapshot(collection(db, "posts",id,"likes"), 
    (snapshot)=>setLikes(snapshot.docs)
    );
    return likessection;
  },[db,id])

  useEffect(()=>{
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1);
  }, [likes]);

  const likePost = async ()=>{
    if(hasliked){
      await deleteDoc(doc(db, "posts", id, 'likes' , session.user.uid));
    }else{
      await setDoc(doc(db, "posts", id, "likes",    session.user.uid),{
        username: session.user.name,
    });
    }
  };

    const sendComment = async(e) => {
    e.preventDefault();
      // console.log("Aditya")
    const commenttoSend = comment;
    setComment('');
    // console.log("Aditya")
    await addDoc(collection(db,'posts', id , "comments"),
    {
      comment: commenttoSend,
      username: session.user.name,
      userimg: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className='bg-white my-7 border rounded-sm'>
        {/* Header */}
        <div className='flex items-center p-5'>
            <img src={userimg} className='rounded-full h-12 w-12 object-contain border p-1 mr-3 border-b-red-500'  alt="" />
            <p className='flex-1 font-bold'>{username}</p>
            <DotsHorizontalIcon className='h-5 '/>
        </div>

        {/* img */}
        <img src={img} className='object-cover w-full ' alt="" />

        {/* Buttons */}
        {session && (
          <div className='flex justify-between px-4 w-full'>
            <div className='flex space-x-4 '>
              {
                hasliked ? (
                  <HeartIconFilled onClick={likePost} className='postBtn text-red-500' />
                ):(
                  <HeartIcon onClick={likePost} className='postBtn' />
                )
              }
                <ChatIcon className='postBtn' />
                <PaperAirplaneIcon className='postBtn rotate-45' />
            </div>
            <BookmarkIcon className='postBtn'/>
          </div>
        )}


        {/* Captions */}
        <p className='p-5 truncate'>
          {likes.length > 0 && (
            <p className=' font-bold mb-1'>{likes.length} likes</p>
          )}
          <span className='font-bold mr-1'>{username}</span>
          {caption}
        </p>

        {/* Comments */}
        {comments.length > 0 && (
          <div className=' ml-10 h-20 overflow-y-scroll '>
            {comments.map(comment =>(
              <div key={comment.id} className= ' flex items-center space-x-2 mb3'>
                <img className=' h-7 rounded-full' src={comment.data().userimg} alt="" />
                <p className='text-sm flex-1'><span className=' font-bold'>{comment.data().username}</span>{comment.data().comment}</p>
                <Moment fromNow className=' pr-5 text-xs'>
                    {comment.data().timestamp?.toDate()}
                </Moment>
              </div>
            ))}
          </div>
        )}

        {/* Inputbox */}
        {session && (
        <form className='flex items-center p-4'>
          <EmojiHappyIcon className='h-7 pr-3 '/>
          <input 
          type="text" 
          value={comment}
          onChange = {e => setComment(e.target.value)}
          className='border-none flex-1 focus:ring-0 outline-none' 
          placeholder='Add a Comment...' />
          <button 
          type='submit' 
          disabled= {!comment.trim()} 
          onClick= {sendComment}
          className='font-semibold text-blue-400'>Post</button>
        </form>
        )}
    </div>
  );
}

export default Post;