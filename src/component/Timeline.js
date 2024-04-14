import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import AnotherDiary from './AnotherDiary';
import { db } from '../firebase/firebase';

const Wrapper = styled.div`
    display: flex;
    max-width: 600px;
    width: 100%;
    gap: 10px;
    flex-direction: column;
`;

export default function Timeline() {
    const [isdiarys, setIsDiarys] = useState([]);

        const fetchDiary = async () => {
            const DiaryQuery = query(
                collection(db, "diary"),
                orderBy("createAt", "desc"),
                limit(25),
            );
            const unsubscribe = onSnapshot(DiaryQuery, (snapshot) => {
                const fetchedDiarys = snapshot.docs.map((doc) => {
                    const { title, diary, createAt, userId, username, photo } = doc.data();
                    return {
                        title,
                        diary,
                        createAt,
                        userId,
                        username,
                        photo,
                        id: doc.id,
                    };
                });
                setIsDiarys(fetchedDiarys);
            });

            return () => unsubscribe();
        };
        useEffect(() => {
        fetchDiary();
        
    }, []);
    
    return (
        <Wrapper>
            {isdiarys.map((item) => (
                <AnotherDiary 
                diarys={[item]}
                title={item.title}
                diary={item.diary}
                createAt={item.createAt}
                userId={item.userId}
                username={item.username}
                photo={item.photo}
                id={item.id}
                key={item.id} {...item}
                />
            ))}
        </Wrapper>
    );
}