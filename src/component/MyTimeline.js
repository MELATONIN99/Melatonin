import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { collection, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import AnotherDiary from './AnotherDiary';
import { auth, db } from '../firebase/firebase';

const Wrapper = styled.div`
    display: flex;
    max-width: 600px;
    width: 100%;
    gap: 10px;
    flex-direction: column;
`;

export default function MyTimeline() {
    const user = auth.currentUser;
    const [diarys, setDiarys] = useState([]);

    useEffect(() => {
        const fetchDiary = async () => {
            const diaryQuery = query(
                collection(db, "diary"),
                orderBy("createAt", "desc"),
                where("userId", "==", user?.uid),
                limit(25),
            );

            const unsubscribe = await onSnapshot(diaryQuery, (snapshot) => {
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
    }, [user]);
    return (
        <Wrapper>
            {diarys.map((diary) => (
                <AnotherDiary 
                myTitle={diary.title}
                myDiary={diary.diary}
                myCreateAt={diary.createAt}
                myUserId={diary.userId}
                myUsername={diary.username}
                myPhoto={diary.photo}
                myId={diary.id}
                myDiarys={[diary]}
                key={diary.id} {...diary} />
            ))}
        </Wrapper>
    );
}