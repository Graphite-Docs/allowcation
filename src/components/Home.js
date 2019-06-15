import React, { Component, setGlobal } from 'reactn';
import Nav from './Nav';
import { Container, Button, Table, Icon, Modal, Input, Radio } from 'semantic-ui-react';
import { saveTransaction, deleteTransaction } from '../helpers/transactions';
import DatePicker from 'react-date-picker';

class Home extends Component {
  constructor(props) {
      super(props);
      this.state = {
          deleteModalOpen: false, 
          transaction: {}, 
          value: "", 
          date: new Date()
      }
  }
  
  handleDelete = (transaction) => {
      this.setState({ 
          deleteModalOpen: true,
          transaction 
        });
  }

  saveDelete = (t) => {
      this.setState({ deleteModalOpen : false });
      deleteTransaction(t)
  }
  handleCancel = () => {
    document.getElementById('transaction-date').value = "";
    document.getElementById('transaction-name').value = "";
    document.getElementById('transaction-amount').value = "";
    setGlobal({ transactionModalOpen: false })
  }

  handleChange = (e, { value }) => this.setState({ value })

  onChange = date => this.setState({ date })

  checkPattern = () => {
    let value = document.getElementById('transaction-amount').value;
    var regexp = /^[0-9]+([,.][0-9]+)?$/g;
    var result = regexp.test(value);
    if(value !== "" && result === false) {
        document.getElementById('transaction-amount').style.background = "red";
        document.getElementById("amount-validation").style.display = "block";
    } else {
        document.getElementById('transaction-amount').style.background = "#fff";
        document.getElementById("amount-validation").style.display = "none";
    }
  }

  render() {
    const { transactions, balance, transactionModalOpen } = this.global;
    const { value, date } = this.state;
    return (
        <div>
            <Nav />
            <Container>
                <h1>Account Information - Balance: ${balance}</h1>
                <h3>  
                    <Modal 
                        trigger={<Button onClick={() => setGlobal({ transactionModalOpen: true})} className="btn button-primary">Add Transaction <span><Icon name="add" /></span></Button>}
                        open={transactionModalOpen}
                        onClose={() => setGlobal({ transactionModalOpen: false})}
                        basic
                        size='small'
                    >
                        <Modal.Header>Add a Transaction</Modal.Header>
                        <Modal.Content>
                        <Modal.Description className="transaction-modal">
                            <p>Enter the transaction details below.</p>
                            <div>
                                <Radio value='credit' checked={this.state.value === 'credit'} onChange={this.handleChange} style={{color: "#fff"}} label='Credit' />
                                <Radio value='debit' checked={this.state.value === 'debit'} onChange={this.handleChange} style={{color: "#fff"}} label='Debit' />
                            </div>
                            <div>
                                <div className="ui labeled input">
                                    <div className="ui label label">Date</div>
                                    <DatePicker
                                        onChange={this.onChange}
                                        value={date}
                                    />
                                </div>
                            </div>
                            <div>
                                <Input id="transaction-name" label='Name' type="text" placeholder="Allowance" />
                            </div>
                            <div>
                                <Input onChange={this.checkPattern} id="transaction-amount" label='Amount' type="text" placeholder="5.00" />
                                <p id="amount-validation" style={{display: "none", marginTop: "5px", marginBottom: "5px", color: "red"}}>Please enter a valid number (numbers and decimals only)</p>
                            </div>
                            <div>
                                <Button onClick={() => saveTransaction({date, value})} className="button-primary btn">Save</Button>
                                <Button onClick={this.handleCancel} className="btn">Cancel</Button>
                            </div>
                        </Modal.Description>
                        </Modal.Content>
                    </Modal>
                </h3>
                <Table singleLine>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Transaction Date</Table.HeaderCell>
                        <Table.HeaderCell>Transaction Name</Table.HeaderCell>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                        <Table.HeaderCell>Balance</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                    {
                        transactions.reverse().map(a => {
                            return (
                                <Table.Row key={a.id}>
                                    <Table.Cell>{a.date}</Table.Cell>
                                    <Table.Cell>{a.name}</Table.Cell>
                                    <Table.Cell>{a.amount}</Table.Cell>
                                    <Table.Cell>{`$${a.balance}`}</Table.Cell>
                                    <Table.Cell>
                                    <Modal
                                        trigger={<button onClick={() => this.handleDelete(a)} className="button-link" style={{color: "red"}}>Delete</button>}
                                        open={this.state.deleteModalOpen}
                                        onClose={() => this.setState({ deleteModalOpen: false})}
                                        basic
                                        size='small'
                                    >
                                        <Modal.Content>
                                        <h3>Delete {this.state.transaction.name} from {this.state.transaction.date}?</h3>
                                        </Modal.Content>
                                        <Modal.Actions>
                                        <Button className="btn" color='red' onClick={() => this.saveDelete(a)} inverted>
                                            Delete
                                        </Button>
                                        <Button className="btn" onClick={() => this.setState({ deleteModalOpen: false })}>
                                            Cancel
                                        </Button>
                                        </Modal.Actions>
                                    </Modal>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })
                    }
                    </Table.Body>
                </Table>
            </Container>
        </div>
    );
  }
}

export default Home;
