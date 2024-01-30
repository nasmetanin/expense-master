// As per task requirements, the component that has stacked chart of all expenses for month
import { Component, State, h } from '@stencil/core';
import { Expense } from '../../types/main';

@Component({
    tag: 'app-chart',
    styleUrl: 'app-chart.css'
})
export class AppChart {
    @State() private month: string = "2024-01";
    @State() private expenses: Expense[][] = [];
    @State() private activeError: boolean = false;
    @State() private isLoading: boolean = true;
    @State() private maximum: number = 500;

    componentWillLoad = () => {
        this.loadExpenses(this.month);
    }

    private loadExpenses = (date: string) => {
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

                const allExpenses: Expense[] = json.data.expenses.filter((expense: Expense) => {
                    const expenseDate = expense.date.slice(0, 7);

                    return expenseDate === date;
                }) as Expense[] | [];

                this.expenses = this.sortByDate(allExpenses);

            })
            .catch(error => {
                console.log(error.message);
                this.activeError = true;
            }).finally(() => {
                this.isLoading = false;
            });
    }

    private sortByDate = (expenses: Expense[]): Expense[][] => {
        const sortedExpenses: Expense[][] = [];
        const days: number[] = [];

        expenses.forEach((expense: Expense) => {
            const day = new Date(expense.date).getDate();
            if (!days.includes(day)) {
                days.push(day);
            }
        });

        days.sort((a: number, b: number) => a - b);

        days.forEach((day: number) => {
            const dayExpenses: Expense[] = expenses.filter((expense: Expense) => new Date(expense.date).getDate() === day);
            sortedExpenses.push(dayExpenses);
        });

        return sortedExpenses;
    }

    render() {
        return (
            <div>
                <h2>Chart</h2>

                <div class="date-select">
                    <label htmlFor="month">Month</label>
                    <input
                        type="month"
                        id="month"
                        value={this.month}
                        onInput={(event) => {
                            const target = event.target as HTMLInputElement;
                            this.month = target.value;
                            this.loadExpenses(this.month);
                        }}
                    />
                </div>

                <div class="date-select">
                    <label htmlFor="max">Maximum (EUR)</label>
                    <input
                        type="number"
                        id="max"
                        min="0"
                        max="10000"
                        value={this.maximum}
                        onInput={(event) => {
                            const target = event.target as HTMLInputElement;
                            this.maximum = Number.parseInt(target.value);
                        }}
                    />
                </div>

                {this.expenses.length < 1 ? (
                    <placeholder-comp activeError={this.activeError} />
                ) : (
                    <div>
                        {this.isLoading ? (
                            <loader-ball size="default" />
                        ) : (
                            <section class="chart">
                                <ul class="scale">
                                    <li>{this.maximum}</li>
                                    <li>0</li>
                                </ul>

                                <div class="stats">
                                    {this.expenses.length > 0 &&
                                        this.expenses.map((expenses: Expense[]) => (
                                            <div class="column">
                                                {expenses.map((expense: Expense) => (
                                                    <div
                                                        title={`Spent: ${expense.amount} EUR\nDescription: ${expense.description}`}
                                                        class="cell"
                                                        style={{
                                                            height: `${3.63 * (expense.amount / (this.maximum / 100))}px`,
                                                            backgroundColor: `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`
                                                        }}
                                                    ></div>
                                                ))}
                                                <span>
                                                    {Intl.DateTimeFormat('en-US', {
                                                        month: 'short',
                                                        day: 'numeric'
                                                    }).format(new Date(expenses[0].date))}
                                                </span>
                                            </div>
                                        ))}
                                </div>
                            </section>
                        )}
                    </div>
                )}
            </div>
        );
    }
}
