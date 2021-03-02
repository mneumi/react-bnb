import React, { useEffect, useState } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import axios from "axios";
import {
	Spin,
	Row,
	Col,
	DatePicker,
	Divider,
	Typography,
	Anchor,
	Menu,
} from "antd";
import styles from "./DetailPage.module.css";
import { Header, Footer } from "../../components";
import { ProductIntro } from "../../components/productIntro/ProductIntro";
import { ProductComments } from "../../components/productComments/ProductComments";
import { commentMockData } from "./mockup";

const { RangePicker } = DatePicker;

interface MatchParams {
	touristRouteId: string;
}

export const DetailPage: React.FC<RouteComponentProps<MatchParams>> = (
	props
) => {
	const { touristRouteId } = useParams<MatchParams>();

	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [product, setProduct] = useState<any>(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const { data } = await axios.get(
					"http://localhost:9999/touristRoutes"
				);
				setProduct(data);
				setLoading(false);
			} catch (err) {
				setLoading(false);
				setError(err.message);
			}
		};

		fetchData();
	}, []);

	if (loading) {
		return (
			<div>
				<Spin
					size="large"
					style={{
						marginTop: 200,
						marginBottom: 200,
						marginLeft: "auto",
						marginRight: "auto",
						width: "100%",
					}}
				/>
			</div>
		);
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<>
			<Header />
			<div className={styles["page-content"]}>
				<div className={styles["product-intro-container"]}>
					<Row>
						<Col span={13}>
							<ProductIntro
								title={"title"}
								shortDescription={"shortDesction"}
								price={123}
								coupons={"优惠券"}
								points={"4"}
								discount={"25"}
								rating={3}
								pictures={[
									"https://s3.ax1x.com/2020/12/15/rMQOIJ.jpg",
									"https://s3.ax1x.com/2020/12/15/rMQOIJ.jpg",
									"https://s3.ax1x.com/2020/12/15/rMQOIJ.jpg",
								]}
							/>
						</Col>
						<Col span={11}>
							<RangePicker
								open
								style={{
									marginTop: 20,
								}}
							/>
						</Col>
					</Row>
				</div>
				<Anchor className={styles["product-detail-anchor"]}>
					<Menu mode="horizontal">
						<Menu.Item key="1">
							<Anchor.Link href="#feature" title="产品特色"></Anchor.Link>
						</Menu.Item>
            <Menu.Item key="2">
							<Anchor.Link href="#fees" title="费用"></Anchor.Link>
						</Menu.Item>
            <Menu.Item key="3">
							<Anchor.Link href="#notes" title="预订须知"></Anchor.Link>
						</Menu.Item>
            <Menu.Item key="4">
							<Anchor.Link href="#comments" title="用户评价"></Anchor.Link>
						</Menu.Item>
					</Menu>
				</Anchor>
				<div className={styles["product-detail-container"]} id="feature">
					<Divider orientation={"center"}>
						<Typography.Title level={3}>产品特色</Typography.Title>
						<div
							style={{ margin: 50 }}
							dangerouslySetInnerHTML={{ __html: product["productFeature"] }}
						></div>
					</Divider>
				</div>
				<div className={styles["product-detail-container"]} id="fees">
					<Divider orientation={"center"}>
						<Typography.Title level={3}>产品费用</Typography.Title>
						<div
							style={{ margin: 50 }}
							dangerouslySetInnerHTML={{ __html: product["productFees"] }}
						></div>
					</Divider>
				</div>
				<div className={styles["product-detail-container"]} id="notes">
					<Divider orientation={"center"}>
						<Typography.Title level={3}>产品须知</Typography.Title>
						<div
							style={{ margin: 50 }}
							dangerouslySetInnerHTML={{ __html: product["productNotes"] }}
						></div>
					</Divider>
				</div>
				<div className={styles["product-detail-container"]} id="comments">
					<Divider
						orientation={"left"}
						style={{ width: "100%", display: "block" }}
					>
						<Typography.Title level={3}>用户评论</Typography.Title>
						<div style={{ margin: 40 }}>
							<ProductComments data={commentMockData} />
						</div>
					</Divider>
				</div>
			</div>
			<Footer />
		</>
	);
};
