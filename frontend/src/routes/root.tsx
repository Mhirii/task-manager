import {ArrowRightOutlined} from "@ant-design/icons"
import Greeter from "../components/landingPage/Greeter.tsx";
import {Parallax, ParallaxProvider} from "react-scroll-parallax";
import Features from "../components/landingPage/Features.tsx";
import Button from "../components/common/Button.tsx";

export default function Root() {
  return (
    <>
      <ParallaxProvider>
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
          <a href="" className={`flex items-center gap-1`}>
            <h6 className={`text-slate-700`}>Login</h6>
            <ArrowRightOutlined className={`text-slate-700`}/>
          </a>
        </header>
        {/*<div className={`spacer h-16`}></div>*/}
        <div className={`m-2 flex flex-col gap-4 overflow-hidden`}>
          <Greeter/>
          <Features/>
        </div>
        <Parallax opacity={[0, 2]}>
          <div className={`flex flex-col w-full h-screen items-center justify-center bg-slate-200`}>
            <Parallax scaleX={[1.05, 1, 'easeInOut']} translateY={[-50, 0]} opacity={[0, 1]} startScroll={1500} endScroll={2200}>
            <h1 className={`font-medium text-2xl capitalize mb-10`}>Start using Endeavour For Free</h1>
            </Parallax>
            <Parallax scaleX={[0.9, 1, 'easeInOut']} opacity={[0, 1]} translateY={[70, -20]} startScroll={1500} endScroll={2200}>
              <Button label={'Get Started'} className={`w-fit`}/>
            </Parallax>
          </div>
        </Parallax>
      </ParallaxProvider>
    </>
  );
}