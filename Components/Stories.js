import React, { useEffect, useState } from 'react';
import faker from 'faker';
import Story from './Story';
import { useSession} from "next-auth/react";



function Stories() {

    const [suggestions, setSuggestions] =useState([]);
    const {data:session} = useSession();

    useEffect(() =>{
        const suggestions = [...Array(15)].map((_, i)=>({
            ...faker.helpers.contextualCard(),
            id: 1,
            })
        );
        console.log(suggestions);
        setSuggestions(suggestions);
    },[])

  return (
    <div className='flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll'>
        {session && (
            <Story img={session.user.image}
            username = {session.user.username}/>
        )}

        {suggestions.map(profile=>(
            <Story
                key={profile.id}
                img='https://library.kissclipart.com/20180917/e/kissclipart-instagram-clipart-computer-icons-user-instagram-a658b4d8bd29eadb.jpg'
                username={profile.username }
            />
        ))}

    </div>
  )
}

export default Stories