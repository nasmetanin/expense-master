import { Component, h, State, Prop } from '@stencil/core';
import { MenuItem } from '../../types/main';

@Component({
    tag: 'expense-menu',
    styleUrl: 'expense-menu.css',
    // scoped: true
})
export class ExpenseMenu {
    @State() private menuVisible: boolean = false;
    @Prop() menuItems: MenuItem[];

    render() {
        return (
            <div onMouseLeave={() => this.menuVisible = false} class="expense-menu-wrap">
                <button onClick={() => this.menuVisible = !this.menuVisible}
                    class="btn-menu">
                    <svg width="31" height="24" viewBox="0 0 31 24" fill="none">
                        <circle cx="7.13415" cy="12.1341" r="3.13415" fill="var(--text)" />
                        <circle cx="15.6818" cy="12.1341" r="3.13415" fill="var(--text)" />
                        <circle cx="24.2295" cy="12.1341" r="3.13415" fill="var(--text)" />
                    </svg>
                    <span>Menu</span>
                </button>
                {
                    this.menuVisible && (
                        <ul class="expense-menu">
                            {
                                this.menuItems.map((item) =>
                                    <li>
                                        <button onClick={() => {
                                            item.action()
                                            this.menuVisible = false;
                                        }
                                        } class="expense-menu-btn">
                                            <picture>
                                                <source
                                                    srcSet={`/assets/img/${item.icon}.svg`}
                                                    type="image/svg+xml" />
                                                <img
                                                    src={`/assets/img/${item.icon}.png`}
                                                    alt={item.name} />
                                            </picture>
                                            <span>{item.name}</span>
                                        </button>
                                    </li>
                                )
                            }
                        </ul>
                    )
                }
            </div>
        );
    }

}
