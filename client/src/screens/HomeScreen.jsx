import React, { useEffect } from "react";
import {
  Button,
  Card,
  Divider,
  Flex,
  Image,
  Input,
  List,
  Popover,
  Space,
  Typography,
} from "antd";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import data from "../data/data";

const HomeScreen = () => {
  useEffect(() => {}, []);

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          backgroundColor: "#ffc458",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            height: "60%",
            width: "60%",
            backgroundColor: "white",
            borderRadius: "15px",
            padding: "15px",
          }}
        >
          <Flex
            gap="small"
            justify="space-between"
            align="center"
            style={{
              backgroundColor: "white",
            }}
          >
            <Button
              type="secondary"
              style={{ marginBottom: 16, fontSize: "15px" }}
            >
              {<MenuUnfoldOutlined />}
            </Button>
            <Typography.Title style={{ fontSize: "35px" }}>
              MOVIE
            </Typography.Title>
            <Input.Search
              style={{ fontSize: "30px", width: "200px" }}
              placeholder="input search text"
            />
          </Flex>
          <Divider />
          <Space direction="vertical">
            <Typography.Text>Most Popular Movies</Typography.Text>
            <List
              grid={{ gutter: 10, column: 5 }}
              dataSource={data}
              renderItem={(item) => (
                <List.Item key={item.ID}>
                  <Popover
                    content={
                      <>
                        <div>
                          <Space direction="horizontal" align="start">
                            <Image
                              alt="example"
                              src={item.image}
                              preview={false}
                              style={{
                                width: "100%",
                                height: "200px",
                                borderRadius: "10px",
                                objectFit: "cover",
                                overflow: "hidden",
                              }}
                            />
                            <Card
                              bordered={false}
                              style={{
                                width: 300,
                              }}
                              title={[
                                <>
                                  <div>{item.name}</div>
                                  <Typography.Text type="secondary">{`${item.time} min ${item.year}`}</Typography.Text>
                                </>,
                              ]}
                              actions={[
                                <>
                                  <div>
                                    <Button danger type="primary">
                                      PLAY MOVIE
                                    </Button>
                                  </div>
                                </>,
                              ]}
                            >
                              {item.introduce}
                            </Card>
                          </Space>
                        </div>
                      </>
                    }
                    trigger="click"
                    placement="bottom"
                  >
                    <Card
                      hoverable
                      cover={
                        <Image
                          alt="example"
                          src={item.image}
                          preview={false}
                          style={{
                            width: "100%",
                            height: "200px",
                            borderRadius: "10px",
                            objectFit: "cover",
                            overflow: "hidden",
                          }}
                        />
                      }
                    >
                      <Card.Meta
                        title={
                          <>
                            <div
                              style={{
                                fontWeight: "500",
                                fontSize: "13px",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                              }}
                            >
                              {item.name}
                            </div>
                          </>
                        }
                        description={
                          <>
                            <div className="d-flex">
                              <Space
                                size="small"
                                style={{
                                  textOverflow: "ellipsis",
                                  overflow: "hidden",
                                }}
                              >
                                <div className="d-flex">{`${item.time} min ${item.year}`}</div>
                              </Space>
                            </div>
                          </>
                        }
                      />
                    </Card>
                  </Popover>
                </List.Item>
              )}
            />
          </Space>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
