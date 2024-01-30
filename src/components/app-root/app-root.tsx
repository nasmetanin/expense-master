import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  render() {
    return (
      <div>
        <header>
          <div class="header-inner">
            <h1>
              <stencil-route-link url="/" exact={true}>
                Expense Master
              </stencil-route-link>
            </h1>

            <nav class="header-nav">
              <ul>
                <li>
                  <stencil-route-link url="/chart" exact={true}>
                    Chart
                  </stencil-route-link>
                </li>
                <li>
                  <theme-switch />
                </li>
              </ul>
            </nav>

          </div>
        </header>

        <main>
          <div class="legend">
            <h2>
              How to use?
            </h2>

            <p class="legend-notation">
              This is a simple expense tracker. You can add expenses and see them in a list. You can also delete them and modify if needed. You may see a chart of your expenses. Results are saved in a database JSON file.
            </p>
          </div>

          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="app-list" exact={true} />
              <stencil-route url="/chart" component="app-chart" />
            </stencil-route-switch>
          </stencil-router>
        </main>
      </div>
    );
  }
}
