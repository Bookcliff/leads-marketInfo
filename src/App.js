import { useEffect, useState } from "react";
import { Layout, Row, Col, Table, PageHeader, Button, Input } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import "./App.less";
const { Header, Footer, Content } = Layout;
const { Search } = Input;

function App() {
  const [coinList, setCoinList] = useState([]);
  const [tokens, setTokens] = useState();
  const [query, setQuery] = useState();

  const createColumns = () => [
    {
      title: "",
      key: "image",
      render: (combinedData) => {
        return (
          <img style={{ width: 24 }} src={combinedData.image} alt="logo"></img>
        );
      },
    },
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
        return combinedData.current_price?.toLocaleString("en", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        });
      },
    },
    {
      title: "24h Price Change",
      key: "price_change_24h",
      render: (combinedData) => {
        return combinedData.price_change_24h?.toLocaleString("en", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        });
      },
    },
    {
      title: "All Time High Percentage",
      key: "ath_change_percentage",
      render: (combinedData) => {
        return combinedData.ath_change_percentage?.toLocaleString("en", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        });
      },
    },
    {
      title: "24 Hour Trading Volume",
      key: "total_volume",
      render: (combinedData) => {
        return combinedData.total_volume?.toLocaleString();
      },
    },
    {
      title: "Comments",
      dataIndex: "description",
      key: "description",
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

  const filterData = () => {
    if (query === undefined) {
      return combinedData;
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const updatedData = combinedData?.filter(({ name }) =>
        name.toLowerCase().includes(lowerCaseQuery)
      );
      return updatedData;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ backgroundColor: "#f6ffed" }}>
        <Row justify="space-between">
          <Col>
            <img
              style={{
                float: "left",
                height: 31,
                // width: 200,
                margin: "16px 0px 16px 0",
              }}
              src="https://tse3.mm.bing.net/th?id=OIP.XYaeDXspGLV6vl4xFh7CDgHaHa"
              alt="abg logo"
            />
            <b> Always Be Growing</b>
          </Col>
          <Col>
            {" "}
            <Button
              onClick={() => {
                window.open("https://github.com/Bookcliff/leads-marketInfo");
              }}
              type="text"
            >
              <GithubOutlined />
            </Button>
          </Col>
        </Row>
      </Header>
      <Content style={{ padding: "0 24px", marginTop: 16 }}>
        <PageHeader
          style={{ backgroundColor: "#fff" }}
          title="Notable Companies Information"
        >
          Market information for pre-selected companies or DAOs that have
          tokens. Update{" "}
          <a
            href="https://docs.google.com/spreadsheets/d/1hlG8Co8jxmy1B3JmIl0u1E7KiAnpiOnyVIQiaHHhCoU/edit#gid=0"
            target="_blank"
            rel="noreferrer"
          >
            this spreadsheet
          </a>{" "}
          to update the list.
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={setQuery}
          />
        </PageHeader>
        <Row>
          <Col span={24}>
            <Table
              style={{ marginTop: 24 }}
              pagination={false}
              rowKey={(record) => record.logIndex}
              columns={createColumns()}
              dataSource={filterData()}
              scroll={{ x: 400 }}
            />
          </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Created by <a href="https://abg.garden">Always Be Growing</a>
      </Footer>{" "}
    </Layout>
  );
}

export default App;
