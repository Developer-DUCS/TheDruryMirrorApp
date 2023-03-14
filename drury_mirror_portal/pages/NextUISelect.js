import React from "react";
import { Dropdown } from "@nextui-org/react";

export default function TagSelect({ articleID }) {
	const [selected, setSelected] = React.useState(new Set(["local"]));

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
