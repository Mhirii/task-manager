import ChangingText from "./ChangingText.tsx";
import Button from "../common/Button.tsx";
import {Parallax} from "react-scroll-parallax";

export default function Greeter() {
		return (
				<div
						className="greeter m-0
						flex flex-col items-start h-screen justify-center bg-indigo-600 px-8
						overflow-hidden "
						style={{backgroundImage: "linear-gradient(to bottom, #f1f5f9, #b4befe)"} }
				>
						<Parallax speed={5}>
								<h1 className={`text-slate-800 text-left font-medium text-2xl md:text-3xl`}>
										<ChangingText
												texts={['conquer your goals', 'strive for your goals', 'explore your potential']}
												delay={6000}
												className={`fade-in-out-6`}
										/>
										<ChangingText
												texts={['with unwavering determination', 'with relentless ambition']}
												delay={18000}
												className={`fade-in-out-18`}
										/>
								</h1>
						</Parallax>
						
						<Parallax speed={0} translateX={[-5, 5]} opacity={[2, 0]}>
								<p className={`text-slate-700 text-left font-medium text-base md:text-lg`}>
										Embark on a journey of purposeful productivity and achievement with Endeavour.
								</p>
						</Parallax>
						
						<Parallax speed={-2} scaleX={[1, 1.2, 'easeInOut']} opacity={[2, 0]}>
								<div className={`py-4`}>
										<Button label={"Join us"} onClick={() => {location.href = '/register';}}/>
								</div>
						</Parallax>
				</div>
		);
}
