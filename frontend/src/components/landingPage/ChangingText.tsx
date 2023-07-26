import { useState, useEffect } from 'react';
import '../../styles/animation.css';

interface props{
		texts : string[],
		delay: number
		className:string
}

export default function ChangingText({texts, delay, className}:props){
		const [currentTextIndex, setCurrentTextIndex] = useState(0);
		// const texts: string[] = ['conquer your goals', 'strive for your goals', 'explore your potential'];
		
		useEffect(() => {
				const intervalId = setInterval(() => {
						setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
				}, delay);
				
				return () => clearInterval(intervalId);
		});

		return <h1 className={`${className} font-semibold capitalize`}>{texts[currentTextIndex]} </h1>;
}

