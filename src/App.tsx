import React, { useRef } from "react";
import "./App.css";
import { ScrollableList, ScrollableListHandle } from "./ScrollableList";

// Usage in parent component
const App: React.FC = () => {
	const scrollableListRef = useRef<ScrollableListHandle>(null);

	const handleButtonClick = () => {
		if (scrollableListRef.current) {
			scrollableListRef.current.start();
		}
	};

	return (
		<div className='container'>
			<ScrollableList ref={scrollableListRef} />
			<button className='button' onClick={handleButtonClick}>
				Scroll to Next Item
			</button>
		</div>
	);
};

export default App;
