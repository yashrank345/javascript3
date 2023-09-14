class BankAccount {
  constructor(accountNumber, accountHolder, balance = 0) {
      this.accountNumber = accountNumber;
      this.accountHolder = accountHolder;
      this.balance = balance;
  }

  deposit(amount) {
      if (amount <= 0) {
          throw new Error("Invalid deposit amount");
      }
      this.balance += amount;
  }

  withdraw(amount) {
      if (amount <= 0 || amount > this.balance) {
          throw new Error("Invalid withdrawal amount");
      }
      this.balance -= amount;
  }
}

class Bank {
  constructor() {
      this.accounts = [];
      this.transactionLog = [];
  }

  createAccount(accountNumber, accountHolder, initialBalance) {
      const account = new BankAccount(accountNumber, accountHolder, initialBalance);
      this.accounts.push(account);
      return account;
  }

  makeTransaction(accountNumber, transactionType, amount) {
      const account = this.accounts.find(acc => acc.accountNumber === accountNumber);

      if (!account) {
          throw new Error("Account not found");
      }

      switch (transactionType) {
          case "deposit":
              try {
                  account.deposit(amount);
                  this.transactionLog.push(`Deposited $${amount} to account ${accountNumber}. New balance: $${account.balance}`);
              } catch (error) {
                  this.transactionLog.push(`Deposit error: ${error.message}`);
              }
              break;
          case "withdraw":
              try {
                  account.withdraw(amount);
                  this.transactionLog.push(`Withdrawn $${amount} from account ${accountNumber}. New balance: $${account.balance}`);
              } catch (error) {
                  this.transactionLog.push(`Withdrawal error: ${error.message}`);
              }
              break;
          case "View Balance":
            // Add an event listener for the "View Balance" button
const viewBalanceButton = document.getElementById("view-balance-button");
viewBalanceButton.addEventListener("click", function (e) {
  e.preventDefault();
  const accountNumber = parseInt(document.getElementById("view-account-number").value);

  // Find the account by account number
  const account = bank.accounts.find(acc => acc.accountNumber === accountNumber);

  if (!account) {
    // Account not found
    document.getElementById("balance-display").textContent = "Account not found";
  } else {
    // Display the account balance
    document.getElementById("balance-display").textContent = `Account Balance: $${account.balance}`;
  }
});
break;      
          default:
              this.transactionLog.push("Invalid transaction type");
      }
  }
}

const bank = new Bank();
const account1 = bank.createAccount(12345, "John Doe", 1000);
const account2 = bank.createAccount(67890, "Jane Smith", 500);

const accountForm = document.getElementById("account-form");
const transactionForm = document.getElementById("transaction-form");
const transactionLog = document.getElementById("transaction-log");

accountForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const accountNumber = parseInt(document.getElementById("account-number").value);
  const accountHolder = document.getElementById("account-holder").value;
  const initialBalance = parseFloat(document.getElementById("initial-balance").value);
  bank.createAccount(accountNumber, accountHolder, initialBalance);
  accountForm.reset();
});

transactionForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const accountNumber = parseInt(document.getElementById("transaction-account").value);
  const transactionType = document.getElementById("transaction-type").value;
  const amount = parseFloat(document.getElementById("transaction-amount").value);
  bank.makeTransaction(accountNumber, transactionType, amount);
  transactionForm.reset();
  updateTransactionLog();
});

function updateTransactionLog() {
  transactionLog.innerHTML = bank.transactionLog.join("<br>");
}
