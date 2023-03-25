import React from "react";
import { Dropdown } from "@nextui-org/react";

export default function TagSelect({ articleID, tags, selectedValueProp }) {
	let currTags = [];
	console.log("Selected Value", selectedValueProp);
	if (tags) {
		for (let i = 0; i < tags.length; i++) {
			if (tags[i]["0"]["tid"] == articleID) {
				let obj = tags[i]["0"];
				for (const key in obj) {
					const value = obj[key];
					console.log(`${key}: ${value}`);
					if (value == 1) {
						currTags.push(key);
					}
				}
			}
		}
	} else {
		console.log("no tags");
	}
	// if (currTags.length < 1) {
	// 	currTags = ["Select Tags"];
	// } else if (currTags.includes("Select Tags")) {
	// 	currTags.pop("Select Tags");
	// }

	const [selected, setSelected] = React.useState(new Set(currTags));

	const selectedValue = React.useMemo(
		() => Array.from(selected).join(", ").replaceAll("_", " "),
		[selected]
	);

	const [getTags, setTags] = React.useState([]);

	React.useEffect(() => {
		const getTagsRoute = async () => {
			const endpoint = "api/getTags";
			const response = await fetch(endpoint);
			console.log(
				"🚀 ~ file: portalSettings.js:49 ~ addTag ~ response:",
				response
			);
			if (response.ok) {
				let tags = await response.json();
				console.log(
					"🚀 ~ file: portalSettings.js:61 ~ getTagsRoute ~ tags:",
					tags
				);
				setTags(tags);
			} else {
				console.log("error getting the tags");
			}
		};
		getTagsRoute();
	}, []);
	if (selectedValueProp == "unpublished") {
		return (
			<Dropdown name={"Article" + articleID}>
				<Dropdown.Button
					flat
					color="primary"
					css={{ tt: "capitalize" }}
				>
					{selectedValue}
				</Dropdown.Button>
				<Dropdown.Menu
					aria-label="Multiple selection actions"
					color="primary"
					disallowEmptySelection
					selectionMode="multiple"
					selectedKeys={selected}
					onSelectionChange={setSelected}
				>
					{getTags.map((tag) => (
						<Dropdown.Item key={tag} value={tag}>
							{tag}
						</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown>
		);
	} else {
		return (
			<Dropdown name={"Article" + articleID}>
				<Dropdown.Button
					flat
					color="primary"
					css={{ tt: "capitalize" }}
				>
					{selectedValue}
				</Dropdown.Button>
				{/* <Dropdown.Menu
					aria-label="Multiple selection actions"
					color="primary"
					disallowEmptySelection
					selectionMode="multiple"
					selectedKeys={selected}
					onSelectionChange={setSelected}
				>
					{getTags.map((tag) => (
						<Dropdown.Item key={tag} value={tag}>
							{tag}
						</Dropdown.Item>
					))}
				</Dropdown.Menu> */}
			</Dropdown>
		);
	}
}
