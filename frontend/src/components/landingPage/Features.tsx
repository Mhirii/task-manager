import FeatureCard from "./FeatureCard.tsx";
import {Parallax} from "react-scroll-parallax";


export default function Features() {
  return (
    <div className={`flex flex-col gap-4 px-2`}
         style={{backgroundImage: "linear-gradient(to bottom, #b4befe, #cbd5e1)"}}
    >
      <h1
        className={`text-slate-800 text-left font-medium text-2xl md:text-3xl`}
      >
        <Parallax opacity={[0, 1]} translateY={[-100, 0]} translateX={[10, 0]} startScroll={0} endScroll={500} scaleY={[2, 1]} scaleX={[1.1, 1]}>
          Features
        </Parallax>
      </h1>
      <Parallax opacity={[0, 3]}>
        <FeatureCard startScroll={0} endScroll={400}
                     title={"Relax your thoughts"}
                     desc={"In our continuous pursuit of excellence, we have meticulously refined the task creation process, orchestrating it to deliver an unparalleled user experience. Our mission is to grant you the swiftest conduit for transforming your ideas into actionable tasks, liberating your mind from the burden of retention."}
                     image={"grid-view"}
        />
      </Parallax>
      
      <Parallax opacity={[0, 3]}>
        <FeatureCard startScroll={400} endScroll={800}
                     title={"Elevate your organizational prowess"}
                     desc={"Harness the power of structured categorization by seamlessly grouping your tasks into meticulously curated projects. This strategic approach empowers you with the tools to effortlessly navigate, strategize, and execute, culminating in a symphony of efficiency and achievement."}
                     image={"sidebar"}
        />
      </Parallax>
      <Parallax opacity={[0, 3]}>
        <FeatureCard startScroll={800} endScroll={1200}
                     title={"Focus on what's important"}
                     desc={"With Endeavour at your side, task management becomes effortless. This ingenious system seamlessly categorizes your tasks into 'Today' and 'Upcoming', ensuring that your focus remains steadfast on what truly matters – an invaluable tool in prioritizing your most significant endeavors."}
                     image={"list-view"}
        />
      </Parallax>
      <Parallax opacity={[0, 3]}>
        <FeatureCard startScroll={1200} endScroll={1600}
                     title={"Paint the path ahead"}
                     desc={"Envision your progress with ease through Endeavour's innovative charting feature. As you tread towards your goals, these visual guides artfully illustrate the strides you've made and illuminate the forthcoming steps, transforming your journey into a clear and captivating trajectory of achievement."}
                     image={"charts"}
        />
      </Parallax>
    </div>
  )
}