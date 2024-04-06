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
    const [diarys, setDiarys] = useState([]);

    useEffect(() => {
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
                setDiarys(fetchedDiarys);
            });

            return () => unsubscribe();
        };

        fetchDiary();
    }, []);
    return (
        <Wrapper>
            {diarys.map((diary) => (
                <AnotherDiary 
                title={diary.title}
                diary={diary.diary}
                createAt={diary.createAt}
                userId={diary.userId}
                username={diary.username}
                photo={diary.photo}
                id={diary.id}
                
                key={diary.id} {...diary} />
            ))}
        </Wrapper>
    );
}