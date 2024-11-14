import { ChangeEvent, useEffect, useState } from "react"

export const Counter = () => {
    const [count,setCount] = useState(0);
    const [inputValue,setInputValue] = useState(0);
    const [start,setStart] = useState(false)
    const [pause,setPause] = useState(false)

    function handleChange(e : ChangeEvent<HTMLInputElement>) {
        setInputValue(Number(e.target.value))
    }
    function handleStart() : void {
        setCount(Number(inputValue))
        setStart(true)
        setPause(false)
    }

    function handlePause() : void {
       setPause(true)
       setStart(false)
    }
    function handleClear() : void {
        setPause(true)
       setStart(false)
       setCount(0);
       setInputValue(0)
    }
    let timer : number | null = null;
    useEffect(() => {
        if(start && count > 0){
            timer = setInterval(() => {
                setCount(prevCount => {
                    if(prevCount > 0){
                        return prevCount - 1 
                    }else {
                        clearInterval(timer!); // Clear the timer once count reaches 0
                        setStart(false); // Optionally stop the counter
                        return 0;
                    }
                })
            },1000) 
        }
        return () => {
            if(timer) clearInterval(timer);
        };
    },[start,count])
  return (
    <div className="mx-auto flex items-center justify-center flex-col h-full">
        <div className="bg-white/30 text-center p-10 shadow-xl rounded-2xl">
            <div className="mb-5">
                <h2 className="text-3xl tracking-wide uppercase leading-snug font-bold text-black/70">Counter</h2>
            </div>
            <div className="mb-10">
                <h3 className="text-2xl font-semibold">{count}</h3>
            </div>
            <div className="flex flex-col items-start">
                <label htmlFor="count" className="text-md font-semibold">Counter Number</label>
                <input type="text" 
                placeholder="example: 10" id="count" 
                className="p-2 bg-black/30 text-black placeholder:text-black"
                value={inputValue}
                onChange={handleChange}
                />
            </div>
            <div className="mt-10 flex gap-3">
                <button className="px-4 py-2 rounded-lg text-white/70 font-bold bg-green-600" onClick={handleStart}>Start</button>
                <button className="px-4 py-2 rounded-lg text-white/70 font-bold bg-red-500" onClick={handlePause}>Pause</button>
                <button className="px-4 py-2 rounded-lg text-white/70 font-bold bg-black/70" onClick={handleClear}>Clear</button>
            </div>
        </div>
    </div>
  )
}