import Search from "./components/Search"

function App() {

  return (
    <div className="grid place-items-center w-full h-full bg-black/85 pb-[10vh]">
      <div className="mt-[10vh] w-[80vw] bg-blue-200 py-4 px-8 pb-[10vh] flex flex-col items-center rounded-md">
        <Search/>
      </div> 
    </div>
  )
}

export default App
