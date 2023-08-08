import {Parallax} from "react-scroll-parallax";
import {LazyLoadImage} from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/opacity.css'
import 'react-lazy-load-image-component/src/effects/blur.css'

interface props {
  startScroll: number,
  endScroll: number,
  title: string,
  desc: string,
  image: string,
}

export default function FeatureCard({startScroll, endScroll, title, desc, image}: props) {
  // console.log(`/public/img/${image}`)
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
                sm:h-80 sm:w-1/2 md:w-1/2 lg:w-2/3 sm:mt-0 overflow-hidden rounded-lg
                bg-slate-100 bg-opacity-10 shadow border-2 border-slate-300 border-opacity-50`}
      >
        <div className={`h-fit flex items-center mb-4`}>
          <h1 className={`text-indigo-500 text-2xl font-medium`}>{title}</h1>
        </div>
        <div className={`h-full flex items-start`}>
          <p className={`text-slate-700 font-light`}>{desc}</p>
        </div>
      </Parallax>
      <Parallax
        translateX={[80, 0]} startScroll={startScroll} endScroll={endScroll}
        className={`image
								        w-full h-fit flex items-center justify-center
								        sm:h-80 sm:w-1/2 md:1/2 lg:w-1/3 overflow-hidden rounded-lg
                bg-slate-100 bg-opacity-10 shadow border-2 border-slate-300 border-opacity-50`}>
        
        {/*<h6>{image}</h6>*/}
        {/*{placeholder && <h2>placeholder</h2> }*/}
        <LazyLoadImage
          // beforeLoad={()=>setPlaceholder(true)} afterLoad={()=>setPlaceholder(false)}
          height={500}
          width={800}
          // placeholder={<h2>loading...</h2>}
          effect={'opacity'}
          loading={"lazy"}
          placeholderSrc={`/public/img/lazy/${image}-small.png`}
          src={`/public/img/${image}.png`} alt=""
          className={`w-full h-auto sm:h-auto sm:w-full sm:absolute sm:top-0 `}/>
      </Parallax>
    </div>
  
  )
}