import { useMemo, useState } from "react";
import { FileInput } from "./components/FileInput";
import { Container } from "./styled";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
function App() {
  const [keyFile, setKeyFile] = useState<File | null>(null);
  const [crtFile, setCrtFile] = useState<File | null>(null);
  const [connection, setConnection] = useState("");
  const [activateCRN, setActivateCRN] = useState("");
  const [general, setGeneral] = useState({
    seq: 0,
    cardAmount: 0,
    cashAmount: 0,
    partialAmount: 0,
    prePaymentAmount: 0,
    cashierId: 0,
    mode: 2,
    partnerTin: 0,
  });
  const [item, setItem] = useState({
    adgCode: 0,
    dep: 0,
    goodCode: "",
    goodName: "",
    quantity: 2,
    unit: "",
    price: 0,
    additionalDiscount: 0,
    additionalDiscountType: 0,
    discount: 0,
    discountType: 1,
  });
  const [items, setItems] = useState([]);

  const isItemValid = useMemo<boolean>(() => {
    if (item.goodCode === "") {
      return false;
    }

    if (item.goodName === "") {
      return false;
    }

    if (item.unit === "") {
      return false;
    }

    return true;
  }, [item]);

  const sendCertificates = () => {
    if (!crtFile) {
      toast("Please seleect files");

      return false;
    }

    const formData = new FormData();

    formData.append("crt", crtFile);
    formData.append("key", keyFile);

    axios
      .post<{ status: string }>(
        "http://188.34.157.194:8019/uploadCertificates",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.status);
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  };

  const addItemAction = () => {
    const itemCopy = { ...item };

    setItem({
      adgCode: 0,
      dep: 0,
      goodCode: "",
      goodName: "",
      quantity: 2,
      unit: "",
      price: 0,
      additionalDiscount: 0,
      additionalDiscountType: 0,
      discount: 0,
      discountType: 1,
    });

    setItems([...items, itemCopy]);
  };

  const checkConnection = () => {
    if (!activateCRN) {
      toast.warn("write CRN at top pannel");
      return false;
    }

    axios
      .post(
        "http://188.34.157.194:8019/checkConnection",
        {
          crn: activateCRN,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then(() => {
        setConnection("connected");
      });
  };

  const activateHDM = () => {
    axios
      .post<{ result: string }>("http://188.34.157.194:8019/activate", {
        crn: activateCRN,
      })
      .then((res) => {
        toast.success(res.data.result);
      });
  };

  const printFR = () => {

    if(!items.length) {
      toast.warn('Add items');
      return false;
    }

    if(!activateCRN) {
      toast.warn('Enter crn at top');
      return false;
    }
    
    axios.post('http://188.34.157.194:8019/print', {
      seq: 10,
      crn: activateCRN,
      ...general,
      items
    }).then(() => {
      toast.success('Success')
    }).catch(() => {
      toast.error('something wrong')
    })
  }

  return (
    <Container>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="head-actions">
          <div className="activate-hdm">
            <input
              value={activateCRN}
              onChange={({ target }) => setActivateCRN(target.value)}
              placeholder="crn"
            />
            <button onClick={() => activateHDM()}>Activate</button>
          </div>
          <div className="check-connection">
            <div
              className={`connection connection--${
                connection ? "connected" : "no-connection"
              }`}
            />
            <p>{connection ? "connected!" : "no connection"}</p>
            <button onClick={() => checkConnection()}>check</button>
          </div>
        </div>
        <div className="content">
          <div className="form">
            <div className="box">
              <h1>General</h1>
            </div>
            <div className="box">
              <label>Seq</label>
              <input
                value={general.seq}
                onChange={({ target }) =>
                  setGeneral({ ...general, seq: Number(target.value) })
                }
                type="number"
              />
            </div>
            <div className="box">
              <label>Card Amount</label>
              <input
                value={general.cardAmount}
                onChange={({ target }) =>
                  setGeneral({ ...general, cardAmount: Number(target.value) })
                }
                type="number"
              />
            </div>
            <div className="box">
              <label>Cash Amount</label>
              <input
                value={general.cashAmount}
                onChange={({ target }) =>
                  setGeneral({ ...general, cashAmount: Number(target.value) })
                }
                type="number"
              />
            </div>
            <div className="box">
              <label>Partial Amount</label>
              <input
                value={general.partialAmount}
                onChange={({ target }) =>
                  setGeneral({
                    ...general,
                    partialAmount: Number(target.value),
                  })
                }
                type="number"
              />
            </div>
            <div className="box">
              <label>Pre Payment Amount</label>
              <input
                value={general.prePaymentAmount}
                onChange={({ target }) =>
                  setGeneral({
                    ...general,
                    prePaymentAmount: Number(target.value),
                  })
                }
                type="number"
              />
            </div>
            <div className="box">
              <label>Cashier Id</label>
              <input
                value={general.cashierId}
                onChange={({ target }) =>
                  setGeneral({ ...general, cashierId: Number(target.value) })
                }
                type="number"
              />
            </div>
            <div className="box">
              <label>mode</label>
              <select
                value={general.mode}
                onChange={({ target }) =>
                  setGeneral({ ...general, mode: Number(target.value) })
                }
              >
                <option value={2}>Ապրանքներ ռեժիմ</option>
                <option value={3}>Կանխավճար</option>
              </select>
            </div>
            <div className="box">
              <label>Partner Tin</label>
              <input
                value={general.partnerTin}
                onChange={({ target }) =>
                  setGeneral({ ...general, partnerTin: Number(target.value) })
                }
                type="number"
              />
            </div>
          </div>
          <div className="form">
            <div className="box">
              <h1>Item</h1>
            </div>
            <div className="box">
              <label>ADG CODE</label>
              <input
                value={item.adgCode}
                onChange={({ target }) =>
                  setItem({ ...item, adgCode: Number(target.value) })
                }
                type="number"
              />
            </div>
            <div className="box">
              <label>DEP</label>
              <input
                value={item.dep}
                onChange={({ target }) =>
                  setItem({ ...item, dep: Number(target.value) })
                }
                type="number"
              />
            </div>
            <div className="box">
              <label>Good Code</label>
              <input
                value={item.goodCode}
                onChange={({ target }) =>
                  setItem({
                    ...item,
                    goodCode: target.value,
                  })
                }
              />
            </div>
            <div className="box">
              <label>Good Name</label>
              <input
                value={item.goodName}
                onChange={({ target }) =>
                  setItem({
                    ...item,
                    goodName: target.value,
                  })
                }
              />
            </div>
            <div className="box">
              <label>Quantity</label>
              <input
                value={item.quantity}
                onChange={({ target }) =>
                  setItem({ ...item, quantity: Number(target.value) })
                }
                type="number"
              />
            </div>
            <div className="box">
              <label>Unit</label>
              <input
                value={item.unit}
                onChange={({ target }) =>
                  setItem({ ...item, unit: target.value })
                }
              />
            </div>
            <div className="box">
              <label>Price</label>
              <input
                value={item.price}
                onChange={({ target }) =>
                  setItem({ ...item, price: Number(target.value) })
                }
                type="number"
              />
            </div>
            <div className="box">
              <label>Additional Discount</label>
              <input
                value={item.additionalDiscount}
                onChange={({ target }) =>
                  setItem({ ...item, additionalDiscount: Number(target.value) })
                }
                type="number"
              />
            </div>
            <div className="box">
              <label>Additional Discount Type</label>
              <input
                value={item.additionalDiscountType}
                onChange={({ target }) =>
                  setItem({
                    ...item,
                    additionalDiscountType: Number(target.value),
                  })
                }
                type="number"
              />
            </div>
            <div className="box">
              <label>Discount</label>
              <input
                value={item.discount}
                onChange={({ target }) =>
                  setItem({ ...item, discount: Number(target.value) })
                }
                type="number"
              />
            </div>
            <div className="box">
              <label>Discount Type</label>
              <input
                value={item.discountType}
                onChange={({ target }) =>
                  setItem({ ...item, discountType: Number(target.value) })
                }
                type="number"
              />
            </div>
            <button disabled={!isItemValid} onClick={() => addItemAction()}>
              Create Item
            </button>
          </div>
          <div className="items">
            <h1>Items</h1>
            {items.map((item, index) => {
              return (
                <div className="item" key={index + item.goodName}>
                  <p className="name">{item.goodName}</p>
                  <div
                    className="action"
                    onClick={() =>
                      setItems(items.filter((_item, i) => i !== index))
                    }
                  >
                    x
                  </div>
                </div>
              );
            })}
            <button onClick={() => printFR()}>Print FR</button>
          </div>
        </div>
        <div className="actions">
          <div className="files-container">
            <FileInput
              file={crtFile}
              onChange={(file) => setCrtFile(file)}
              label="Upload .crt file"
              extension=".crt"
            />
            <FileInput
              file={keyFile}
              onChange={(file) => setKeyFile(file)}
              label="Upload .key file"
              extension=".key"
            />
          </div>
          <button
            onClick={() => sendCertificates()}
            className="submit-button"
            type="submit"
          >
            SEND CERTIFICATES
          </button>
        </div>
      </form>

      <ToastContainer />
    </Container>
  );
}

export default App;
