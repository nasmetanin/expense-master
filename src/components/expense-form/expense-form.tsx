import { Component, h, State, Prop, Event, EventEmitter } from '@stencil/core';
import { Expense } from '../../types/main';

@Component({
    tag: 'expense-form',
    styleUrl: 'expense-form.css',
})
export class ExpenseForm {

    @Prop() editableExpense: Expense;
    @State() private isLoading = false;
    @State() private expense: Expense = {
        id: null,
        amount: 0,
        date: '2024-01-01',
        description: ''
    };
    @Event() expenseUpdate: EventEmitter<Expense[]>;

    componentWillLoad() {
        this.applyProps();
    }

    componentWillUpdate() {
        this.applyProps();
    }

    applyProps = () => {
        if (!this.editableExpense) { return; }

        this.expense = {
            id: this.editableExpense.id,
            amount: this.editableExpense.amount,
            date: this.editableExpense.date,
            description: this.editableExpense.description
        };
    }

    submitChanges = (expense: Expense) => {
        this.isLoading = true;
        console.log('submitChanges', JSON.stringify(expense));
        if (!expense) { return; }
        const method = expense.id ? 'PUT' : 'POST';
        fetch(`/api/data${expense.id ? `/${expense.id}` : ''}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(expense)
        })
            .then(response => response.json())
            .then(json => {
                if (!json.success) {
                    alert('Error saving expense');
                    return;
                }

                this.expenseUpdate.emit(json.data as Expense[]);
            })
            .catch(error => {
                console.error(error.message);
                alert('Error saving expense');
            }).finally(() => {
                this.isLoading = false;
            });

    }

    render() {
        return (
            <form onSubmit={
                (event) => {
                    event.preventDefault();
                    this.submitChanges(this.expense);
                }
            }>
                {this.expense.id &&
                    <div>
                        <label htmlFor="id">Object ID</label>
                        <input
                            disabled
                            value={this.expense.id}
                            type="number" name="id" id="id" />
                    </div>
                }
                <div>
                    <label htmlFor="amount">Amount (EUR)</label>
                    <input onInput={
                        (event) => {
                            const target = event.target as HTMLInputElement;

                            this.expense.amount = Number(target.value);
                        }
                    } required type="number" name="amount" id="amount"
                        value={this.expense.amount}
                        step={0.01} min={0.01} max={100000}
                        placeholder='10 EUR' />
                </div>

                <div>
                    <label htmlFor="date">Date</label>
                    <input
                        onInput={
                            (event) => {
                                const target = event.target as HTMLInputElement;
                                target.value = target.value.replace(/[^0-9-]/g, '');
                                this.expense.date = target.value;
                            }
                        }
                        value={this.expense.date}
                        required type="date" name="date" id="date" />
                </div>

                <div>
                    <label htmlFor="description">Description</label>
                    <input
                        onInput={
                            (event) => {
                                const target = event.target as HTMLInputElement;
                                this.expense.description = target.value;
                            }
                        }
                        value={this.expense.description}
                        required type="text" name="description" id="description" placeholder='Enter some description' />
                </div>

                <div>
                    {
                        this.isLoading ? <loader-ball size="small" /> :
                            <input type="submit" value={this.editableExpense ? 'Update' : 'Create'} class='btn' />
                    }
                </div>
            </form>
        );
    }

}
