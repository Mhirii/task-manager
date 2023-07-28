import {Parallax} from "react-scroll-parallax";

interface props {
  startScroll: number,
  endScroll: number,
  title: string,
  desc: string,
  image: string,
}

export default function FeatureCard({startScroll, endScroll, title, desc, image}: props) {
  console.log(`../../img/${image}`)
  return (
    <div
      className={`featureCard flex flex-col w-full h-fit
						sm:flex-row sm:h-80
						items-center gap-4
						`}
    >
      <Parallax translateX={[-20, 0]} startScroll={startScroll} endScroll={endScroll}
                className={`text
                w-full p-2 h-fit flex flex-col  mt-12
                sm:h-80 sm:mt-0 overflow-hidden rounded-lg
                bg-slate-100 bg-opacity-10 shadow border-2 border-slate-300 border-opacity-50`}
      >
        <div className={`h-fit flex items-center mb-4`}>
          <h1 className={`text-indigo-500 text-2xl font-medium`}>{title}</h1>
        </div>
        <div className={`h-full flex items-start`}>
          <p className={`text-slate-700 font-light`}>{desc}</p>
        </div>
      </Parallax>
      <Parallax translateX={[80, 0]} startScroll={startScroll} endScroll={endScroll}
                className={`image
								        w-full h-60 flex items-center justify-center
								        sm:h-80 overflow-hidden rounded-lg
                bg-slate-100 bg-opacity-10 shadow border-2 border-slate-300 border-opacity-50`}>
        
        <h6>{image}</h6>
        {/*<img src={`/src/img/${image}`} alt="" className={`object-center w-full `}/>*/}
      </Parallax>
    </div>
  
  )
}