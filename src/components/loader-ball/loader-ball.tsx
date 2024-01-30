import { Component, Prop, h } from '@stencil/core';

@Component({
    tag: 'loader-ball',
    styleUrl: 'loader-ball.css'
})
export class LoaderBall {
    @Prop() size: "default" | "small";

    render() {
        return (
            <svg
                class="container"
                style={
                    this.size === "small" ?
                        { "--uib-size": "20px" } : { "--uib-size": "40px" }
                }
                viewBox="0 0 40 40"
                height="40"
                width="40"
            >
                <circle
                    class="track"
                    cx="20"
                    cy="20"
                    r="17.5"
                    pathLength="100"
                    stroke-width="5px"
                    fill="none"
                />
                <circle
                    class="car"
                    cx="20"
                    cy="20"
                    r="17.5"
                    pathLength="100"
                    stroke-width="5px"
                    fill="none"
                />
            </svg>
        );
    }
}
