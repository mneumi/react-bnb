import { Comment, Tooltip, List } from "antd";
import React from "react";

interface PropsType {
	data: {
    id: number;
		author: string;
		avatar: string;
		content: string;
		createDate: string;
	}[];
}

export const ProductComments: React.FC<PropsType> = ({ data }) => {
	return (
		<List
			dataSource={data}
			itemLayout="horizontal"
			renderItem={(item) => (
				<li key={item.id}>
					<Comment
						author={item.author}
						avatar={item.avatar}
						content={<p>{item.content}</p>}
						datetime={item.createDate}
					/>
				</li>
			)}
		></List>
	);
};
