import FeatureCard from "./FeatureCard.tsx";
import {Parallax} from "react-scroll-parallax";


export default function Features() {
		return (
				<div className={`flex flex-col gap-4 px-2`}>
						<h1
								className={`text-slate-800 text-center font-medium text-2xl md:text-3xl`}
						>
							<Parallax opacity={[0, 3]} translateY={[-500,0]} startScroll={0} endScroll={800}>
								Features
							</Parallax>
						</h1>
						<Parallax opacity={[0, 3]}>
								<FeatureCard startScroll={0} endScroll={400}
								             title={"Clear your mind"}
								             desc={"we have optimized the task creation process to offer the finest user experience possible and provide you the quickest way to get tasks out of your head"}
								             image={"today.png"}
								/>
						</Parallax>
						
						<Parallax opacity={[0, 3]}>
								<FeatureCard startScroll={400} endScroll={800}
								             title={"Keep it organized"}
								             desc={"Group your tasks into projects to easily access plan, track and manage them"}
								             image={"projects.png"}
								/>
						</Parallax>
					<Parallax opacity={[0, 3]}>
						<FeatureCard startScroll={800} endScroll={1200}
						             title={"Focus on what's important"}
						             desc={"Endeavour will automatically sort your tasks into today and upcoming to help you prioritize your most important tasks"}
						             image={"today.png"}
						/>
					</Parallax>
						<Parallax opacity={[0, 3]}>
								<FeatureCard startScroll={1200} endScroll={1600}
								             title={"Visualize the journey"}
								             desc={"Endeavour will draw charts for you to visualise the steps you have taken and the ones to take to reach your goals"}
								             image={"charts.png"}
								/>
						</Parallax>
				</div>
		)
}