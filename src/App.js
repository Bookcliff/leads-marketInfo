import { useEffect, useState } from "react";
import { Layout, Row, Col, Table, PageHeader } from "antd";
import "./App.css";

const { Header, Footer, Content } = Layout;

function App() {
  const [coinList, setCoinList] = useState([]);
  const [tokens, setTokens] = useState([]);

  const createColumns = () => [
    {
      title: "Company",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Market Cap",
      dataIndex: "market_cap",
      key: "market_cap",
    },

    {
      title: "Fully Diluted Valuation",
      dataIndex: "fully_diluted_valuation",
      key: "fully_diluted_valuation",
    },
    {
      title: "Current Price",
      dataIndex: "current_price",
      key: "current_price",
    },
    {
      title: "24h Price Change",
      dataIndex: "price_change_24h",
      key: "price_change_24h",
    },
    {
      title: "All Time High Percentage",
      dataIndex: "ath_change_percentage",
      key: "ath_change_percentage",
    },
    {
      title: "Total Volume",
      dataIndex: "total_volume",
      key: "total_volume",
    },
  ];

  useEffect(() => {
    const getCoins = async () => {
      let page = 1;
      let data = [];

      while (page <= 15) {
        const coinData = await fetch(`api/getCoins/?page=${page}`);
        const coinJson = await coinData.json();
        const fullData = coinJson.data;
        fullData.forEach((element) => data.push(element));
        page++;
      }

      setCoinList(data);
    };

    const getTokens = async () => {
      const tokenData = await fetch("api/getSheet");
      const tokenDataJson = await tokenData.json();
      const fullData = tokenDataJson.data;
      setTokens(fullData);
    };
    getTokens();
    getCoins();
  }, []);

  const tokenNames = tokens?.map((token) => token.id);

  const tokenData = coinList?.filter((element) =>
    tokenNames.includes(element.id)
  );

  const nonTokenData = tokenNames?.filter(
    (element) => !tokenData.includes((i) => i === element.id)
  );

  console.log({ nonTokenData, tokenData });

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <Row justify="space-between">
          <Col></Col>
          <Col> </Col>
        </Row>
      </Header>
      <Content style={{ padding: "0 24px", marginTop: 16 }}>
        <PageHeader
          style={{ backgroundColor: "#fff" }}
          title="Notable Companies Information"
        >
          Notable Companies Information
        </PageHeader>
        <Row>
          <Col span={24}>
            <Table
              style={{ marginTop: 24 }}
              pagination={false}
              rowKey={(record) => record.logIndex}
              columns={createColumns()}
              dataSource={tokenData}
              scroll={{ x: 400 }}
            />
          </Col>
        </Row>
      </Content>
      <Footer></Footer>
    </Layout>
  );
}

export default App;
