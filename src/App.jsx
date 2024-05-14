import { useEffect, useState } from 'react'
import './App.css'
import { data } from './Data';


const alphabet = ["A","B","C","D","E","F","G","Ğ","H","I","İ","J","K","L","M","N","O","Ö","P","R","S","Ş","T","U","Ü","V","Y","Z"];

function App() {
  const [index , setIndex] = useState(0);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [answerArr, setAnswerArr] = useState([]);
  const [keywords , setKeywords] = useState([]);
  const [resultQuestion , setResultQuestion] = useState(false);
  const [falseQuestion , setFalseQuestion] = useState('');
  const shuffle = (arr)=>{
    return arr.sort(()=>Math.random()-0.5)
  }
  const setKeyword = (item)=>{
    if(answer.length > keywords.length){
      keywords.push(item);
      setKeywords([...keywords])
    }
    if(answer.length === keywords.length){
      if(answer === keywords.join('')){
        setIndex((prev)=> prev + 1 );
        setKeywords([])
        setResultQuestion(true);
          setFalseQuestion(()=>{
            return <div className='check-true'>  Doğru Cevap : {answer}</div>
          })
          setTimeout(()=>{
            setFalseQuestion('');
          },2000)
        
        
      }else{
        setFalseQuestion(()=>{
          return <div>Yanlış Cevap</div>
        })
        setTimeout(()=>{
          setFalseQuestion('');
        },1500)
        
      }
    }
  }
  const removeKeyword = (item)=>{
    keywords.pop(item);
    setKeywords([...keywords])
  }

  useEffect(()=>{
    setResultQuestion(false);
    setAnswer("");
    if(typeof data[index] !== 'undefined'){
      const updateAnswer = data[index].answer.toLowerCase()
      setAnswer(updateAnswer);
      setQuestion(data[index].question);
      const stringToArray = updateAnswer.split('')
      stringToArray.push(alphabet[Math.floor(Math.random()*alphabet.length)].toLowerCase());
      stringToArray.push(alphabet[Math.floor(Math.random()*alphabet.length)].toLowerCase());
      stringToArray.push(alphabet[Math.floor(Math.random()*alphabet.length)].toLowerCase());
      setAnswerArr(shuffle(stringToArray))
    }
    
    
  },[ resultQuestion])
     

  return (
    <>
      <div >
        {answer !== '' && 
       <div className='app'>
      <div className='q-header'>
        <span className='question'>{question}?</span>
      </div>
      
      <div className='text'>
        <div className='words'>
        {
          keywords.map((item, index)=>(
            <span className='text-body' key={index}>{item}</span>
            

          ))
        }
        </div>
      </div>
      <div>
        {
          answerArr.map((item , index)=>(
            <button className='button' key={index} onClick={()=>setKeyword(item)}  > {item}</button>
          ))
        }
      </div>
        <div>
          <button onClick={removeKeyword}>Delete</button>
        </div>
        <div>
          <span>{falseQuestion}</span>
        </div>
        </div>
        }
        {answer === '' &&
        <div>
          <h2>Yarışmamız Sona Erdi</h2>
          <h5>Skorunuz : </h5>
          <h5>Süre : </h5>
        </div>
        
        }
      </div>


    </>
  )
}

export default App
