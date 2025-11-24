import { useState, useEffect } from 'react'

// import './App.css'

const Timer = ()=>{
    useEffect(()=>{
        const timer = setInterval(()=>{
            console.log('타이머 돌아가는중...')
        }, 1000);

        return()=> {
            clearInterval(timer)
            console.log('타이머 종료')
        }
    });

    return(
        <>
        <p>타이머 시작!</p>
        </>
    )
}


function UseEffect() {

  //useEffect
  // 1. 화면이 렌더링 될 때마다 매번 실행 됨
  // useEffect(()=>{
  //   console.log('hi')
  // });

  // 2. 첫 실행 후 리스트 추가될 때만 실행
//   useEffect(()=>{
//     console.log('리스트 추가됨')
//   },[todos]);

  // 3. 첫 렌더링 실행 했을 때만 
  useEffect(()=>{
    console.log('처음만 실행')
  },[]);
  

   const [showTimer, setShowTimer] = useState(false);
 return (

 

<div>
    {/* showTimer가 true일때만 <Timer/>를 보여줌*/}
    {showTimer && <Timer />}
    <button onClick={()=> setShowTimer(!showTimer)}>토글 버튼</button>
</div>
  )
}

export default UseEffect
