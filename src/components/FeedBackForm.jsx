import { useState, useContext , useEffect} from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";
import FeedbackContext from '../context/FeedbackContext';

function FeedBackForm() {

    const {addFeedback,feedbackEdit, updateFeedback} = useContext(FeedbackContext);

    useEffect(()=>{
     if(feedbackEdit.edit==true){
         setBtnDisable(false);
         setText(feedbackEdit.item.text);
         setRating(feedbackEdit.item.rating);
     }
    },[feedbackEdit])

    const[text,setText]=useState('');
    const[rating,setRating]=useState(10);
    const[btnDisabled,setBtnDisable]=useState();
    const[message,setMessage]=useState('');

    const handleTextChange = (e) => {
        if(text == ''){
            setBtnDisable(true);
            setMessage(null);
        }
        else if(text !='' && text.trim().length <=10){
            setMessage('Feedback must be atleast 10 character');
        }
        else{
            setBtnDisable(false);
            setMessage(null);
        }
           setText(e.target.value);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(text.trim().length > 10){
            const newFeedback = {
                text,
                rating,
            }

            if(feedbackEdit.edit == true){
                updateFeedback(feedbackEdit.item.id,newFeedback);
            }
            else{
                addFeedback(newFeedback);
            }
          
            setText('');
        }
    }

    return (
        <Card>
            <form onSubmit={handleSubmit}>
            <h3>Please Provide your Feedback.</h3>
            <RatingSelect select = {(rating) => setRating(rating)}/>
                <div className="input-group">
                    <input type="text" placeholder="Write a feedback" onChange={handleTextChange} value={text}/>
                    <Button type="submit" isDisabled={btnDisabled}>Submit</Button>
                </div>
                {message && <div className="message">{message}</div>}
            </form>
        </Card>
    )
}

export default FeedBackForm;
