import { useState } from "react"
import styled from "styled-components"
import { auth, db, storage } from "../firebase/firebase"
import { addDoc, collection, updateDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { useNavigate } from "react-router-dom"
import MyTimeline from "./MyTimeline"

const DiaryForm = styled.form`
width: 50vw;
max-width: 600px;
`

const DiaryWrapper = styled.div`
width: 100%;
display: block;

`
const DiaryTitle = styled.input`
width: 100%;
height: 30px;
border: 0px;
border-radius: 20px 20px 0px 0px;
padding: 0px 5px;
font-weight: 600;
box-sizing: border-box;
margin-bottom: 2px;
background-color: #dedede;
color: #2B2B2B;
`
const DiaryText = styled.textarea`
width: 100%;
height: 50%;
border: 0px;
border-radius: 0px 0px 20px 20px;
padding: 10px 5px;
box-sizing: border-box;
background-color: #dedede;
color: #2B2B2B;
`

const AttachFileButton = styled.label`
padding: 10px 0px;
margin: 10px 0px;
  color: #BE9FE1;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #BE9FE1;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  display: block;
  &:hover,
  &:focus {
    background-color: #C9B6E4;
    color: #454545;
  }
`;


const DiaryImgInput = styled.input`
display: none;
`

const DiarySubmitBtn = styled.button`
padding: 10px 0px;
margin: 10px 0px;
  color: #BE9FE1;
  background-color: #2B2B2B;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #BE9FE1;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  display: block;
  font-family: 'Roboto', sans-serif;
  &:hover,
  &:focus {
    background-color: #C9B6E4;
    color: #454545;
  }
`

export default function MyDiary() {
    const user = auth.currentUser
    const navigate = useNavigate();
    if(user === null){
        navigate("/login")
    }

    const [isLoading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [diary, setDiary] = useState("");
    const [file, setFile] = useState(null);


    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    };

    const onChangeText = (e) => {
        setDiary(e.target.value);
    };

    const onFileChange = (e) => {
        const {files} = e.target;
        if(files && files.length === 1) {
            if (files[0].size > 1024 * 1024 ) {
                return alert("Please choose a file smaller than 1MB.");
            }
            setFile(files[0]);
        }
    };
    const onSubmit = async(e) => {
        e.preventDefault();
        const user = auth.currentUser
        if(!user || isLoading || diary === "" || diary.length >180) return;

        try {
            setLoading(true);
        const doc = await addDoc(collection(db, "diary"), {
                title,
                diary,
                createAt: Date.now(),
                username: user.displayName || "Anonymous",
                userId: user.uid,
            });
            if(file){
                const locationRef = ref(storage,`diary/${user.uid}/${doc.id}`);
            const result = await uploadBytes(locationRef, file);
            const url = await getDownloadURL(result.ref)
            updateDoc(doc, {
                photo : url,
            });
            }
            setTitle("");
            setDiary("");
            setFile(null);
        } catch(e){
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    return(
        <div>
      <DiaryForm onSubmit={onSubmit} >
        <DiaryWrapper>
          <DiaryTitle
          required
          rows={1}
          maxLength={30}
          onChange={onChangeTitle}
          value={title} 
          placeholder="Title"
          />
          <DiaryText
          required
          rows={5}
          maxLength={180}
          onChange={onChangeText}
          value={diary} 
          placeholder="Diary"
          />
          </DiaryWrapper>
          <AttachFileButton htmlFor="file">
            {file ? "Photo added ✔️" :"Add photo"}
        </AttachFileButton>
          <DiaryImgInput
          onChange={onFileChange}
          type="file" 
          id="file" 
          accept="image/*"
          ></DiaryImgInput>
          <DiarySubmitBtn>Submit</DiarySubmitBtn>
          </DiaryForm>
          <MyTimeline/>
          </div>
    )
  }