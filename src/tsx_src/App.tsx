
import React, { useState } from "react";

type TurtleProps = {
    name: string;
    heading: number;
    color: string;
};

function Turtle({ name, heading, color }: TurtleProps) {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    return (
        <section className="turtle">
            <h2>{name}</h2>

            <svg viewBox="0 0 200 120">
                <circle
                    cx={100 + position.x}
                    cy={60 + position.y}
                    r="15"
                    fill={color}
                />

                <text x="100" y="105">
                    Heading: {heading}°
                </text>
            </svg>

            <button
                onClick={() =>
                    setPosition(previous => ({
                        ...previous,
                        x: previous.x + 10
                    }))
                }
            >
                Move forward
            </button>
        </section>
    );
}

export default function App() {
    return (
        <main>
            <h1>GeometricalDomination TSX Experiment</h1>

            <Turtle
                name="CanvasTurtle"
                heading={90}
                color="#3498db"
            />

            <Turtle
                name="SecondTurtle"
                heading={180}
                color="#e74c3c"
            />
        </main>
    );
}
