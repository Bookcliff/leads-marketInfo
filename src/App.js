import { useEffect, useState } from "react";
import { Layout, Row, Col, Table, PageHeader } from "antd";
import "./App.css";

const { Header, Footer, Content } = Layout;

function App() {
  const [coinList, setCoinList] = useState([]);
  const [tokens, setTokens] = useState();

  const createColumns = () => [
    {
      title: "Company",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Market Cap",
      key: "market_cap",
      render: (combinedData) => {
        return combinedData.market_cap?.toLocaleString();
      },
    },

    {
      title: "Fully Diluted Valuation",
      key: "fully_diluted_valuation",
      render: (combinedData) => {
        return combinedData.fully_diluted_valuation?.toLocaleString();
      },
    },
    {
      title: "Current Price",
      key: "current_price",
      render: (combinedData) => {
        return combinedData.current_price?.toLocaleString();
      },
    },
    {
      title: "24h Price Change",
      key: "price_change_24h",
      render: (combinedData) => {
        return combinedData.price_change_24h?.toLocaleString();
      },
    },
    {
      title: "All Time High Percentage",
      dataIndex: "ath_change_percentage",
      key: "ath_change_percentage",
    },
    {
      title: "Total Volume",
      key: "total_volume",
      render: (combinedData) => {
        return combinedData.total_volume?.toLocaleString();
      },
    },
    {
      title: "Website",
      key: "website",
      render: (combinedData) => {
        return (
          <a href={combinedData.Website} target="_blank" rel="noreferrer">
            {combinedData.Website}
          </a>
        );
      },
    },
  ];

  useEffect(() => {
    const getTokens = async () => {
      const tokenData = await fetch("api/getSheet");
      const tokenDataJson = await tokenData.json();
      const fullData = tokenDataJson.data;
      setTokens(fullData);
    };
    getTokens();
  }, []);

  useEffect(() => {
    const tokenNames = tokens?.map((token) => token.coingeko_id);
    const tokenStr = encodeURIComponent(tokenNames);

    const getCoins = async () => {
      if (!tokens) {
        setCoinList([]);
        return;
      }
      const coinData = await fetch(`api/getCoins/?id=${tokenStr}`);
      const coinJson = await coinData.json();
      const fullData = coinJson.data;

      setCoinList(fullData);
    };

    getCoins();
  }, [tokens]);

  const combinedData = coinList?.map((element) => ({
    ...element,
    ...tokens.find((token) => token.coingeko_id === element.id),
  }));

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
              dataSource={combinedData}
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
