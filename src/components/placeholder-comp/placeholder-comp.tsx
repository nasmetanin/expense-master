import { Component, h, Prop } from '@stencil/core';

@Component({
    tag: 'placeholder-comp',
    styleUrl: 'placeholder-comp.css',
})

export class PlaceholderComp {
    @Prop() activeError: boolean = false;

    render() {
        return (
            <div class="no-expenses">
                <picture>
                    <img src="/assets/img/taken.svg" alt={
                        this.activeError ? 'Error loading expenses' : 'No expenses yet'
                    } />
                </picture>
                <h3>
                    {this.activeError ? 'Error loading expenses' : 'No expenses yet'}
                </h3>
                <p>
                    {this.activeError ? 'There was an error loading your expenses. Please try again later.' : 'As soon as you add an expense, it will appear here.'}
                </p>
            </div>
        );
    }

}
