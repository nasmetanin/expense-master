import { Component, State, h } from '@stencil/core';
import { Theme } from '../../types/main';

@Component({
    tag: 'theme-switch',
    styleUrl: 'theme-switch.css',
    shadow: true
})
export class ThemeSwitch {
    @State() theme: Theme;

    componentWillLoad() {
        this.theme = localStorage.getItem('theme') as Theme || 'light';
        document.documentElement.setAttribute('data-theme', this.theme);
    }

    setTheme(theme: Theme) {
        localStorage.setItem('theme', theme);
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
    }

    render() {
        return (
            <div role='button' onClick={() => this.setTheme(
                this.theme === 'light' ? 'dark' : 'light'
            )}>
                <img class="theme-switch" src={`/assets/img/${this.theme}.svg`} alt="theme" />
            </div>
        );
    }
}
