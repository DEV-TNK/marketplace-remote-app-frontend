// import node module libraries
import React, { useState, useMemo, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  Image,
  Alert,
  Form,
  Table,
  Button,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "react-feather";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useGlobalContext } from "../../context/AuthContext";
import { showToast } from "../../Components/Showtoast";
import { Trash, Edit, MoreVertical } from "react-feather";

// import media files
import PayPal from "../../assets/images/brand/paypal-small.svg";
import Payoneer from "../../assets/images/brand/payoneer.svg";

// import custom components
import Pagination from "../../Components/elements/advance-table/Pagination";
import ApexCharts from "../../Components/elements/charts/ApexCharts";
import StatTopIcon from "../../Components/marketing/common/stats/StatTopIcon";
import { FormSelect } from "../../Components/elements/form-select/FormSelect";

// import utility file
import { numberWithCommas } from "../../helper/utils";

// Import dashboard layout
import InstructorProfileLayout from "../JobSeekerProfileLayout";

// import data files
import { WithdrawHistoryData } from "../../data/marketing/WithdrawHistoryData";
import {
  PayoutChartSeries,
  PayoutChartOptions,
} from "../../data/charts/ChartData";
import EarningData from "./EarningData";

const Payouts = () => {
  const { userId } = useGlobalContext();
  const [filtering, setFiltering] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [withdrawnAmount, setWithdrawnAmount] = useState("");
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [bankData, setBankData] = useState([]);
  const nairaSign = "\u20A6";
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [currency, setCurrency] = useState("");
  const [bankName, setBankName] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedBankId, setSelectedBankId] = useState("");
  const [error, setError] = useState("");
  const [errorAcc, setErrorAcc] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedAccount, setEditedAccount] = useState(null);

  const [earnings, setEarnings] = useState({
    CFA: 0,
    // USD: 0,
    // EUR: 0,
    // GBP: 0,
  });

  const [selectedCurrency, setSelectedCurrency] = useState("F CFA");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleChange = (event) => {
    setSelectedBankId(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const userId = sessionStorage.getItem("UserId");
      try {
        const response = await axios.get(
          `https://marketplacebackendas-test.azurewebsites.net/api/v1/get-my-earning/${userId}`
        );

        if (response.data.userEarning) {
          setEarnings(response.data.userEarning);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };

  const formatPrice = (currencyName) => {
    switch (currencyName) {
      case "CFA franc":
      case "F CFA":
        return `F CFA`;
      // case "dollars":
      // case "USD":
      //   return `$`;
      // case "euros":
      // case "EUR":
      //   return `€`;
      // case "pounds":
      // case "GBP":
      //   return `£`;
      default:
        return `F CFA`;
    }
  };

  const [currentPage, setCurrentPage] = useState(0);
  const accountsPerPage = 3;

  // Calculate the total number of pages
  const pageCount = Math.ceil(bankData.length / accountsPerPage);

  // Function to handle page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Get current accounts
  const indexOfLastAccount = (currentPage + 1) * accountsPerPage;
  const indexOfFirstAccount = indexOfLastAccount - accountsPerPage;
  const currentAccounts = bankData.slice(
    indexOfFirstAccount,
    indexOfLastAccount
  );

  useEffect(() => {
    // Function to retrieve bank data from the server
    const fetchBankData = async () => {
      try {
        const response = await axios.get(
          `https://marketplacebackendas-test.azurewebsites.net/api/v1/bank-details/${userId}`
        );
        const fetchedBankData = response.data.accountDetails; // Access accountDetails array from response data
        setBankData(fetchedBankData);
      } catch (error) {
        console.error("Error fetching bank data:", error);
      }
    };

    // Fetch bank data from server
    fetchBankData();
  }, [userId]);

  const handleSave = async () => {
    if (userId && accountName && accountNumber && bankName && currency) {
      // Check if userId is present
      try {
        const saveBankData = await axios.post(
          "https://marketplacebackendas-test.azurewebsites.net/api/v1/save-bank-details",
          {
            userId: userId,
            accountName,
            accountNumber,
            bankName,
            currency,
          }
        );

        console.log("Response :", saveBankData.data);
        // Update bank data state with the newly saved account details
        // setBankData([...bankData, saveBankData.data.newAccount]);
        setBankData([...bankData, saveBankData.data.newAccount]);

        showToast(saveBankData.data.message);
      } catch (error) {
        console.error("Error:", error);
        showToast(error.response.data.message);
      }

      setShowModal(false);
    } else {
      console.error("Error: userId is required");
      showToast("User ID is required");
    }
  };

  const handleAddAccount = () => {
    setShowModal(true);
  };

  const handleEdit = (id) => {
    const editedAccount = currentAccounts.find((account) => account.id === id);
    if (editedAccount) {
      setEditedAccount({ ...editedAccount, accountId: id });
      setShowEditModal(true);
    } else {
      console.error("Account not found");
    }
  };

  const handleEditSave = async (accountId) => {
    console.log(accountId);
    try {
      await axios.put(
        "https://marketplacebackendas-test.azurewebsites.net/api/v1/edit-account",
        {
          userId: userId,
          accountId: accountId,
          accountName: editedAccount.accountName,
          bankName: editedAccount.bankName,
          accountNumber: editedAccount.accountNumber,
          currency: editedAccount.currency,
        }
      );
      setShowEditModal(false);
      showToast("Account update Successfully");
    } catch (error) {
      console.error("Error editing account:", error);
      showToast("Error updating bank details");
    }
  };

  // const handleBankChange = async (amount, currency) => {
  //   setTotalAmount(amount);
  //   setCurrency(currency);
  // };

  const handleWithdraw = async () => {
    if (!selectedBankId) {
      setErrorAcc("Veuillez sélectionner un compte bancaire.");
      return;
    }
    setLoading(true);

    try {
      const withdrawAmountNumeric = parseFloat(withdrawnAmount);
      const totalAmountNumeric = parseFloat(totalAmount);
      if (withdrawAmountNumeric < totalAmountNumeric) {
        const response = await axios.post(
          "https://marketplacebackendas-test.azurewebsites.net/api/v1/create-payment-request",
          {
            userId: parseFloat(userId),
            accountId: selectedBankId,
            amount: parseFloat(withdrawnAmount),
            currency: selectedCurrency,
          }
        );

        
        // Update the earnings state immediately
        setEarnings((prevEarnings) => ({
          ...prevEarnings,
          [selectedCurrency]:
            prevEarnings[selectedCurrency] - withdrawAmountNumeric,
        }));
        setTotalAmount(totalAmountNumeric - withdrawAmountNumeric);
        setWithdrawnAmount(""); // Clear the withdrawn amount input

        showToast(response.data.message);
        setLoading(false);
        setErrorAcc("");
        setError("");
        setShowWithdrawModal(false);
      } else {
        // Show an error message indicating that the withdrawal amount exceeds total earnings
        setLoading(false);
        setError("Insufficent Amount.");
        setShowWithdrawModal(true);
      }
    } catch (error) {
      setLoading(false);
      setErrorAcc("");
      setError("");
      showToast(error.response.data.message);
    }
  };

  // The forwardRef is important!!
  // Dropdown needs access to the DOM node in order to position the Menu
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      to=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="btn-icon btn btn-ghost btn-sm rounded-circle"
    >
      {children}
    </Link>
  ));

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: ({ getValue }) => {
          return "#" + getValue();
        },
      },
      { accessorKey: "method", header: " méthode" },
      { accessorKey: "date", header: "Date" },
      {
        accessorKey: "amount",
        header: "montant",
        cell: ({ getValue }) => {
          return nairaSign + numberWithCommas(getValue());
        },
      },
      {
        accessorKey: "status",
        header: "Statut",
        cell: ({ getValue }) => {
          return (
            <Badge
              bg={`${
                getValue() === "Pending"
                  ? "warning"
                  : getValue() === "completed"
                  ? "success"
                  : "danger"
              } `}
            >
              {getValue()}
            </Badge>
          );
        },
      },

      // { accessorKey: "jobTitle", header: "Job Title" },
    ],
    []
  );

  // const data = useMemo(() => <WithdrawHistoryData />, []);
  const historyData = WithdrawHistoryData();

  const table = useReactTable({
    data: historyData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setFiltering,
    debugTable: false,
  });

  const bankCurrency = [
    { value: "F CFA", label: "CFA franc" },
    // { value: "EUR", label: "Euros" },
    // { value: "USD", label: "Dollars" },
    // { value: "GBP", label: "Pounds" },
  ];

  const AlertDismissible = () => {
    const [show, setShow] = useState(true);
    if (show) {
      return (
        <Alert
          variant="light-warning"
          className="bg-light-warning text-dark-warning border-0"
          onClose={() => setShow(false)}
          dismissible
        >
          <strong>Payout@PME Côte d’Ivoire Marketplace.com </strong>
          <p>
          Vous recevrez votre argent sur votre compte bancaire après deux jours ouvrables de demande de retrait.
          </p>
        </Alert>
      );
    }
    return "";
  };

  return (
    <InstructorProfileLayout>
      {/* <EarningData setTotalAmount={setTotalAmount} /> */}
      <Card className="border-0">
        <Card.Header>
          <div className="mb-3 mb-lg-0">
            <h3 className="mb-0">Mode de paiement</h3>
            <p className="mb-0">
            le tableau de bord des paiements est un aperçu rapide de toutes les demandes de paiement actuelles et anciennes.
            </p>
          </div>
        </Card.Header>
        <Card.Body>
          <AlertDismissible />
          <Row className="mt-6">
            <Col xl={4} lg={4} md={12} sm={12} className="mb-3 mb-lg-0">
              <div className="text-center">
                {/* Payout chart */}
                <ApexCharts
                  options={PayoutChartOptions}
                  series={PayoutChartSeries}
                  height={165}
                  type="bar"
                />
                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                  <DropdownToggle caret>{selectedCurrency}</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => handleCurrencyChange("F CFA")}>
                      F CFA
                    </DropdownItem>
                    {/* <DropdownItem onClick={() => handleCurrencyChange("USD")}>
                      USD
                    </DropdownItem>
                    <DropdownItem onClick={() => handleCurrencyChange("EUR")}>
                      EUR
                    </DropdownItem>
                    <DropdownItem onClick={() => handleCurrencyChange("GBP")}>
                      GBP
                    </DropdownItem> */}
                  </DropdownMenu>
                </Dropdown>
                <h4 className="mb-1"> Votre revenu total</h4>
                <h5 className="mb-0 display-4 fw-bold">
                  {formatPrice(selectedCurrency)}
                  {earnings[selectedCurrency] }{" "}
                  {/* Display earnings with Naira sign */}
                </h5>
                <p className="px-4">Vous pouvez modifier votre compte de paiement ci-dessus</p>

                <Button
                  variant="primary"
                  onClick={() => {
                    setTotalAmount(earnings[selectedCurrency]);
                    console.log("this is earning", earnings[selectedCurrency]);
                    setShowWithdrawModal(true);
                  }}
                >
                  retirer les gains
                </Button>

                {/* Withdraw Modal */}
                <Modal
                  show={showWithdrawModal}
                  onHide={() => setShowWithdrawModal(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>retirer les gains</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {/* Display account details */}

                    <div className="border p-4 rounded-3 mt-3">
                      <h4>Sélectionnez les banques:</h4>
                      {/* <p>
                        If the bank currency you select is difference from the
                        currency you withdraw from, the amount will be converted
                        according to your country head bank currency value
                      </p> */}
                      {bankData.length > 0 ? (
                        <select
                          className="form-select"
                          defaultValue=""
                          onChange={handleChange}
                        >
                          <option value="" disabled>
                            Select an account
                          </option>
                          {bankData.map((account, index) => (
                            <option key={index} value={account.id}>
                              {account.accountName} - {account.bankName} (
                              {account.currency})
                            </option>
                          ))}
                        </select>
                      ) : (
                        <p>Aucun compte trouvé.</p>
                      )}
                      {errorAcc && (
                        <div className="alert alert-danger mt-3">
                          {errorAcc}
                        </div>
                      )}
                    </div>

                    {/* Display withdrawal amount input field */}
                    <div className="border p-4 rounded-3 mt-3">
                      <h4>
                      Solde disponible: {formatPrice(selectedCurrency)}
                        {earnings[selectedCurrency] || 0.0}
                      </h4>
                      <Form.Group controlId="withdrawnAmount">
                        <Form.Label>
                        Montant retiré {formatPrice(selectedCurrency)}
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder={`Entrez le montant en ${formatPrice(
                            selectedCurrency
                          )}`}
                          value={withdrawnAmount}
                          onChange={(e) => setWithdrawnAmount(e.target.value)}
                        />
                        {error && (
                          <div className="alert alert-danger mt-3">{error}</div>
                        )}
                      </Form.Group>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    {loading ? (
                      <Button
                        variant="primary"
                        style={{ opacity: ".7" }}
                        disabled
                      >
                        Processing
                      </Button>
                    ) : (
                      <Button variant="primary" onClick={handleWithdraw}>
                        Retirer
                      </Button>
                    )}
                  </Modal.Footer>
                </Modal>
              </div>
            </Col>
            <Col xl={8} lg={8} md={12} sm={12}>
              <Col xs={12} className="mt-3 text-center">
                <Button variant="outline-primary" onClick={handleAddAccount}>
                Ajouter un compte
                </Button>
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Entrez les détails du compte</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group className="mb-3" controlId="accountName">
                        <Form.Label>Nom du compte</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Entrez le nom du compte"
                          value={accountName}
                          onChange={(e) => setAccountName(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="accountNumber">
                        <Form.Label>Numéro de compte</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Entrez le numéro de compte"
                          value={accountNumber}
                          onChange={(e) => setAccountNumber(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="bankName">
                        <Form.Label>Nom de la banque</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Entrez le nom de la banque"
                          value={bankName}
                          onChange={(e) => setBankName(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Devise</Form.Label>
                        <FormSelect
                          options={bankCurrency}
                          placeholder="Sélectionnez la devise"
                          id="course_currency"
                          name="currency"
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value)}
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Fermer
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                    Enregistrer
                    </Button>
                  </Modal.Footer>
                </Modal>
                {bankData.length > 0 && (
                  <div className="mt-3 mb-3">
                    {currentAccounts.map((account, index) => (
                      <div
                        key={index}
                        className="border rounded px-2 mt-2 text-start position-relative"
                      >
                        {/* Edit button */}
                        <button
                          className="btn btn-primary btn-sm position-absolute top-0 end-0 m-3"
                          onClick={() => handleEdit(account.id)}
                        >
                          Edit
                        </button>
                        <p>
                          <strong>Account Name:</strong> {account.accountName}
                        </p>
                        <p>
                          <strong>Account Number:</strong>{" "}
                          {account.accountNumber}
                        </p>
                        <p>
                          <strong>Bank Name:</strong> {account.bankName}
                        </p>
                        <p>
                          <strong>Currency:</strong> {account.currency}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                {bankData.length > accountsPerPage && (
                  <ReactPaginate
                    previousLabel={<ChevronLeft size="14px" />}
                    nextLabel={<ChevronRight size="14px" />}
                    pageCount={pageCount}
                    onPageChange={handlePageChange}
                    containerClassName={
                      "pagination justify-content-center mb-0"
                    }
                    previousLinkClassName={"page-link mx-1 rounded"}
                    nextLinkClassName={"page-link mx-1 rounded"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link mx-1 rounded"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"active"}
                  />
                )}

                {/* Edit Modal */}
                <Modal
                  show={showEditModal}
                  onHide={() => setShowEditModal(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Edit Account Details</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group className="mb-3" controlId="accountName">
                        <Form.Label>Account Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Account Name"
                          value={editedAccount?.accountName || ""}
                          onChange={(e) =>
                            setEditedAccount({
                              ...editedAccount,
                              accountName: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="accountNumber">
                        <Form.Label>Account Number</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Account Number"
                          value={editedAccount?.accountNumber || ""}
                          onChange={(e) =>
                            setEditedAccount({
                              ...editedAccount,
                              accountNumber: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="bankName">
                        <Form.Label>Bank Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Bank Name"
                          value={editedAccount?.bankName || ""}
                          onChange={(e) =>
                            setEditedAccount({
                              ...editedAccount,
                              bankName: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Currency</Form.Label>
                        <Form.Control
                          as="select"
                          value={editedAccount?.currency || ""}
                          onChange={(e) =>
                            setEditedAccount({
                              ...editedAccount,
                              currency: e.target.value,
                            })
                          }
                        >
                          {bankCurrency.map((currency) => (
                            <option key={currency.value} value={currency.value}>
                              {currency.label}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => setShowEditModal(false)}
                    >
                      Close
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => handleEditSave(editedAccount.accountId)}
                    >
                      Save
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Col>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* earnings component */}
      {/*   
      <Row className="mt-4">
        <Col lg={4} md={12} sm={12} className="mb-4 mb-lg-0">
          <StatTopIcon
            title="Earning this month"
            value={
              (totalAmount / 100)
                .toLocaleString("en-NG", { style: "currency", currency: "NGN" })
                .slice(0, -3) +
              "." +
              (totalAmount % 100).toString().padStart(2, "0")
            }
            iconName="folder"
            colorVariant="primary"
            progress={65}
          />
        </Col>
        <Col lg={4} md={12} sm={12} className="mb-4 mb-lg-0">
          <StatTopIcon
            title="Account Balance"
            value={
              (totalAmount / 100)
                .toLocaleString("en-NG", { style: "currency", currency: "NGN" })
                .slice(0, -3) +
              "." +
              (totalAmount % 100).toString().padStart(2, "0")
            }
            iconName="shopping-bag"
            colorVariant="danger"
            progress={65}
          />
        </Col>
        <Col lg={4} md={12} sm={12}>
          <StatTopIcon
            title="Life Time Sales"
            value={
              (totalAmount / 100)
                .toLocaleString("en-NG", { style: "currency", currency: "NGN" })
                .slice(0, -3) +
              "." +
              (totalAmount % 100).toString().padStart(2, "0")
            }
            iconName="send"
            colorVariant="warning"
            progress={65}
          />
        </Col>
      </Row> */}

      <Card className="border-0 mt-4">
        <Card.Header>
          <h3 className="mb-0 h4">Historique des retraits</h3>
        </Card.Header>
        <Card.Body className="p-0 pb-4">
          <Table hover responsive className="text-nowrap table-centered">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination @ Footer */}
          <div className="mt-4">
            <Pagination table={table} />
          </div>
        </Card.Body>
      </Card>
    </InstructorProfileLayout>
  );
};

export default Payouts;
