// As per task requirements, the high level component that has list of all expenses

import { Component, h, State } from '@stencil/core';
import { Expense, EditorOptions } from '../../types/main';

@Component({
  tag: 'app-list',
  styleUrl: 'app-list.css'
})
export class AppList {
  @State() expenses: Expense[] = [];
  @State() activeError: boolean = false;
  @State() editor: EditorOptions = {
    active: false,
    expense: null
  };
  @State() private isLoading: boolean = true;

  componentWillLoad = () => {
    this.loadExpenses();
  }

  manageEditor = (options: EditorOptions) => {
    this.editor = options;
  }

  loadExpenses = () => {
    if (this.activeError) {
      this.activeError = false;
    }

    fetch('/api/data')
      .then(response => response.json())
      .then(json => {
        if (!json.success) {
          this.activeError = true;
          return;
        }
        this.expenses = json.data.expenses as Expense[] | [];
        this.expenses = this.sortExpenses();
      })
      .catch(error => {
        console.log(error.message);
        this.activeError = true;
      }).finally(() => {
        this.isLoading = false;
      });
  }

  sortExpenses = (): Expense[] => {
    return this.expenses.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }

  render() {
    return (
      this.isLoading ? <loader-ball size="default" /> :
        <div class="app-home">
          <div class="list-head">
            <h2>Expenses list</h2>
            <button
              disabled={this.activeError}
              class="btn"
              onClick={() => this.manageEditor({
                active: !this.editor.active,
                expense: null
              })}>
              {this.editor.active ? 'Close editor' : 'Add expense'}
            </button>
          </div>

          {this.editor.active && <expense-form editableExpense={this.editor.expense} onExpenseUpdate={(expenses) => {
            this.expenses = expenses.detail;
            this.expenses = this.sortExpenses();
            this.manageEditor({
              active: false,
              expense: null
            });
          }} />}

          {
            this.expenses.length > 0 ?
              <div class="table-wrap">
                <table>
                  <tr>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                  {
                    this.expenses.map((expense) =>
                      <expense-line
                        key={expense.id}
                        amount={expense.amount}
                        date={expense.date}
                        description={expense.description}
                        expenseID={expense.id}
                        onEditExpense={() => {
                          this.manageEditor({
                            active: true,
                            expense: expense
                          })
                        }
                        }
                        onExpenseUpdate={() => this.loadExpenses()}
                      />
                    )
                  }
                </table>
                <div>
                  Total expenses: {
                    Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'EUR'
                    }).format(
                      this.expenses.reduce((total, expense) => total + expense.amount, 0)
                    )
                  }
                </div>
              </div>
              :
              <placeholder-comp activeError={this.activeError} />
          }
        </div>

    );
  }
}
