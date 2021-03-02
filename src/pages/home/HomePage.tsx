import React, { useEffect } from "react";
import styles from "./HomePage.module.css";
import {
	Header,
	Footer,
	SideMenu,
	Carousel,
	ProductCollection,
	BusinessPartners,
} from "../../components";
import { Row, Col, Typography, Spin } from "antd";
import sideImage1 from "../../assets/images/sider_2019_12-09.png";
import sideImage2 from "../../assets/images/sider_2019_02-04.png";
import sideImage3 from "../../assets/images/sider_2019_02-04-2.png";
import { useDispatch } from "react-redux";
import { useSelector } from "../../redux/hooks";
import { giveMeDataActionCreator } from "../../redux/recommendProducts/recommendProductsActions";

function HomePage() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(giveMeDataActionCreator());
	}, [dispatch]);

	const loading = useSelector((state) => state.recommendProducts.loading);
	const error = useSelector((state) => state.recommendProducts.error);
	const productList = useSelector(
		(state) => state.recommendProducts.productList
	);

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<>
			{loading ? (
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
			) : (
				<>
					<Header />
					<div className={styles["page-content"]}>
						<Row style={{ marginTop: 20 }}>
							<Col span={6}>
								<SideMenu />
							</Col>
							<Col span={18}>
								<Carousel />
							</Col>
						</Row>
						<ProductCollection
							title={
								<Typography.Title level={3} type={"warning"}>
									{productList[0].title}
								</Typography.Title>
							}
							sideImage={sideImage1}
							products={productList[0].touristRoutes}
						/>
						<ProductCollection
							title={
								<Typography.Title level={3} type={"danger"}>
									{productList[1].title}
								</Typography.Title>
							}
							sideImage={sideImage2}
							products={productList[1].touristRoutes}
						/>
						<ProductCollection
							title={
								<Typography.Title level={3} type={"success"}>
									{productList[2].title}
								</Typography.Title>
							}
							sideImage={sideImage3}
							products={productList[2].touristRoutes}
						/>
						<BusinessPartners />
					</div>
					<Footer />
				</>
			)}
		</>
	);
}

export default HomePage;
