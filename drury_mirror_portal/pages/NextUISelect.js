import React from "react";
import { Dropdown } from "@nextui-org/react";

export default function TagSelect({ articleID, tags, selectedValueProp }) {
	let currTags = [];
	if (tags) {
		for (let i = 0; i < tags.length; i++) {
			if (tags[i]["0"]["tid"] == articleID) {
				let obj = tags[i]["0"];
				for (const key in obj) {
					const value = obj[key];
					if (value == 1) {
						currTags.push(key);
					}
				}
			}
		}
	} else {
	}

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

			if (response.ok) {
				let tags = await response.json();

				setTags(tags);
			} else {
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
			</Dropdown>
		);
	}
}
