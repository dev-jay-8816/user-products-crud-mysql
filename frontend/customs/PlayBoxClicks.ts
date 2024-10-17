import { useState, useEffect } from "react"
const arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const App = () => {

  const [savedClick, setSavedClick] = useState<number[]>([])
  const [currBox, setCurrBox] = useState<number | null>(null)
  const [isPlay, setIsPlay] = useState<boolean>(false);


useEffect(() => {
  // console.log('isPlay: ', isPlay)
  // console.log('currBox: ', currBox)
  if (isPlay && savedClick?.length > 0) {
    // setTimeout(() => {
      let currIndex: number;
      let isLastIndex: boolean = false;

      if (currBox && savedClick?.length > 0) {
        currIndex = savedClick.findIndex(el => el === currBox) + 1
        isLastIndex = savedClick.length === currIndex
      }
      else {
        currIndex = savedClick?.[0]
      }
      console.log("currIndex: ", currIndex);
      console.log("isLastIndex: ", isLastIndex)
      if(!isLastIndex) {setCurrBox(savedClick[currIndex]);}
      else {setIsPlay(false)}

    // },1000)
  }
},[isPlay, currBox])

  const handleSavedClick = (el: number) => {
    if (savedClick.indexOf(el) === -1) {
      setSavedClick([...savedClick, el]);
      setCurrBox(el);
    }
  }

  const handlePlay = () => {
    // savedClick.forEach(el => setInterval(() => setCurrBox(el), 1000))
    setCurrBox(null);
    setIsPlay(true);
  }

  const handleReset = () => {
    setCurrBox(null)
    setSavedClick([])
    setIsPlay(false)
  }


  // console.log("savedClicks: ", savedClick)
  // console.log('current box: ', currBox)

  return (
    <div>
      <div className="container text-center">
        <h1 className="my-4">Playing Box Clicks</h1>



        <div className="board d-flex flex-wrap">
          {
            arr.map((el) => {
              return <div
                key={el}
                style={{
                  backgroundColor: el === currBox ? 'red' : 'white'
                }}
                className="cell"
                onClick={() => handleSavedClick(el)}
              >
              </div>
            })
          }
        </div>

        <div className="gap-2">
          <button className="btn btn-primary mt-3" onClick={handlePlay}>Play</button>
          <button id="resetButton" className="btn btn-primary mt-3" onClick={handleReset}>Reset Game</button>
        </div>
      </div>
    </div>
  )
}

export default App
