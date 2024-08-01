import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";

// Define the type for our ScrollableList component's ref
export type ScrollableListHandle = {
	start: () => void;
};
export const ScrollableList = React.forwardRef<ScrollableListHandle, {}>((props, ref) => {
	const items = Array.from({ length: 1000 }, (_, index) => `Item ${index + 1}`);
	const currentIndexRef = useRef<number>(-1);
	const listRef = useRef<HTMLUListElement | null>(null);
	const [magicBox, setMagicBox] = useState<number>(-1);
	const findCurrentItem = useCallback(() => {
		console.log("currentIndexRef.current: ", currentIndexRef.current);
		if (currentIndexRef.current + 1 === 5) {
			// console.log("you can do some data fetching here ??....");
			setMagicBox(currentIndexRef.current + 1);
		}
		currentIndexRef.current = currentIndexRef.current + 1;
		return listRef.current?.querySelector(`#item-${currentIndexRef.current}`);
	}, []);

	const scrollToNextItem = () => {
		const item = findCurrentItem();

		if (item) {
			if (item?.previousElementSibling) {
				item.previousElementSibling.className = "item";
			}
			item.className += " active";
			item?.scrollIntoView({ behavior: "smooth" });
		}
	};

	useEffect(() => {
		const item = findCurrentItem();
		if (item) {
			item.className += " active";
		}
	}, []);

	useImperativeHandle(ref, () => ({
		start: scrollToNextItem,
	}));

	return (
		<ul ref={listRef}>
			{items.map((item, index) => (
				<li
					key={item}
					id={`item-${index}`}
					className='item'
					style={{ backgroundColor: magicBox === index ? "red" : "transparent" }}>
					{item}
				</li>
			))}
		</ul>
	);
});
