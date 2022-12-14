import {
  Col,
  Row,
  Table,
  Button,
  Dropdown,
  Menu,
  MenuProps,
  Image,
  Input,
  Space,
  Tooltip,
  Modal,
  Form,
  message,
  Tag,
} from "antd";
import { DeleteOutlined, DownOutlined, LeftOutlined } from "@ant-design/icons";
import {
  getProductVariants,
  updateMinQuantityStorage,
} from "../../service/InventoryApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { IInventoryDto, IProductVariantDto, IResultId } from "../../type/InventoryType";
import NumberFormat from "react-number-format";
import Moment from "react-moment";
import { DeletedIcon } from "../../UI";
import Swal from "sweetalert2";
import ToastCustom from "../../features/toast/Toast";

import { ColumnsType } from "antd/lib/table";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useMutation } from "@tanstack/react-query";
import Buttonn from "../../UI/Button";
import AddIcon from "@mui/icons-material/Add";

import InventoryByQuantity from "./InventoryByQuantity";

const InventoryManager = () => {

  const { Search } = Input;
  const { id } = useParams();
  const [inventory, setInventory] = useState({} as IInventoryDto);
  const [productvariant, setProductVariant] = useState<IProductVariantDto[]>(
    []
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [totalproduct, settotalProduct] = useState<number>();
  const [countproduct, setCountProduct] = useState<number>();
  const [status, setStatus] = useState(false);
  const [reload, setReload] = useState(false);
  const [minQuantityModal, setMinQuantityModal] = useState(false);
  const [name, setName] = useState<string>("");
  const [minQuantityForm] = Form.useForm();
  const navigate = useNavigate();

  

  useEffect(() => {
    setReload(true);
    getProductVariants(parseInt(id as string), name).then((response) => {
      setProductVariant(response.productVariants);
      setInventory(response.inventory);
      settotalProduct(response.totalProductVariant);
      setCountProduct(response.countProductVariant);
      setReload(false);
    });
  }, [status, name]);

  const minQuantityMutation = useMutation(updateMinQuantityStorage, {
    onSuccess: () => {
      message.success("Thay ?????i th??nh c??ng", 2);
      setMinQuantityModal(false);
      setStatus(!status);
    },
    onError: () => {
      message.error("C?? l???i x???y ra, vui l??ng th??? l???i", 2);
      setMinQuantityModal(true);
    },
  });

  const minQuantityHandler = () => {
    const { minQuantity, product, storage } = minQuantityForm.getFieldsValue();
    minQuantityMutation.mutate({
      inventoryId: storage * 1,
      minQuantity: minQuantity * 1,
      productVariantId: product * 1,
    });
  };

  const columns: ColumnsType<IProductVariantDto> = [
    {
      title: "???nh",
      dataIndex: "image",
      render: (img: string) => {
        return (
          <Image
            width={45}
            src={img}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          />
        );
      },
    },
    {
      title: "M?? s???n ph???m",
      dataIndex: ["code", "obj"],
      render: (code: string, obj: any) => {
        return (
          <Link
            style={{ textDecoration: "underline" }}
            to={`/warehouse/products/${obj.productId}`}
          >
            {obj.code}
          </Link>
        );
      },
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "T??n",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Gi?? nh???p (????n v??? vn??)",
      dataIndex: "importPrice",
      render: (Price: string) => (
        <NumberFormat
          value={Price}
          displayType="text"
          thousandSeparator={true}
        />
      ),
      sorter: (a, b) => a.importPrice - b.importPrice,
    },
    {
      title: "T???n kho",
      dataIndex: ["quantity", "min"],
      render: (_, quantity: any) => {
        return (
          <Row className="w-20" justify="space-between">
            <Col span={20}>
              <Tooltip
                title={
                  <NumberFormat
                    value={quantity.quantity}
                    displayType="text"
                    thousandSeparator={true}
                  />
                }
              >
                {Intl.NumberFormat("en", { notation: "compact" }).format(quantity.quantity)}
              </Tooltip>
            </Col>
            <Col span={3}>
              <Tooltip
                title={
                  quantity.minQuantity === 0
                    ? "Th??m gi???i h???n c???nh b??o"
                    : quantity.quantity > quantity.minQuantity
                      ? `C??n h??ng ${quantity?.quantity?.toLocaleString() || 'Ch??a x??t SL'} / ${quantity?.minQuantity?.toLocaleString() || 'Ch??a x??t SL'}`
                      : `S???p h???t h??ng ${quantity?.quantity?.toLocaleString() || 'Ch??a x??t SL'} / ${quantity?.minQuantity?.toLocaleString() || 'Ch??a x??t SL'}`
                }
              >
                {quantity?.minQuantity ? (
                  <FiberManualRecordIcon
                    onClick={() => {
                      setMinQuantityModal(true);
                      minQuantityForm.setFieldValue("storage", id);
                      minQuantityForm.setFieldValue("product", quantity?.id);
                    }}
                    style={
                      quantity.quantity > quantity.minQuantity
                        ? { color: "green" }
                        : { color: "red" }
                    }
                  />
                ) : (
                  <AddIcon
                    onClick={() => {
                      setMinQuantityModal(true);
                      minQuantityForm.setFieldValue("storage", id);
                      minQuantityForm.setFieldValue("product", quantity?.id);
                    }}
                  />
                )}
              </Tooltip>
            </Col>
          </Row>
        );
      },
      sorter: (a, b) => a.quantity - b.quantity,
    },
    // {
    //   title: "Ng??y kh???i t???o",
    //   dataIndex: "createAt",
    //   render: (createAt: string) => (
    //     <Moment format="DD/MM/YYYY HH:mm:ss">{createAt}</Moment>
    //   ),
    //   sorter: (a, b) => a.createAt.localeCompare(b.createAt),
    // },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  let hasSelected = selectedRowKeys.length > 0;

  const data: IProductVariantDto[] = productvariant;



  const handleSearch = (e: string) => {
    setName(e.trim());
  };

  return (
    <div className="p-5">
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2 style={{ fontSize: "15px" }}>
          <Link to="/inventories">
            <LeftOutlined /> Danh s??ch kho
          </Link>
        </h2>
        <div>
          <Space>
            {inventory?.id ? <InventoryByQuantity inventoryId={inventory?.id} status={status}/> : null}
            <Button
              type="primary"
              onClick={() => navigate(`../categories`)}
            >
              Xem danh m???c s???n ph???m
            </Button>
            <Button
              type="primary"
              onClick={() => navigate(`../products`)}
            >
              Xem danh s??ch s???n ph???m
            </Button>
          </Space>
        </div>
      </div>

      <Row gutter={24}>
        <Col span={18}>
          <div className="block">
            <h5 style={{ color: "#1890FF" }}>T???t c??? phi??n b???n s???n ph???m</h5>
            <Search
              placeholder="T??m ki???m theo t??n, m?? s???n ph???m"
              size="large"
              onSearch={(e) => handleSearch(e)}
            />
            <Table
              rowKey={"id"}
              rowSelection={rowSelection}
              columns={columns}
              dataSource={data}
              bordered
              loading={{ spinning: reload }}
            />
          </div>
        </Col>
        <Col span={6}>
          <div className="block">
            <h5 style={{ color: "#1890FF" }}>Th??ng tin kho</h5>
            <form>
              <Row gutter={24}>

                <Col span={8}>
                  <p>Tr???ng th??i:</p>
                </Col>
                <Col span={16}>
                  
                    {inventory?.isDelete ?
                      (<Tag
                        style={{ borderRadius: "15px", padding: "3px 10px"}}
                        color={`rgb(246 76 114)`}
                      >
                        Ng???ng ho???t ?????ng
                      </Tag>)
                      :
                      (<Tag
                        style={{ borderRadius: "15px", padding: "3px 10px"}}
                        color={"green" || `rgb(159 237 207)`}
                      >
                        ??ang ho???t ?????ng
                      </Tag>)
                    }
               
                </Col>



                <Col span={8}>
                  <p>M?? kho:</p>
                </Col>
                <Col span={16}>
                  <b style={{ textTransform: "uppercase" }}>{inventory.code}</b>
                </Col>

                <Col span={8}>
                  <p>T??n kho:</p>
                </Col>
                <Col span={16}>
                  <b style={{ textTransform: "uppercase" }}>{inventory.name}</b>
                </Col>


                <Col span={8}>
                  <p>S??? l?????ng phi??n b???n s???n ph???m:</p>
                </Col>
                <Col span={16}>
                  <b style={{ textTransform: "uppercase" }}>
                    <NumberFormat
                      value={countproduct}
                      displayType="text"
                      thousandSeparator={true}
                    />
                  </b>
                </Col>

                <Col span={8}>
                  <p>T???ng s???n ph???m:</p>
                </Col>
                <Col span={16}>
                  <b style={{ textTransform: "uppercase" }}>
                    <NumberFormat
                      value={totalproduct}
                      displayType="text"
                      thousandSeparator={true}
                    />
                  </b>
                </Col>

                {/* <Col span={8}>
                    <p>Size:</p>
                  </Col>
                  <Col span={16}>
                    <b style={{ textTransform: "uppercase" }}>
                      <NumberFormat value={inventory.size} displayType='text' thousandSeparator={true} />
                    </b>
                  </Col> */}

                <Col span={8}>
                  <p>?????a ch???:</p>
                </Col>
                <Col span={16}>
                  <b style={{ textTransform: "uppercase" }}>
                    {inventory.address}
                  </b>
                </Col>

                <Col span={8}>
                  <p>Th???i gian t???o:</p>
                </Col>
                <Col span={16}>
                  <b style={{ textTransform: "uppercase" }}>
                    <Moment format="DD/MM/YYYY HH:mm:ss">
                      {inventory.createAt}
                    </Moment>
                  </b>
                </Col>

              </Row>
            </form>
          </div>
        </Col>
      </Row>
      <Modal
        visible={minQuantityModal}
        destroyOnClose
        onCancel={() => setMinQuantityModal(false)}
        closeIcon={null}
        footer={null}
      >
        <Form form={minQuantityForm}>
          <Form.Item name="storage" style={{ display: "none" }}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="product" style={{ display: "none" }}>
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="minQuantity"
            label="Gi???i h???n c???nh b??o h???t h??ng"
            className="w-max"
          >
            <Input type="number" min={0} width={20} />
          </Form.Item>
          <Form.Item>
            <Buttonn
              loading={minQuantityMutation.isLoading}
              onClick={minQuantityHandler}
              type="submit"
            >
              Ok
            </Buttonn>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default InventoryManager;
