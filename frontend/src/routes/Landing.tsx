import React, {Suspense} from "react";


const ArrowRightOutlined = React.lazy(()=> import("@ant-design/icons/ArrowRightOutlined"))
const Button = React.lazy(()=> import("../components/common/Button.tsx"))
const Parallax = React.lazy(()=> import('react-scroll-parallax').then(module => ({ default: module.Parallax })))
const ParallaxProvider = React.lazy(()=> import('react-scroll-parallax').then(module => ({ default: module.ParallaxProvider })))
const Features = React.lazy(() => import('../components/landingPage/Features.tsx'))
const Greeter = React.lazy(()=> import('../components/landingPage/Greeter.tsx'))

export default function Landing() {
  return (
    <ParallaxProvider>
      <div className={`m-0 p-0 bg-slate-300`}>
        <header
          className={`fixed z-50 right-0 left-0 top-0 flex justify-between
										items-center h-16 px-4
										border-b-2 border-slate-200 bg-slate-100 backdrop-blur-sm bg-opacity-80`}
        >
          <h3 className={"text-indigo-700 font-medium text-lg"}>Endeavour</h3>
          <nav className={`flex gap-4`}>
            <a href="" className={"text-slate-600 hover:text-slate-800 transition-colors"}>Features</a>
            <a href="" className={"text-slate-600 hover:text-slate-800 transition-colors"}>About</a>
          </nav>
          <a href="today" className={`flex items-center gap-1`}>
            <h6 className={`text-slate-700`}>Login</h6>
            <ArrowRightOutlined className={`text-slate-700`}/>
          </a>
        </header>
        {/*<div className={`spacer h-16`}></div>*/}
        <div className={`p-0 flex flex-col overflow-hidden m-0`}>
          <Greeter/>
          <Suspense fallback={<div>Loading...</div>}>
            <Features/>
          </Suspense>
        </div>
        <Parallax opacity={[0, 2]}>
          <div className={`flex flex-col w-full h-screen items-center justify-center bg-slate-200`}
               style={{backgroundImage: "linear-gradient(to bottom, #cbd5e1, #818cf8)"}}>
            <Parallax scaleX={[1.05, 1, 'easeInOut']} translateY={[-50, 0]} opacity={[0, 1]} startScroll={1500}
                      endScroll={2200}>
              <h1 className={`font-medium text-2xl capitalize mb-10`}>Start using Endeavour For Free</h1>
            </Parallax>
            <Parallax scaleX={[0.9, 1, 'easeInOut']} opacity={[0, 1]} translateY={[70, -20]} startScroll={1500}
                      endScroll={2200}>
              <Button label={'Get Started'} className={`w-fit`} onClick={() => {
                location.href = 'register';
              }}/>
            </Parallax>
          </div>
        </Parallax>
      </div>
    </ParallaxProvider>
  );
}