# TypeScript Game Engine

A flexible and modular TypeScript game engine for building 2D games. This engine features scene management, input handling, asset management, and a customizable game loop.

## Features

- Scene-based game structure
- Entity-Component system
- Asset management for images and audio
- Input handling
- Collision detection
- Customizable game loop

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/typescript-game-engine.git
   ```

2. Navigate to the project directory:
   ```
   cd typescript-game-engine
   ```

3. Install dependencies:
   ```
   npm install
   ```

### Running the Demo

To run the Space Shooter demo game:

1. Start the development server:
   ```
   npm start
   ```

2. Open your browser and navigate to `http://localhost:4000`

### Building the Project

To build the project for production:
   ```
   npm run build
   ```

This will create a `dist` folder with the compiled files.

## Usage

To create a new game using this engine:

1. Create a new class that extends the `Game` class
2. Implement the `init()` method to set up your game
3. Create your game entities by extending the `Entity` class
4. Use the `Scene` class to manage your game objects
5. Utilize the `AssetManager` to load and manage your game assets

For a complete example, see the `SpaceShooterGame` class in the `src/SpaceShooterGame.ts` file.

## Documentation

To generate the documentation:
   ```
   npm run docs
   ```

This will create a `docs` folder with the generated documentation.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- TypeScript team for the excellent language and tooling
- Webpack for the module bundling
- Typedoc for the documentation generation
- Node.js for the runtime environment
- npm for the package manager
- Git for version control
- GitHub for hosting the repository