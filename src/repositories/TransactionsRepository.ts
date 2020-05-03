import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomes = this.transactions
      .filter(el => el.type === 'income')
      .reduce((a, b) => a + b.value, 0);

    const outcomes = this.transactions
      .filter(el => el.type === 'outcome')
      .reduce((a, b) => a + b.value, 0);

    return { income: incomes, outcome: outcomes, total: incomes - outcomes };
  }

  public create({ type, title, value }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ type, title, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
