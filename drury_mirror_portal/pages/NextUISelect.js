import React from "react";
import { Dropdown } from "@nextui-org/react";

export default function TagSelect({ articleID, tags }) {
	let currTags = [];
	for (let i = 0; i < tags.length; i++) {
		if (tags[i]["0"]["tid"] == articleID) {
			if (tags[i]["0"]["local"] == 1) {
				currTags.push("local");
			}
			if (tags[i]["0"]["national"] == 1) {
				currTags.push("national");
			}
			if (tags[i]["0"]["international"] == 1) {
				currTags.push("international");
			}
		}
	}

	if (currTags.length < 1) {
		currTags = ["local"];
	}

	const [selected, setSelected] = React.useState(new Set(currTags));

	const selectedValue = React.useMemo(
		() => Array.from(selected).join(", ").replaceAll("_", " "),
		[selected]
	);
	return (
		<Dropdown name={"Article" + articleID}>
			<Dropdown.Button flat color="primary" css={{ tt: "capitalize" }}>
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
				<Dropdown.Item key="local">Local</Dropdown.Item>
				<Dropdown.Item key="national">National</Dropdown.Item>
				<Dropdown.Item key="international">International</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
}
