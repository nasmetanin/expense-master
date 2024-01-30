import { Component, h, Prop, Host, EventEmitter, Event, State } from '@stencil/core';
import { MenuItem } from '../../types/main';

@Component({
    tag: 'expense-line',
    styleUrl: 'expense-line.css',
    scoped: true
})
export class ExpenseLine {
    @Prop() expenseID: number;
    @Prop() amount: number;
    @Prop() date: string;
    @Prop() description: string;
    @Event() expenseUpdate: EventEmitter<void>;
    @Event() editExpense: EventEmitter<number>;
    @State() private isLoading = false;

    deleteExpense = () => {
        this.isLoading = true;
        fetch(`/api/data/${this.expenseID}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(json => {
                this.isLoading = false;
                if (!json.success) {
                    alert('Error deleting expense');
                    return;
                }

                this.expenseUpdate.emit();
            })
            .catch(error => {
                console.error(error.message);
                alert('Error deleting expense');
                this.isLoading = false;
            });
    }

    menuItems: MenuItem[] = [
        {
            name: 'Details / Modify',
            icon: 'modify',
            action: () => {
                this.editExpense.emit();
            }
        },
        {
            name: 'Delete',
            icon: 'delete',
            action: () => {
                this.deleteExpense();
            }
        },
    ];

    render() {
        return (
            <Host>
                <td>
                    {Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'EUR'
                    }).format(this.amount)}
                </td>
                <td>
                    {Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }).format(new Date(this.date))}
                </td>
                <td>{this.description}</td>
                <td>
                    {this.isLoading ? <loader-ball size="small" /> : <expense-menu menuItems={this.menuItems} />}
                </td>
            </Host>
        );
    }
}
